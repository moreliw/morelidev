# Publicação MoreliDev

## Fluxo

O deploy usa a revisão exata da `main`, verifica a chave pública do servidor e mantém o `.env` existente em `/opt/morelidev`. A imagem é compilada antes de substituir o container atual. O SQLite recebe um backup consistente no diretório `backups` do volume de dados antes da substituição.

A publicação só termina com sucesso quando o container e `https://morelidev.com/api/health` retornam banco disponível e a revisão esperada. Falhas de migrations interrompem a inicialização. O volume de dados, uploads e a rede compartilhada do Traefik são preservados.

O script também mantém a configuração Nginx de `morelidev.com`, valida-a antes de recarregar o serviço e amplia o certificado Let's Encrypt para `www.morelidev.com` quando necessário. `www` redireciona permanentemente para o domínio principal. A configuração anterior é restaurada automaticamente se essa etapa falhar.

## Configuração necessária

Secrets do repositório:

- `DEPLOY_HOST`: endereço do servidor.
- `DEPLOY_USER`: usuário cuja chave pública está autorizada no servidor e que tem acesso ao Docker e `/opt/morelidev`.
- `DEPLOY_PORT`: opcional; padrão 22.
- `DEPLOY_SSH_PRIVATE_KEY`: chave privada OpenSSH sem senha, correspondente à chave pública autorizada para esse usuário.

No servidor, `/opt/morelidev/.env` guarda `JWT_SECRET`. Quando ele está ausente ou vazio, o script cria um valor aleatório de 256 bits no próprio servidor, com permissão `600`, sem transmitir ou imprimir o segredo. Um valor válido existente é preservado para manter as sessões atuais.

O arquivo `deploy/known_hosts` contém a identidade ED25519 do servidor, obtida do registro local confiável e validada na conexão do Actions. Se o servidor for reinstalado ou substituído, conferir a nova impressão digital por um canal confiável antes de atualizar esse arquivo.

## Diagnóstico sem publicar

No GitHub Actions, executar **Deploy morelidev.com**, escolher a branch desejada e marcar `diagnose_only`. Isso verifica a chave, a identidade do servidor, o acesso SSH, o Docker Compose e o diretório, sem executar o script de publicação.

Se aparecer `Permission denied (publickey,password)`, o servidor foi alcançado, mas não autorizou a identidade apresentada. Conferir o usuário cadastrado, a chave correspondente em `~/.ssh/authorized_keys`, a propriedade do diretório e as permissões (`700` para `.ssh`, `600` para `authorized_keys`). Fazer essa correção por uma sessão administrativa já autenticada ou pelo console do provedor. Não remover chaves existentes, desativar verificações SSH ou publicar chaves privadas nos logs.

A impressão digital da chave recusada no incidente de 06/09/2026 é `SHA256:72vVmhawqDQRWKckqhFGpHDmbcJ4utTNQF/oi49U4T8`. A chave cadastrada foi lida com sucesso pelo Actions; o problema confirmado está na autorização para o usuário do servidor.

## Validação da imagem

O workflow **Validate production image** compila a imagem em Linux e inicia um container descartável com banco e JWT exclusivos de teste. Verifica migrations, saúde e revisão, home, case Empresa Capixaba, bloqueio da API administrativa e gravação de contato. O container de teste é removido ao final e não acessa dados de produção.

## Painel de acessos

`https://morelidev.com/painel/` mostra as visitas do site: visitantes, origem, aparelhos, cidade aproximada, páginas e projetos mais vistos, jornada até o pedido de orçamento, cliques no WhatsApp e no e-mail, e as visitas recentes. É o mesmo modelo do painel Corujitos.

Como funciona:

- O site envia beacons sem cookies para `/e` (`web/src/lib/analytics.ts`). O Nginx responde 204 e grava cada beacon em `/var/log/nginx/morelidev/analytics.log`. Nenhum dado de visita passa pela aplicação ou pelo banco.
- `morelidev-stats` (`deploy/painel/morelidev-stats.py`) lê esse log a cada 5 minutos pelo cron e gera `/var/www/morelidev-painel/stats.json`. O JSON não contém IP nem user agent; visitantes únicos usam um hash com sal guardado em `/var/lib/morelidev-stats`.
- A cidade aproximada vem da base DB-IP Lite (CC BY 4.0). A cópia do painel Corujitos é reaproveitada quando existe.
- Os logs giram por semana e ficam guardados por 60 semanas (`/etc/logrotate.d/morelidev-analytics`).

A instalação é idempotente e roda a cada publicação (`deploy/painel/setup.sh`, chamado por `configure-edge.sh`). Em desenvolvimento os eventos aparecem só no console do navegador.

### Senha

Na primeira publicação o script cria o usuário `morelidev` com uma senha aleatória e grava as credenciais em `/root/morelidev-painel-acesso.txt` (permissão 600). Elas não aparecem nos logs do GitHub Actions. Para ler:

```bash
ssh root@morelidev.com cat /root/morelidev-painel-acesso.txt
```

Para trocar a senha (o deploy seguinte preserva o arquivo existente):

```bash
ssh -t root@morelidev.com 'printf "morelidev:%s
" "$(openssl passwd -apr1)" > /etc/nginx/morelidev-painel.htpasswd'
```

## Recuperação

Os backups ficam em `/app/data/backups` dentro do volume do banco. Não executar `docker compose down -v`. As imagens têm a revisão Git na tag. Uma reversão precisa verificar compatibilidade do schema antes de restaurar banco ou iniciar imagem anterior; nenhum restore destrutivo é automático.
