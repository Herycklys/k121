##API do sistema de amigo secreto

O primeiro passo é instalar as dependências do projeto com o comando:
`npm install`

O segundo passo é setar as seguintes variáveis de ambiente na sua maquina:

 1. **MONGOLAB_URI_K121** url da base de dados no formato "mongodb://database_host:database_port/database_name"
 2. **MONGOLAB_AUTH_USER** usuário que é utilizado no banco de dados.
 3. **MONGOLAB_AUTH_PASSWORD** senha do usuário do banco de dados.
 4. **SERVICE_EMAIL_API_KEY** ApiKey que é gerado no "MailGun" ( aqui optei por utiliza-lo como serviço de envio de emails ).
 5. **SERVICE_EMAIL_DOMAIN** Domínio que é gerado pelo "MailGun".

Após estes passos, é só executar o comando `npm start` e pronto, a aplicação estará rodando na porta **3000**.

**Lembrando que todos esses passos devem ser executados dentro da pasta *./backend* deste projeto**