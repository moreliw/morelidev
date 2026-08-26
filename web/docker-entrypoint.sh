#!/bin/sh
# Aplica migrations do Prisma automaticamente a cada deploy, antes de subir o servidor.
# Se falhar (ex: banco criado antes de existir histórico de migrations), não derruba
# o container — sobe do jeito que já subia antes desta mudança e loga o motivo.
set -e

echo "==> Aplicando migrations do Prisma..."
if ! npx prisma migrate deploy; then
  echo "==> AVISO: 'prisma migrate deploy' falhou. Verifique o estado do banco manualmente."
  echo "==> Subindo o servidor mesmo assim."
fi

exec npm run start -- -H 0.0.0.0 -p 3000
