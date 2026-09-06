# Publicação MoreliDev

## Fluxo

O deploy usa a revisão exata da `main`, verifica a chave pública do servidor e mantém o `.env` existente em `/opt/morelidev`. A imagem é compilada antes de substituir o container atual. O SQLite recebe um backup consistente no diretório `backups` do volume de dados antes da substituição.

A publicação só termina com sucesso quando o container e `https://morelidev.com/api/health` retornam banco disponível e a revisão esperada. Falhas de migrations interrompem a inicialização. O volume de dados, uploads e a rede compartilhada do Traefik são preservados.

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

## Recuperação

Os backups ficam em `/app/data/backups` dentro do volume do banco. Não executar `docker compose down -v`. As imagens têm a revisão Git na tag. Uma reversão precisa verificar compatibilidade do schema antes de restaurar banco ou iniciar imagem anterior; nenhum restore destrutivo é automático.
