# Job-Portal


# Portal de emprego Mern-Stack

## Descrição

O **Job Portal MERN** é uma aplicação web desenvolvida com a stack MERN (MongoDB, Express.js, React e Node.js), permitindo que usuários possam se cadastrar, logar e gerenciar vagas de emprego. A plataforma utiliza **Auth0** para autenticação segura dos usuários.

### Funcionalidades

- **Autenticação com Auth0**: Login seguro através da plataforma Auth0.
- **Gerenciamento de Vagas**: Criar, atualizar, editar e deletar vagas.
- **Candidatura a Vagas**: Usuários podem aplicar a vagas e salvá-las para visualizar depois.
- **Mensagens Dinâmicas**: Notificações amigáveis com React Toast.

## Tecnologias Utilizadas

### Frontend (client)
- **React + Vite**
- **JavaScript**
- **Dotenv** (para variáveis de ambiente)
- **Axios** (para requisições HTTP)
- **React Toast** (para mensagens dinâmicas)

### Backend (server)
- **Node.js + Express.js**
- **MongoDB + Mongoose**
- **Cors** (para permitir comunicação entre diferentes origens)
- **JWT** (para autenticação segura)
- **express-oauth2-jwt-bearer** (integração com Auth0)
- **express-openid-connect** (facilitação de login via Auth0)

## Estrutura do Projeto

```
Job Portal Mern
├── client/     # Frontend (React + Vite)
├── server/     # Backend (Node.js + Express)
└── README.md   # Documentação
```

## Configuração e Instalação

### 1. Clonar o repositório
```bash
git clone https://github.com/404GabrielDev/Job-Portal.git
cd Job-Portal
```

### 2. Configurar o Backend
```bash
cd server
npm install
```

Crie um arquivo `.env` no diretório `server` com as seguintes variáveis:
```env
NODE_ENV=development
SECRET=sua chave secreta
BASE_URL= Endereço do Backend aqui, como por exemplo: http://localhost:8000
CLIENT_ID=seu Id de cliente, ( campo fornecido no painel da plataforma Auth0 )
ISSUER_BASE_URL=seu dominio aqui, caso não tiver um personalizado, a plataforma auth0 disponibiliza um no painel
CLIENT_URL=Endereço  do frontend, nesse caso com projeto vite: http://localhost:5173
PORT=8000
MONGO_URI=String de conexão do mongoDb, disponibilizado no painel: mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority (substitua pelas as suas informações )

AUTH0_AUDIENCE=endereço do backend: http://localhost:8000

```
Inicie o backend:
```bash
npm start
```

### 3. Configurar o Frontend
```bash
cd client
npm install
```

Crie um arquivo `.env` no diretório `client`:
```env
VITE_AUTH0_DOMAIN= Seu dominio da plataforma Auth0, ou caso tenha um proprio
VITE_CLIENT_ID= Seu id, disponibilizado no painel do auth0
VITE_CLIENT_URL= Endereço do frontend: http://localhost:5173
VITE_AUTH0_CALLBACK_URL= Local pra onde o usuario será enviado após o login, como por exemplo: http://localhost:8000/callback ou http://localhost:8000/home
VITE_AUTH0_AUDIENCE= Prefixo do Endereço do Login da propria plataforma auth0: /api/v2/ ( ultilize isso, no final do dominio )
VITE_AUTH0_REDIRECT_URI=http://localhost:5173/callback

```
Inicie o frontend:
```bash
npm run dev
```

## Testes
Para rodar os testes:
```bash
npm test
```

## Contribuição
1. Fork o repositório.
2. Crie uma branch (`git checkout -b feature/nova-feature`).
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Push para o repositório (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença
Este projeto está sob a Licença MIT

## Contato
- Nome: Gabriel
- Email: joaogabriell.ssm@gmail


