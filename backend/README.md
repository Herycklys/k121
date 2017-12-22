# API do sistema de amigo secreto

O primeiro passo é instalar as dependências do projeto com o comando:
`npm install`

O segundo passo é setar as seguintes variáveis de ambiente na sua maquina:

 1. **MONGO_URI_K121** url da base de dados no formato "mongodb://database_host:database_port/database_name"
 2. **MONGO_AUTH_USER** usuário que é utilizado no banco de dados ( se na sua maquina o mongo não precisa de autenticação, pode pular essa variável ).
 3. **MONGO_AUTH_PASSWORD** senha do usuário do banco de dados ( se na sua maquina o mongo não precisa de autenticação, pode pular essa variável ).
 4. **SERVICE_EMAIL_API_KEY** ApiKey que é gerado no "MailGun" ( aqui optei por utiliza-lo como serviço de envio de emails ).
 5. **SERVICE_EMAIL_DOMAIN** Domínio que é gerado pelo "MailGun".

_Links de como setar variáveis de ambiente_
 - Linux: https://www.cyberciti.biz/faq/set-environment-variable-linux/
 - Windows: http://www.dowdandassociates.com/blog/content/howto-set-an-environment-variable-in-windows-command-line-and-registry/

Após estes passos, é só executar o comando `npm start` e pronto, a aplicação estará rodando na porta **3000**.

**Lembrando que todos esses passos devem ser executados dentro da pasta *./backend* deste projeto**