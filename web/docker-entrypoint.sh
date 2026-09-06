#!/bin/sh
set -eu

if [ -z "${JWT_SECRET:-}" ] || [ "$JWT_SECRET" = "change-me-in-production" ]; then
  echo "JWT_SECRET ausente ou inseguro. Configure-o no .env do servidor." >&2
  exit 1
fi

# Não declara a aplicação pronta quando a migração falha.
echo "Aplicando migrations do Prisma..."
node ./node_modules/prisma/build/index.js migrate deploy

exec node server.js
