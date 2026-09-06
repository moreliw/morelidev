#!/usr/bin/env bash
set -Eeuo pipefail

revision="${1:?Informe o SHA a publicar}"
[[ "$revision" =~ ^[0-9a-f]{40}$ ]] || { echo 'SHA inválido' >&2; exit 1; }
cd /opt/morelidev

# Serializa também as publicações disparadas fora do GitHub Actions.
exec 9>/opt/morelidev/.deploy.lock
flock -n 9 || { echo 'Outra publicação está em andamento.' >&2; exit 1; }

git diff --quiet && git diff --cached --quiet || {
  echo 'Existem alterações locais no servidor. Nenhum arquivo foi descartado.' >&2
  exit 1
}
git fetch origin "$revision"
git checkout --detach "$revision"
export APP_VERSION="$revision"
compose=(docker compose -p morelidev -f docker-compose.prod.yml)

# O .env é administrado no servidor. Cria somente o segredo ausente, no próprio host,
# sem transmitir ou imprimir seu valor nos logs do GitHub Actions.
test -f .env || { umask 077; : > .env; }
if ! grep -Eq '^JWT_SECRET=.{32,}$' .env; then
  secret="$(openssl rand -hex 32)"
  env_temp="$(mktemp .env.XXXXXX)"
  awk -v secret="$secret" '
    BEGIN { replaced = 0 }
    /^JWT_SECRET=/ && !replaced { print "JWT_SECRET=" secret; replaced = 1; next }
    { print }
    END { if (!replaced) print "JWT_SECRET=" secret }
  ' .env > "$env_temp"
  chmod 600 "$env_temp"
  mv "$env_temp" .env
  unset secret
  echo 'JWT_SECRET seguro criado no servidor.'
fi
"${compose[@]}" config --quiet
docker network inspect legalreports_public >/dev/null 2>&1 || docker network create legalreports_public

# Falhas de compilação não interrompem a aplicação que já está em execução.
"${compose[@]}" build --pull web

if docker container inspect morelidev-web >/dev/null 2>&1 \
  && [ "$(docker inspect -f '{{.State.Running}}' morelidev-web)" = true ]; then
  docker exec -i morelidev-web node <<'JS'
const fs = require('node:fs');
const path = require('node:path');
const Database = require('better-sqlite3');
const file = (process.env.DATABASE_URL || 'file:/app/data/prod.db').replace(/^file:/, '');
if (!fs.existsSync(file)) process.exit(0);
const backups = path.join(path.dirname(file), 'backups');
fs.mkdirSync(backups, { recursive: true });
const target = path.join(backups, `pre-deploy-${new Date().toISOString().replace(/[:.]/g, '-')}.db`);
const db = new Database(file, { readonly: true });
db.backup(target).then(() => { db.close(); console.log('Backup SQLite concluído.'); })
  .catch(error => { db.close(); console.error(error.message); process.exitCode = 1; });
JS
fi

"${compose[@]}" up -d --wait --wait-timeout 180 web
curl --fail --silent --show-error --max-time 10 http://127.0.0.1:3002/api/health \
  | docker exec -i morelidev-web node -e '
    let data = "";
    process.stdin.on("data", chunk => data += chunk);
    process.stdin.on("end", () => {
      const result = JSON.parse(data);
      if (result.status !== "ok" || result.version !== process.env.APP_VERSION) process.exit(1);
      console.log("Container saudável e executando a versão esperada.");
    });'

bash ./deploy/configure-edge.sh
