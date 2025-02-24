# Job Portal MERN


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
SECRET=chave aleatoria
BASE_URL=seu local host, como por exemplo : http://localhost:5000
CLIENT_ID=disponivel em seu perfil na plataforma auth0
ISSUER_BASE_URL=seu dominio ( que a plataforma auth oferece ) ou use algum que você ja tenha
CLIENT_URL= seu endereço do frontend, como por exemplo : http://localhost:3000
PORT=a porta que o servidor irá rodar, como por exemplo PORT: 5000

MONGO_URI= sua URL do mongodb, com as suas credenciais, padrão vem assim:
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
Mas substitua pros valores reais: mongodb+srv://meuUsuario:minhaSenha@meuCluster.mongodb.net/meuBanco?retryWrites=true&w=majority

AUTH0_AUDIENCE= endereço do backend, como por exemplo: http://localhost:8000
```
Inicie o backend:
```bash
cd server
npm start
```

### 3. Configurar o Frontend
```bash
cd client
npm install
```

Crie um arquivo `.env` no diretório `client`:
```env
VITE_AUTH0_DOMAIN=seu dominio do auth, ( o que ele oferece ) ou um personalizado, caso tenha
VITE_CLIENT_ID= campo que a plataforma auth0 oferece
VITE_CLIENT_URL= endereço do frontend, como por exemplo: http://localhost:5173
VITE_AUTH0_CALLBACK_URL=http://localhost:8000/callback
VITE_AUTH0_AUDIENCE= link para fazer login e logout da plataforma auth, seu dominio porém com prefixo /api/v2/ no final
VITE_AUTH0_REDIRECT_URI= endereço pra onde o usuario será levado, caso seja feito o login, como por exemplo: http://localhost:5173/callback ou http://localhost:5173/home
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


## Licença
Este projeto está sob a Licença MIT

## Contato
- Nome: Gabriel
- Email: joaogabriell.ssm@gmail.com

