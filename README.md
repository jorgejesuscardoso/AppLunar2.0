# Projeto Lunar 2.0 - Backend e Frontend Aprimorados
### Local do Deploy

O projeto está hospedado e disponível para visualização no seguinte link:

[Projeto Lunar - Deploy no Netlify](https://projetolunar.netlify.app/)

Este link leva à versão mais recente do projeto, onde as atualizações e melhorias são implementadas continuamente. Fique à vontade para explorar e acompanhar o progresso da aplicação!

*Observação:* A plataforma de deploy utilizada é o [Netlify](https://www.netlify.com/), uma ferramenta moderna para hospedagem de sites estáticos com integração contínua, garantindo facilidade no gerenciamento e atualizações rápidas.

### Descrição
Este repositório contém o código do Projeto Lunar, um aplicativo que foi aprimorado com uma nova interface de usuário e mudanças significativas nas tecnologias do frontend e backend. A principal inovação foi a adoção de AWS Lambda para execução de funções serverless, além da migração para o banco de dados NoSQL utilizando o Amazon DynamoDB, visando maior escalabilidade e flexibilidade no gerenciamento dos dados.

## 🛠️ Tecnologias Utilizadas
### Backend:

 - AWS Lambda: Implementação de funções serverless para reduzir a sobrecarga do servidor e otimizar a escalabilidade.
 - AWS DynamoDB: Banco de dados NoSQL gerenciado, usado para armazenar os dados dos usuários e outros recursos do projeto, garantindo alta disponibilidade e desempenho.
 - Node.js (Express): Framework para construção de APIs RESTful.
 - BcryptJS: Utilizado para criptografar senhas dos usuários e garantir maior segurança.
 - JWT: Autenticação via JSON Web Tokens para controle de sessões e segurança.

### Frontend:

 - Vue.js: Biblioteca para construção de interfaces de usuário dinâmicas e responsivas.
 - Tailwind: Para construção do design e layout do frontend.
 - Axios: Cliente HTTP para realizar requisições para o backend.
 - Lucide: Icones modernos para o design do frontend.
 - Sweet Alert 2: Para um visual moderno nos alertas de erros e sucesso.

## 🚀 Novidades do Projeto
### Novo Design:

 - Interface completamente remodelada com foco em uma experiência de usuário (UX) intuitiva e moderno além de design responsivo.

### Infraestrutura Serverless:

 - O backend foi reestruturado para utilizar AWS Lambda, o que elimina a necessidade de gerenciamento de servidores, tornando a aplicação mais escalável e eficiente.
 - A comunicação com o banco de dados foi otimizada com AWS DynamoDB, um banco NoSQL altamente disponível e gerenciado pela AWS.

### Autenticação e Segurança:

 - Implementação de autenticação com JWT (JSON Web Tokens) para garantir uma camada de segurança robusta.
 - Uso de bcryptJS para criptografar senhas, garantindo a proteção dos dados dos usuários.

### Gerenciamento de Dados:

 - Toda a parte de persistência de dados foi transferida para o Amazon DynamoDB, garantindo alta escalabilidade e flexibilidade com o armazenamento NoSQL.

## 🔧 Funcionalidades
 - Autenticação de Usuário: Login seguro usando autenticação JWT.
 - CRUD de Usuários: Funções para criar, buscar, atualizar e listar usuários no banco de dados.
 - Gestão de Dados de Usuário: Informações como nome, idade, telefone, status e pontos de usuário são gerenciadas através do backend e armazenadas no DynamoDB.
 - Relações com Outras Tabelas: O backend foi projetado para escalar conforme novas relações e funcionalidades sejam adicionadas.

## 🌱 Próximos Passos
 - Implementar mais funcionalidades no frontend, como dashboard de usuário, visualizações e gráficos.
 - Integrar notificações e alertas via AWS SNS ou AWS SQS.
 - Expandir a autenticação com OAuth para permitir logins sociais.
