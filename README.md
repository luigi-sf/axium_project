Gestão de Fornecedores e Cotações – AXIUM

Sistema de gerenciamento de fornecedores, produtos e cotações desenvolvido com Node.js, Express, TypeScript, Prisma ORM e Swagger.

Requisitos

Node.js (versão 18 ou superior)

PostgreSQL

npm ou yarn

Configuração
1️⃣ Clone o repositório
git clone https://github.com/luigi-sf/project_axium.git
cd project_axium

2️⃣ Instale as dependências
npm install

3️⃣ Configure as variáveis de ambiente

Crie um arquivo .env

Configure a variável:

DATABASE_URL="postgresql://usuario:senha@localhost:5432/axium"
JWT_SECRET="sua_chave_secreta"

4️⃣ Configure o banco de dados
npx prisma migrate dev
npx prisma generate

Executando o projeto
Para desenvolvimento:
npm run dev

Para produção:
npm run build
npm start

Documentação da API

A documentação da API está disponível via Swagger em:

http://localhost:3000/api-docs

Estrutura do Projeto
src/
  ├── config/           # Configurações (JWT, Prisma, Swagger)
  ├── controllers/      # Controladores da aplicação
  ├── dtos/             # Data Transfer Objects
  ├── middlewares/      # Middlewares (auth, error handler)
  ├── routes/           # Rotas da API
  ├── services/         # Regras de negócio
  ├── prisma/           # Schema e configurações do Prisma
  └── server.ts         # Arquivo principal da aplicação

Tecnologias Utilizadas

Node.js

Express

TypeScript

Prisma ORM

PostgreSQL

Swagger (OpenAPI)

JWT
