"use client";

/**
 * Métricas próprias, sem cookies e sem dados pessoais.
 *
 * Cada evento é um beacon mínimo para `/e?t=<tipo>&...`. O nginx responde 204
 * e grava a linha da requisição num log dedicado, que o painel privado
 * (/painel/) agrega a cada 5 minutos (deploy/painel/morelidev-stats.py).
 * Um id aleatório vive só no sessionStorage da aba, para agrupar os eventos
 * de uma mesma visita.
 *
 * Tipos de evento:
 *   pv    página vista (p caminho, tt título, lg idioma; na primeira: ref, utm, w, r)
 *   sec   seção da home alcançada (v id)
 *   cta   clique em "Solicitar orçamento" (v local do botão)
 *   wa    clique no WhatsApp (v local)
 *   em    clique no e-mail (v local)
 *   pj    clique para abrir um projeto (v slug, o local)
 *   pr    clique para um produto próprio (v nome)
 *   so    clique para rede social (v nome)
 *   lg    troca de idioma (v idioma escolhido)
 *   fs    começou a preencher o formulário
 *   lead  formulário enviado com sucesso
 *   leave tempo ativo (d, segundos) e rolagem máxima da home (sd, %)
 */

type Params = Record<string, string | number | undefined>;

const ENDPOINT = "/e";
export const HOME_SECTIONS = [
  "estudio",
  "servicos",
  "trabalhos",
  "produtos",
  "processo",
  "alcance",
  "contato",
];

const sent = new Set<string>();
let sid = "";

function safeStorage(kind: "session" | "local"): Storage | null {
  try {
    return kind === "session" ? window.sessionStorage : window.localStorage;
  } catch {
    return null;
  }
}

function sessionId(): string {
  if (sid) return sid;
  const store = safeStorage("session");
  sid = store?.getItem("md_sid") ?? "";
  if (!sid) {
    sid = Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
    store?.setItem("md_sid", sid);
  }
  return sid;
}

export function track(type: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  // Em desenvolvimento não há nginx para receber o beacon: só registra no console.
  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", type, params);
    return;
  }

  const query = new URLSearchParams({ t: type, sid: sessionId() });
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") query.set(key, String(value).slice(0, 120));
  }
  const url = `${ENDPOINT}?${query}`;

  try {
    if (navigator.sendBeacon?.(url)) return;
  } catch {
    // segue para o fetch
  }
  fetch(url, { method: "POST", keepalive: true }).catch(() => {});
}

/** Envia o evento uma única vez por visita para a chave informada. */
export function trackOnce(key: string, type: string, params: Params = {}) {
  if (sent.has(key)) return;
  sent.add(key);
  track(type, params);
}

function placeOf(el: Element) {
  const where = el.closest("header, footer, section, nav, [role='dialog']");
  if (!where) return "page";
  return where.id || where.tagName.toLowerCase();
}

/** Classifica um link clicado no evento correspondente (ou nenhum). */
function classify(anchor: HTMLAnchorElement): [string, Params] | null {
  const raw = anchor.getAttribute("href") ?? "";
  const place = placeOf(anchor);
  if (raw.startsWith("mailto:")) return ["em", { v: place }];

  let url: URL;
  try {
    url = new URL(anchor.href);
  } catch {
    return null;
  }
  if (url.hostname === "wa.me" || url.hostname.endsWith("whatsapp.com")) return ["wa", { v: place }];
  if (url.hostname.endsWith("linkedin.com")) return ["so", { v: "LinkedIn" }];
  if (url.hostname.endsWith("github.com")) return ["so", { v: "GitHub" }];
  if (url.hostname.startsWith("odontoapp.")) return ["pr", { v: "OdontoApp", o: place }];
  if (url.hostname.startsWith("saldocasa.")) return ["pr", { v: "SaldoCasa", o: place }];

  if (url.origin === window.location.origin) {
    if (url.hash === "#contato") return ["cta", { v: place }];
    const project = url.pathname.match(/^\/projetos\/([\w-]+)\/?$/);
    if (project) return ["pj", { v: project[1], o: place }];
  }
  return null;
}

let started = false;
let homeScroll = 0;
let onHome = false;
let lastMid = -1;

/**
 * Marca as seções da home cujo trecho a linha do meio da tela cruzou desde a
 * última verificação. Diferente de um IntersectionObserver, não perde seções
 * quando o scroll pula muitos pixels de uma vez (celular lento, flick rápido).
 */
function checkSections() {
  if (!onHome) return;
  const mid = window.scrollY + window.innerHeight / 2;
  const from = lastMid < 0 ? mid : Math.min(lastMid, mid);
  const to = Math.max(lastMid, mid);
  lastMid = mid;
  for (const id of HOME_SECTIONS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    if (top <= to && top + rect.height >= from) trackOnce(`sec:${id}`, "sec", { v: id });
  }
}

/**
 * Registra uma página vista. Chamado a cada mudança de rota; a primeira
 * página da visita também leva a origem (referrer/UTM), a largura da tela e
 * se o aparelho já esteve no site antes.
 */
export function trackPageview(pathname: string) {
  if (typeof window === "undefined") return;
  onHome = pathname === "/";
  const params: Params = { p: pathname };

  if (!sent.has("first-pv")) {
    sent.add("first-pv");
    const local = safeStorage("local");
    const returning = local?.getItem("md_seen") ? 1 : 0;
    local?.setItem("md_seen", "1");
    let ref = "";
    try {
      ref = document.referrer ? new URL(document.referrer).hostname : "";
    } catch {
      ref = "";
    }
    if (ref === window.location.hostname) ref = "";
    const qs = new URL(window.location.href).searchParams;
    Object.assign(params, {
      ref,
      us: qs.get("utm_source") ?? undefined,
      um: qs.get("utm_medium") ?? undefined,
      uc: qs.get("utm_campaign") ?? undefined,
      w: window.innerWidth,
      r: returning,
    });
  }

  // O título da rota nova chega um instante depois da navegação.
  window.setTimeout(() => {
    // O idioma é lido aqui, depois que a preferência salva já foi aplicada.
    const lg = document.documentElement.lang.toLowerCase().startsWith("en") ? "en" : "pt";
    track("pv", { ...params, lg, tt: document.title.replace(/\s*\|\s*MoreliDev$/, "") });
  }, 300);

  lastMid = -1;
  if (onHome) window.setTimeout(checkSections, 600);
}

export function initAnalytics() {
  if (started || typeof window === "undefined") return;
  started = true;

  // Links: WhatsApp, e-mail, orçamento, projetos, produtos e redes.
  document.addEventListener(
    "click",
    (event) => {
      const target = event.target as Element | null;
      const custom = target?.closest?.<HTMLElement>("[data-track]");
      if (custom?.dataset.track) {
        track(custom.dataset.track, { v: custom.dataset.trackValue });
        return;
      }
      const anchor = target?.closest?.("a");
      if (!anchor) return;
      const hit = classify(anchor as HTMLAnchorElement);
      if (hit) track(hit[0], hit[1]);
    },
    true,
  );

  // Tempo ativo (só com a aba visível) e rolagem da home, enviados ao sair.
  let activeMs = 0;
  let visibleSince = document.visibilityState === "visible" ? performance.now() : 0;

  // Seções alcançadas e profundidade de rolagem, no máximo uma vez por frame.
  let frame = 0;
  const onScroll = () => {
    if (!onHome || frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      checkSections();
      const doc = document.documentElement;
      const depth = (window.scrollY + window.innerHeight) / Math.max(doc.scrollHeight, 1);
      homeScroll = Math.max(homeScroll, Math.min(100, Math.round(depth * 100)));
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  const flush = () => {
    if (visibleSince) {
      activeMs += performance.now() - visibleSince;
      visibleSince = 0;
    }
    track("leave", { d: Math.round(activeMs / 1000), sd: homeScroll });
  };
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush();
    else visibleSince = performance.now();
  });
  window.addEventListener("pagehide", () => {
    if (visibleSince) flush();
  });
}
