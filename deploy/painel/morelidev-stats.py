#!/usr/bin/env python3
"""Agrega as métricas do morelidev.com em /var/www/morelidev-painel/stats.json.

O site envia beacons sem cookies para /e?t=<tipo>&sid=<id da visita>&...
(web/src/lib/analytics.ts). O nginx responde 204 e grava a linha num log
dedicado; este script lê esse log (atual + rotacionados), agrupa os eventos
por visita e grava os períodos já calculados para o painel.

Nenhum IP ou user agent chega ao JSON: só contagens, uma cidade aproximada
(DB-IP Lite, CC BY 4.0) e nomes genéricos de aparelho e navegador.

Instalado em /usr/local/bin/morelidev-stats, executado pelo cron a cada 5 min.
Os caminhos podem ser trocados por variáveis de ambiente (útil para testes).
"""
import glob
import gzip
import hashlib
import json
import os
import re
import tempfile
from collections import Counter
from datetime import datetime, timedelta, timezone
from urllib.parse import parse_qsl
from zoneinfo import ZoneInfo

LOG_GLOB = os.environ.get('MD_LOG_GLOB', '/var/log/nginx/morelidev/analytics.log*')
OUT_DIR = os.environ.get('MD_OUT_DIR', '/var/www/morelidev-painel')
STATE_DIR = os.environ.get('MD_STATE_DIR', '/var/lib/morelidev-stats')
# A mesma base DB-IP serve aos dois painéis do servidor; usa a primeira que existir.
GEO_DBS = (
    os.path.join(STATE_DIR, 'dbip-city-lite.mmdb'),
    '/var/lib/corujitos-stats/dbip-city-lite.mmdb',
)
TZ = ZoneInfo('America/Sao_Paulo')

LINE = re.compile(
    r'^(\S+) \S+ \S+ \[([^\]]+)\] "(?:GET|POST) /e\?(\S*) HTTP/[^"]*" \d{3} \S+ "[^"]*" "([^"]*)"'
)
BOT = re.compile(
    r'bot|crawl|spider|slurp|preview|facebookexternalhit|headless|lighthouse|'
    r'curl|wget|python|go-http|java/|okhttp|axios|node-fetch|httpclient|^-?$',
    re.I,
)
MONTHS = {m: i for i, m in enumerate(
    'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(), start=1)}
MAX_DURATION = 30 * 60
SECTIONS = ('estudio', 'servicos', 'trabalhos', 'produtos', 'processo', 'alcance', 'contato')


# ---------------------------------------------------------------- leitura

def parse_time(raw):
    # 22/Oct/2026:17:20:59 +0200 (o nginx sempre usa meses em inglês)
    day, mon, rest = raw.split('/', 2)
    year, hh, mm, ss_tz = rest.split(':', 3)
    ss, tz = ss_tz.split(' ')
    sign = 1 if tz[0] == '+' else -1
    offset = timedelta(hours=int(tz[1:3]), minutes=int(tz[3:5])) * sign
    dt = datetime(int(year), MONTHS[mon], int(day), int(hh), int(mm), int(ss),
                  tzinfo=timezone(offset))
    return dt.astimezone(TZ)


def device_of(ua):
    if re.search(r'iPad|Tablet', ua) or ('Android' in ua and 'Mobile' not in ua):
        return 'Tablet'
    if re.search(r'Mobi|iPhone|iPod|Android', ua):
        return 'Celular'
    return 'Computador'


def os_of(ua):
    for pattern, name in (
        (r'iPhone|iPad|iPod', 'iOS'), (r'Android', 'Android'),
        (r'Windows', 'Windows'), (r'Macintosh|Mac OS X', 'macOS'),
        (r'CrOS', 'ChromeOS'), (r'Linux', 'Linux'),
    ):
        if re.search(pattern, ua):
            return name
    return 'Outro'


def browser_of(ua):
    for pattern, name in (
        (r'Instagram', 'Instagram (app)'), (r'FBAN|FBAV|FB_IAB', 'Facebook (app)'),
        (r'LinkedInApp', 'LinkedIn (app)'),
        (r'Edg/|EdgiOS|EdgA', 'Edge'), (r'SamsungBrowser', 'Samsung Internet'),
        (r'OPR/|Opera', 'Opera'), (r'CriOS|Chrome/', 'Chrome'),
        (r'FxiOS|Firefox/', 'Firefox'), (r'Safari/|iPhone|iPad', 'Safari'),
    ):
        if re.search(pattern, ua):
            return name
    return 'Outro'


SOURCE_PATTERNS = (
    (r'instagram|^ig$', 'Instagram'), (r'facebook|^fb$|fb\.', 'Facebook'),
    (r'whatsapp|wa\.me|^wa$', 'WhatsApp'), (r'google', 'Google'),
    (r'bing|duckduckgo|yahoo|ecosia', 'Outras buscas'), (r't\.co$|twitter|^x\.com', 'X / Twitter'),
    (r'youtube', 'YouTube'), (r'tiktok', 'TikTok'), (r'linkedin|lnkd\.in', 'LinkedIn'),
    (r'github', 'GitHub'), (r'chatgpt|openai|perplexity|claude\.ai|gemini', 'Assistentes de IA'),
    (r'corujitos', 'Site Corujitos'),
)


def source_of(ref, utm, browser):
    for value in (utm, ref):
        if not value:
            continue
        for pattern, name in SOURCE_PATTERNS:
            if re.search(pattern, value, re.I):
                return name
        return value.removeprefix('www.')
    # Navegadores de apps costumam não enviar a origem
    if browser == 'Instagram (app)':
        return 'Instagram'
    if browser == 'Facebook (app)':
        return 'Facebook'
    if browser == 'LinkedIn (app)':
        return 'LinkedIn'
    return 'Direto'


def norm_path(raw):
    path = (raw or '/').split('?', 1)[0].split('#', 1)[0].lower()
    if len(path) > 1:
        path = path.rstrip('/')
    return path or '/'


def page_label(path, title):
    if path == '/':
        return 'Início'
    if path == '/projetos':
        return 'Projetos'
    if title:
        # "Mameri Export | Site institucional" -> "Mameri Export"
        return title.split(' | ', 1)[0].strip()
    return path


class Geo:
    def __init__(self):
        self.reader = None
        self.cache = {}
        try:
            import maxminddb
            path = next((p for p in GEO_DBS if os.path.exists(p)), None)
            if path:
                self.reader = maxminddb.open_database(path)
        except Exception:
            self.reader = None

    def lookup(self, ip):
        if ip in self.cache:
            return self.cache[ip]
        result = (None, None, None)
        if self.reader:
            try:
                rec = self.reader.get(ip) or {}

                def name(node):
                    names = (node or {}).get('names', {})
                    return names.get('pt-BR') or names.get('en')

                subdivisions = rec.get('subdivisions') or [{}]
                result = (name(rec.get('city')), name(subdivisions[0]), name(rec.get('country')))
            except Exception:
                pass
        self.cache[ip] = result
        return result


def salt():
    path = os.path.join(STATE_DIR, 'salt')
    try:
        with open(path) as f:
            return f.read().strip()
    except FileNotFoundError:
        os.makedirs(STATE_DIR, exist_ok=True)
        value = os.urandom(16).hex()
        with open(path, 'w') as f:
            f.write(value)
        return value


def read_events():
    secret = salt()
    for path in sorted(glob.glob(LOG_GLOB)):
        opener = gzip.open if path.endswith('.gz') else open
        with opener(path, 'rt', encoding='utf-8', errors='replace') as f:
            for line in f:
                m = LINE.match(line)
                if not m:
                    continue
                ip, raw_time, query, ua = m.groups()
                if BOT.search(ua):
                    continue
                params = dict(parse_qsl(query, keep_blank_values=True))
                if 't' not in params:
                    continue
                visitor = hashlib.sha256(f'{secret}{ip}{ua}'.encode()).hexdigest()[:16]
                yield {
                    'time': parse_time(raw_time),
                    'ip': ip,
                    'ua': ua,
                    'visitor': visitor,
                    'p': params,
                }


# ---------------------------------------------------------------- visitas

def build_sessions(events, geo):
    sessions = {}
    titles = {}
    for ev in sorted(events, key=lambda e: e['time']):
        p = ev['p']
        sid = p.get('sid') or f"{ev['visitor']}-{ev['time']:%Y%m%d}"
        s = sessions.get(sid)
        if s is None:
            browser = browser_of(ev['ua'])
            city, state, country = geo.lookup(ev['ip'])
            s = sessions[sid] = {
                'start': ev['time'], 'last': ev['time'], 'visitor': ev['visitor'],
                'device': device_of(ev['ua']), 'os': os_of(ev['ua']), 'browser': browser,
                'city': city, 'state': state, 'country': country,
                'source': None, 'campaign': None, 'returning': False, 'language': None,
                'pages': [], 'duration': None, 'scroll': 0, 'sections': set(),
                'ctas': [], 'whatsapp': [], 'email': [], 'projects': [], 'products': [],
                'social': [], 'langSwitch': [], 'formStart': False, 'leads': 0,
            }
        s['last'] = max(s['last'], ev['time'])
        t = p['t']
        if t == 'pv':
            path = norm_path(p.get('p'))
            if p.get('tt'):
                titles[path] = p['tt']
            s['pages'].append(path)
            if s['source'] is None:
                s['source'] = source_of(p.get('ref', ''), p.get('us', ''), s['browser'])
                s['campaign'] = p.get('uc') or None
            if s['language'] is None and p.get('lg') in ('pt', 'en'):
                s['language'] = p['lg']
            s['returning'] = s['returning'] or p.get('r') == '1'
        elif t == 'sec':
            s['sections'].add(p.get('v', ''))
        elif t == 'cta':
            s['ctas'].append(p.get('v', ''))
        elif t == 'wa':
            s['whatsapp'].append(p.get('v', ''))
        elif t == 'em':
            s['email'].append(p.get('v', ''))
        elif t == 'pj':
            s['projects'].append(p.get('v', ''))
        elif t == 'pr':
            s['products'].append(p.get('v', ''))
        elif t == 'so':
            s['social'].append(p.get('v', ''))
        elif t == 'lg':
            s['langSwitch'].append(p.get('v', ''))
        elif t == 'fs':
            s['formStart'] = True
        elif t == 'lead':
            s['leads'] += 1
            s['formStart'] = True
        elif t == 'leave':
            try:
                d = min(int(p.get('d', 0)), MAX_DURATION)
                s['duration'] = max(s['duration'] or 0, d)
                s['scroll'] = max(s['scroll'], min(int(p.get('sd', 0)), 100))
            except ValueError:
                pass
    for s in sessions.values():
        # Abrir um case conta como ter visto os projetos
        if any(pg.startswith('/projetos') for pg in s['pages']) or s['projects']:
            s['sections'].add('trabalhos')
        if s['leads'] or s['formStart']:
            s['sections'].add('contato')
    # Visitas sem página vista (ex.: beacon de uma aba restaurada) são ruído
    return [s for s in sessions.values() if s['pages']], titles


def contacted(s):
    return bool(s['leads'] or s['whatsapp'] or s['email'])


def engaged(s):
    return (
        (s['duration'] or 0) >= 10
        or len(s['pages']) > 1
        or bool(s['ctas'] or s['projects'] or s['products'] or s['formStart'])
        or contacted(s)
    )


# --------------------------------------------------------------- períodos

def kpis(sessions):
    n = len(sessions)
    with_duration = [s['duration'] for s in sessions if s['duration'] is not None]
    pageviews = sum(len(s['pages']) for s in sessions)
    home = [s for s in sessions if '/' in s['pages']]
    return {
        'visitors': len({s['visitor'] for s in sessions}),
        'sessions': n,
        'pageviews': pageviews,
        'pagesPerVisit': round(pageviews / n, 2) if n else None,
        'avgDuration': round(sum(with_duration) / len(with_duration)) if with_duration else None,
        'engagedRate': round(sum(engaged(s) for s in sessions) / n, 4) if n else None,
        'avgScroll': round(sum(s['scroll'] for s in home) / len(home)) if home else None,
        'leads': sum(s['leads'] for s in sessions),
        'formStarts': sum(s['formStart'] for s in sessions),
        'whatsapp': sum(len(s['whatsapp']) for s in sessions),
        'email': sum(len(s['email']) for s in sessions),
        'contactRate': round(sum(contacted(s) for s in sessions) / n, 4) if n else None,
        'projectViews': sum(sum(pg.startswith('/projetos/') for pg in s['pages']) for s in sessions),
        'mobileShare': round(sum(s['device'] == 'Celular' for s in sessions) / n, 4) if n else None,
        'returningShare': round(sum(s['returning'] for s in sessions) / n, 4) if n else None,
    }


def top(counter, limit=None):
    return [[k, v] for k, v in counter.most_common(limit) if k]


def period(sessions, titles, start, end, prev_start, prev_end, granularity):
    cur = [s for s in sessions if start <= s['start'] < end]
    prev = [s for s in sessions if prev_start <= s['start'] < prev_end]

    # série temporal
    buckets = []
    cursor = start
    step = timedelta(hours=1) if granularity == 'hour' else timedelta(days=1)
    while cursor < end:
        buckets.append(cursor)
        cursor += step
    series = {b: {'visitors': set(), 'sessions': 0, 'pageviews': 0, 'contacts': 0} for b in buckets}
    for s in cur:
        key = s['start'].replace(minute=0, second=0, microsecond=0)
        if granularity == 'day':
            key = key.replace(hour=0)
        if key in series:
            b = series[key]
            b['visitors'].add(s['visitor'])
            b['sessions'] += 1
            b['pageviews'] += len(s['pages'])
            b['contacts'] += s['leads'] + len(s['whatsapp']) + len(s['email'])

    hours = [0] * 24
    weekdays = [0] * 7
    for s in cur:
        hours[s['start'].hour] += 1
        weekdays[s['start'].weekday()] += 1

    # páginas: visualizações e visitas únicas por caminho
    views = Counter(pg for s in cur for pg in s['pages'])
    unique = Counter(pg for s in cur for pg in set(s['pages']))
    pages = [
        {'path': path, 'label': page_label(path, titles.get(path)), 'views': v, 'sessions': unique[path]}
        for path, v in views.most_common()
    ]
    entries = Counter(page_label(s['pages'][0], titles.get(s['pages'][0])) for s in cur)

    # projetos: aberturas do case + cliques que levaram até ele
    project_rows = {}
    for path, v in views.items():
        if path.startswith('/projetos/'):
            slug = path.rsplit('/', 1)[-1]
            project_rows[slug] = {'slug': slug, 'label': page_label(path, titles.get(path)),
                                  'views': v, 'clicks': 0}
    for s in cur:
        for slug in s['projects']:
            row = project_rows.setdefault(slug, {
                'slug': slug, 'label': page_label(f'/projetos/{slug}', titles.get(f'/projetos/{slug}')),
                'views': 0, 'clicks': 0})
            row['clicks'] += 1

    n = len(cur)
    reach = lambda key: sum(key in s['sections'] for s in cur)  # noqa: E731
    home = [s for s in cur if '/' in s['pages']]

    return {
        'start': start.isoformat(),
        'end': end.isoformat(),
        'granularity': granularity,
        'kpis': kpis(cur),
        'prev': kpis(prev),
        'series': [
            {'t': b.isoformat(), 'visitors': len(v['visitors']), 'sessions': v['sessions'],
             'pageviews': v['pageviews'], 'contacts': v['contacts']}
            for b, v in series.items()
        ],
        'sources': top(Counter(s['source'] for s in cur)),
        'campaigns': top(Counter(s['campaign'] for s in cur)),
        'devices': top(Counter(s['device'] for s in cur)),
        'os': top(Counter(s['os'] for s in cur)),
        'browsers': top(Counter(s['browser'] for s in cur)),
        'cities': top(Counter(
            f"{s['city']} · {s['state']}" if s['city'] and s['state'] else s['city'] or s['country']
            for s in cur), 12),
        'countries': top(Counter(s['country'] for s in cur)),
        'languages': top(Counter({'pt': 'Português', 'en': 'Inglês'}.get(s['language'], 'Português')
                                 for s in cur)),
        'hours': hours,
        'weekdays': weekdays,
        'pages': pages,
        'entries': top(entries, 8),
        'projects': sorted(project_rows.values(), key=lambda r: (-r['views'], -r['clicks'], r['label'])),
        'funnel': [
            ['Visitaram o site', n],
            ['Viram os serviços', reach('servicos')],
            ['Viram os projetos', reach('trabalhos')],
            ['Chegaram ao contato', reach('contato')],
            ['Começaram o formulário', sum(s['formStart'] for s in cur)],
            ['Pediram orçamento', sum(bool(s['leads']) for s in cur)],
        ],
        'sections': [[k, reach(k)] for k in SECTIONS],
        'homeVisits': len(home),
        'scroll': [[d, sum(s['scroll'] >= d for s in home)] for d in (25, 50, 75, 95)],
        'contacts': {
            'leads': sum(s['leads'] for s in cur),
            'formStarts': sum(s['formStart'] for s in cur),
            'whatsapp': sum(len(s['whatsapp']) for s in cur),
            'email': sum(len(s['email']) for s in cur),
            'ctas': sum(len(s['ctas']) for s in cur),
            'whatsappPlaces': top(Counter(v for s in cur for v in s['whatsapp'])),
            'ctaPlaces': top(Counter(v for s in cur for v in s['ctas'])),
        },
        'products': top(Counter(v for s in cur for v in s['products'])),
        'social': top(Counter(v for s in cur for v in s['social'])),
        'langSwitch': top(Counter(v for s in cur for v in s['langSwitch'])),
    }


def recent(sessions, titles, limit=30):
    rows = []
    for s in sorted(sessions, key=lambda s: s['start'], reverse=True)[:limit]:
        place = ', '.join(x for x in (s['city'], s['state']) if x) or s['country']
        rows.append({
            't': s['start'].isoformat(),
            'place': place,
            'device': s['device'], 'os': s['os'], 'browser': s['browser'],
            'source': s['source'], 'returning': s['returning'], 'language': s['language'] or 'pt',
            'duration': s['duration'], 'scroll': s['scroll'],
            'pages': list(dict.fromkeys(page_label(pg, titles.get(pg)) for pg in s['pages'])),
            'lead': bool(s['leads']),
            'formStart': s['formStart'],
            'whatsapp': bool(s['whatsapp']),
            'email': bool(s['email']),
            'products': list(dict.fromkeys(s['products'])),
        })
    return rows


def main():
    now = datetime.now(TZ)
    today = now.replace(hour=0, minute=0, second=0, microsecond=0)
    sessions, titles = build_sessions(read_events(), Geo())

    periods = {
        'hoje': period(sessions, titles, today, today + timedelta(days=1),
                       today - timedelta(days=1), now - timedelta(days=1), 'hour'),
    }
    for key, days in (('7d', 7), ('30d', 30), ('90d', 90), ('12m', 365)):
        start = today - timedelta(days=days - 1)
        periods[key] = period(sessions, titles, start, today + timedelta(days=1),
                              start - timedelta(days=days), start, 'day')

    live_cut = now - timedelta(minutes=30)
    data = {
        'generatedAt': now.isoformat(),
        'since': min((s['start'] for s in sessions), default=now).isoformat(),
        'live': sum(s['last'] >= live_cut for s in sessions),
        'periods': periods,
        'recent': recent(sessions, titles),
    }

    os.makedirs(OUT_DIR, exist_ok=True)
    fd, tmp = tempfile.mkstemp(dir=OUT_DIR, suffix='.json')
    with os.fdopen(fd, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, separators=(',', ':'))
    os.chmod(tmp, 0o644)
    os.replace(tmp, os.path.join(OUT_DIR, 'stats.json'))


if __name__ == '__main__':
    main()
