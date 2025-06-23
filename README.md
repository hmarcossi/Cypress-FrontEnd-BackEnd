# Projeto de Automação de Testes com Cypress

Este projeto contém testes automatizados E2E (End-to-End) para Frontend e Backend da plataforma de testes [ServeRest](https://serverest.dev/).

## ✨ Funcionalidades Testadas

### Backend (API)
- **Usuários:**
  - Cadastro de usuários (administradores e comuns).
  - Validação de campos obrigatórios (nome, email, senha).
  - Validação de e-mail duplicado.
- **Produtos:**
  - Autenticação para acesso às rotas.
  - CRUD completo: Criar, Editar, Listar e Deletar produtos.
  - Validação de token de autenticação.

### Frontend (UI)
- **Usuários:**
  - Fluxo de criação de usuário administrador e comum.
  - Fluxo de login.
- **Produtos:**
  - Fluxo de criação de produto.
  - Fluxo de edição de produto.
  - Fluxo de exclusão de produto.

## 🚀 Tecnologias Utilizadas
- **[Cypress](https://www.cypress.io/):** Framework de automação de testes.
- **[Faker.js](https://fakerjs.dev/):** Biblioteca para geração de dados de teste dinâmicos.
- **JavaScript/Node.js:** Linguagem e ambiente de execução.

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/en/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js)

## ⚙️ Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/hmarcossi/Cypress-FrontEnd-BackEnd
    ```
2.  Navegue até a pasta do projeto:
    ```bash
    cd Cypress-FrontEnd-BackEnd
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```

## ▶️ Executando os Testes

Você pode executar os testes de diferentes maneiras usando os scripts definidos no `package.json`.

### Modo Interativo (Test Runner)
Abre a interface do Cypress para selecionar e rodar os testes visualmente.
```bash
npm run test:open
```

### Modo Headless
Executa os testes sem abrir a interface do Cypress.
```bash
npm run test:headless
```

### Executar apenas os testes de Backend
```bash
npm run test:backend
```

### Executa apenas os testes de Frontend
```bash
npm run test:frontend
```

### Executar todos os testes
```bash
npm run test:all
```

## 📂 Estrutura do Projeto

```plaintext
cypress-frontend-backend/
├── cypress/
│   ├── e2e/
│   │   ├── backend/          # Testes de API
│   │   └── frontend/         # Testes de UI
│   │       ├── page_objects/ # Mapeamento de elementos da página
│   │       └── tests/        # Arquivos de teste da UI
│   ├── config/               # Arquivos de configuração de ambiente (ex: dev.json)
│   ├── factories/            # Fábricas para gerar dados de teste dinâmicos
│   ├── reports/              # Relatórios de teste gerados (ignorados pelo .gitignore)
│   └── support/              # Comandos customizados e configurações globais
│       ├── commands.js
│       └── e2e.js
├── cypress.config.js     # Arquivo de configuração principal do Cypress
├── package.json          # Dependências e scripts do projeto
└── README.md
```

## 📊 Gerando Relatórios de Teste
O projeto está configurado com o **Mochawesome** para gerar relatórios HTML detalhados após a execução dos testes.

Para rodar todos os testes e gerar um relatório consolidado, execute:
```bash
npm run test:report
```




