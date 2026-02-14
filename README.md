# Gestão de Fornecedores e Cotações

Sistema de gerenciamento de fornecedores e cotações desenvolvido com Node.js, Express, Sequelize e Swagger.

## Requisitos

- Node.js (versão 14 ou superior)
- PostgreSQL
- npm ou yarn

## Configuração

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Copie o arquivo `.env.example` para `.env`
- Ajuste as variáveis conforme necessário

4. Configure o banco de dados:
- Crie um banco de dados PostgreSQL
- Ajuste as credenciais no arquivo `.env`

## Executando o projeto

Para desenvolvimento:
```bash
npm run dev
```

Para produção:
```bash
npm start
```

## Documentação da API

A documentação da API está disponível através do Swagger UI em:
```
http://localhost:3000/api-docs
```

## Estrutura do Projeto

```
src/
  ├── config/         # Configurações do projeto
  ├── controllers/    # Controladores da aplicação
  ├── models/        # Modelos do Sequelize
  ├── routes/        # Rotas da API
  ├── services/      # Lógica de negócios
  └── index.js       # Arquivo principal da aplicação
``` 