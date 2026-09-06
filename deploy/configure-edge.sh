#!/usr/bin/env bash
set -Eeuo pipefail

source_config="$(pwd)/deploy/nginx-morelidev.conf"
enabled_config="/etc/nginx/sites-enabled/morelidev"
target_config="$(readlink -f "$enabled_config")"

[[ "$target_config" == /etc/nginx/sites-available/* || "$target_config" == "$enabled_config" ]] || {
  echo 'Destino Nginx inesperado; configuração não alterada.' >&2
  exit 1
}

backup_dir="/var/backups/morelidev"
stale_enabled_backup="${enabled_config}.pre-deploy"
install -d -m 0700 "$backup_dir"

# A previous deploy stored its rollback copy beside the enabled site. Nginx
# includes every file in that directory, so preserve it outside the include.
if [[ -f "$stale_enabled_backup" ]]; then
  mv "$stale_enabled_backup" \
    "$backup_dir/nginx-morelidev-$(date -u +%Y%m%dT%H%M%SZ).conf"
fi

backup_config="$(mktemp /tmp/morelidev-nginx.XXXXXX)"
cp -a "$target_config" "$backup_config"
restore_config() {
  cp -a "$backup_config" "$target_config"
  rm -f "$backup_config"
  nginx -t >/dev/null 2>&1 && systemctl reload nginx || true
}
trap restore_config ERR

install -m 0644 "$source_config" "$target_config"
nginx -t

certificate="/etc/letsencrypt/live/morelidev.com-0001/fullchain.pem"
if ! openssl x509 -in "$certificate" -noout -ext subjectAltName | grep -q 'DNS:www.morelidev.com'; then
  certbot certonly --nginx --non-interactive --agree-tos --expand \
    --cert-name morelidev.com-0001 \
    -d morelidev.com -d www.morelidev.com
fi

nginx -t
systemctl reload nginx
rm -f "$backup_config"
trap - ERR

certificate_names="$(openssl x509 -in "$certificate" -noout -ext subjectAltName)"
grep -q 'DNS:morelidev.com' <<<"$certificate_names"
grep -q 'DNS:www.morelidev.com' <<<"$certificate_names"
curl --fail --silent --show-error --max-time 15 \
  --http1.1 \
  --noproxy '*' \
  --resolve www.morelidev.com:443:127.0.0.1 \
  --output /dev/null \
  --write-out '%{redirect_url}' \
  https://www.morelidev.com/ | grep -qx 'https://morelidev.com/'
echo 'Nginx, HTTPS e redirecionamento de www verificados.'
