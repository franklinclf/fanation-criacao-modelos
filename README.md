# Sistema de Criação de Modelos de Produtos com Montagem de Imagens

## Descrição Geral
Este projeto é um sistema web completo para gerenciar recortes de produtos, permitindo que sejam visualizados em camadas e combinados para formar uma única imagem final. O sistema inclui funcionalidades de CRUD para recortes, upload de imagens para armazenamento em nuvem, organização das camadas por ordem de exibição e visualização dinâmica de modelos montados.

## Funcionalidades Principais

### 1. Autenticação e Autorização
- Login e logout utilizando JWT.
- Acesso restrito às funcionalidades para usuários autenticados.

### 2. CRUD de Recortes
- **Criar**: Cadastro de novos recortes com informações detalhadas.
- **Ler**: Listagem de recortes com paginação.
- **Atualizar**: Edição de recortes existentes.
- **Excluir**: Remoção de recortes, incluindo suas imagens associadas na nuvem.

### 3. Visualização de Modelos
- Montagem dinâmica das camadas com base na ordem de exibição.

### 4. Upload de Imagens
- Upload de imagens associadas aos recortes com armazenamento em nuvem.
- Salvar os links gerados no banco de dados.

### 5. Filtros e Ordenação (Opcional)
- Busca de recortes por nome, tipo ou SKU.
- Ordenação por ordem de exibição ou nome do modelo.

## Tecnologias Utilizadas

### Front-End
- **Framework:** Next.js
- **Estilização:** TailwindCSS

### Back-End
- **Framework:** Next.js (Node.js)
- **Banco de Dados:** PostgreSQL (Firebase Data Connect)
- **ORM:** Prisma
- **Armazenamento de Imagens:** Firebase Storage
- **Autenticação:** JWT