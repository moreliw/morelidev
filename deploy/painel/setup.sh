#!/usr/bin/env bash
# Painel de acessos privado (https://morelidev.com/painel/).
#
# Idempotente: roda a cada publicação, chamado por deploy/configure-edge.sh
# antes de validar o Nginx (que precisa do diretório de log já criado).
#
# - O beacon /e (web/src/lib/analytics.ts) é gravado em
#   /var/log/nginx/morelidev/analytics.log; nada é guardado na aplicação.
# - morelidev-stats recalcula stats.json a cada 5 minutos (cron).
# - /painel/ é servido pelo Nginx com senha (HTTP basic auth).
# - A cidade aproximada vem da base DB-IP Lite (CC BY 4.0), a mesma do
#   painel Corujitos quando ela já existe no servidor.
set -Eeuo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
state_dir=/var/lib/morelidev-stats
www_dir=/var/www/morelidev-painel
log_dir=/var/log/nginx/morelidev
htpasswd=/etc/nginx/morelidev-painel.htpasswd
credentials=/root/morelidev-painel-acesso.txt

command -v python3 >/dev/null || { echo 'python3 ausente; painel não instalado.' >&2; exit 1; }
if ! python3 -c 'import maxminddb' 2>/dev/null; then
  apt-get install -y -qq python3-maxminddb >/dev/null 2>&1 \
    || echo 'Aviso: python3-maxminddb indisponível; o painel funciona, sem a cidade.' >&2
fi

install -d -m 0750 "$state_dir"
install -d -m 0755 "$www_dir"
install -d -m 0755 -o root -g adm "$log_dir"

install -m 0755 "$here/morelidev-stats.py" /usr/local/bin/morelidev-stats
install -m 0755 "$here/geoip-update.sh" /usr/local/bin/morelidev-geoip-update
install -m 0644 "$here/index.html" "$www_dir/index.html"

if [[ ! -f "$state_dir/dbip-city-lite.mmdb" && ! -f /var/lib/corujitos-stats/dbip-city-lite.mmdb ]]; then
  /usr/local/bin/morelidev-geoip-update \
    || echo 'Aviso: base de geolocalização não baixada; tenta de novo no próximo mês.' >&2
fi

# Acesso: o usuário é criado só na primeira vez. A senha fica apenas no
# servidor (arquivo do root, permissão 600) e nunca aparece nos logs do deploy.
if [[ ! -s "$htpasswd" ]]; then
  (
    umask 077
    password="$(openssl rand -base64 24 | tr -d '/+=' | cut -c1-20)"
    printf 'morelidev:%s\n' "$(openssl passwd -apr1 "$password")" > "$htpasswd"
    printf 'Painel: https://morelidev.com/painel/\nUsuário: morelidev\nSenha: %s\n' "$password" > "$credentials"
  )
  echo "Acesso ao painel criado. Credenciais em $credentials (somente no servidor)."
fi
chown root:www-data "$htpasswd"
chmod 0640 "$htpasswd"

# Logs rotacionados por semana e guardados por pouco mais de um ano, para o
# período "12 meses" do painel.
cat > /etc/logrotate.d/morelidev-analytics <<'EOF'
/var/log/nginx/morelidev/*.log {
  weekly
  rotate 60
  missingok
  notifempty
  compress
  delaycompress
  create 0640 www-data adm
  sharedscripts
  postrotate
    [ -s /run/nginx.pid ] && kill -USR1 "$(cat /run/nginx.pid)"
  endscript
}
EOF

cat > /etc/cron.d/morelidev-stats <<'EOF'
*/5 * * * * root /usr/local/bin/morelidev-stats >/dev/null 2>&1
23 4 3 * * root /usr/local/bin/morelidev-geoip-update >/dev/null 2>&1
EOF
chmod 0644 /etc/cron.d/morelidev-stats

/usr/local/bin/morelidev-stats || echo 'Aviso: stats.json não gerado agora; o cron tenta em 5 minutos.' >&2
echo 'Painel de acessos instalado.'
