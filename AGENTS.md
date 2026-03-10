# Contexto Do Projeto

## Objetivo deste arquivo

Este arquivo existe para servir como memória de contexto do repositório nas próximas conversas.
O foco é permitir respostas mais precisas sobre o projeto sem precisar alterar o código.

## Regras de uso definidas pelo dono do repositório

- Responder sempre em português.
- Atuar apenas para tirar dúvidas sobre o projeto.
- Não modificar código, dependências, configuração ou estrutura do projeto sem pedido explícito.
- Se for necessário sugerir mudança, explicar primeiro e não executar por conta própria.
- Quando o usuário pedir avaliação do projeto, comparar com as boas práticas da versão atual do Next.js usada no repositório.
- Manter um padrão de exigência próximo ao que um desenvolvedor sênior adotaria.
- Não suavizar críticas para agradar; apontar problemas de forma direta, técnica e honesta.
- Priorizar diagnóstico real, riscos arquiteturais e desvios de boas práticas acima de elogios.

## Visão geral

Este projeto é um frontend em `Next.js` com `App Router`, escrito em `TypeScript`, usando `React 19`, `Tailwind CSS v4`, `react-hook-form`, `zod` e `react-hot-toast`.

O app funciona como interface para uma API externa de lista de tarefas, aparentemente feita em `FastAPI`. O frontend não implementa a lógica principal de dados diretamente; ele consome a API externa via serviços `server-only` em `src/features/*/services`, usando o `src/lib/http/api-caller.ts`.

## Stack e ferramentas

- `next@16.1.6`
- `react@19.2.3`
- `react-dom@19.2.3`
- `typescript@5`
- `tailwindcss@4`
- `react-hook-form`
- `@hookform/resolvers`
- `zod`
- `jwt-decode`
- `@heroicons/react`
- `react-hot-toast`

## Scripts disponíveis

- `npm run dev`: sobe o ambiente de desenvolvimento
- `npm run build`: gera build de produção
- `npm run start`: inicia a aplicação em modo produção
- `npm run lint`: roda o ESLint
- `npm run format`: roda o Prettier
- `npm run preadd`: formata antes de adicionar ao git
- `npm run add`: executa `git add .`

## Configuração geral

- `next.config.mjs`: habilita `reactCompiler: true`
- `tsconfig.json`: projeto em modo `strict`, com aliases:
  `@components/*` -> `src/components/*`
  `@application/*` -> `src/app/*`
  `@lib/*` -> `src/lib/*`
  `@features/*` -> `src/features/*`
  `@root/*` -> raiz do projeto
- `postcss.config.mjs`: integra Tailwind v4
- `eslint.config.mjs`: configuração flat do ESLint
- `.eslintrc.js`: configuração antiga do ESLint ainda presente no repositório
- `.prettierrc`: `semi: true`, `singleQuote: true`, `trailingComma: all`, `printWidth: 80`
- `.vscode/settings.json`: salva formatando, organiza imports e aplica correções do ESLint automaticamente

## Variáveis de ambiente

- `URL_API`: URL base da API externa

Observação:
O `.example.env` indica que o backend esperado está no repositório `app_todo_list`.
O `.env` local aponta para um backend privado em rede/local. O valor não deve ser replicado automaticamente em respostas futuras.

## Arquitetura funcional

Camadas principais:

- `src/app`: páginas, layouts, `loading.tsx` e `not-found.tsx`
- `src/components`: componentes compartilhados (ex.: navegação)
- `src/features`: módulos por domínio (`auth`, `todos`, `users`) com `actions`, `services`, `schemas`, `components` e `types`
- `src/lib`: utilitários transversais (tipos, erros e HTTP)

Além disso:

- `src/proxy.ts` contém lógica de middleware para controle de acesso entre rotas públicas e privadas, mas não há `middleware.ts` conectado no projeto.

## Fluxo de autenticação

O fluxo atual é baseado em cookie e server actions:

- `loginAction` valida com `zod` e chama `loginUser`, que envia `username` e `password` para `POST /auth/token`
- Em caso de sucesso, `setSessionCookies` grava o cookie `access_token` (httpOnly) e tenta gravar `sub` extraído do JWT
- `registerAndLoginAction` cria usuário em `POST /users/` e em seguida faz login
- `logoutAction` limpa `access_token` e `sub`
- `getUserSubFromToken` decodifica o JWT quando o cookie `sub` não existe

## Rotas públicas

- `/`: página inicial com chamada para login e link para `/hello`
- `/login`: formulário de login
- `/register`: formulário de cadastro
- `/hello`: página de teste para provar comunicação com a API externa

## Rotas privadas

- `/dashboard`: exibe tarefas agrupadas por estado
- `/new-task`: cria nova tarefa
- `/profile`: exibe dados do usuário autenticado

O layout privado em `src/app/(private)/layout.tsx` mostra uma barra de navegação com botões para:

- `Dashboard`
- `Nova Tarefa`
- `Perfil`

## Chamadas à API externa

Serviços atuais e endpoints usados:

- `GET /`: usado no Hello
- `POST /auth/token`: login
- `POST /users/`: cadastro
- `GET /users/{sub}`: dados do usuário
- `GET /todos/?limit=10&offset=0`: listagem de tarefas
- `POST /todos/`: criação de tarefa
- `DELETE /todos/{id}`: exclusão de tarefa

## Páginas e comportamento

### Home

Arquivos:

- `src/app/(public)/(home)/page.tsx`
- `src/app/(public)/(home)/_components/home-page.tsx`

Função:

- apresenta a aplicação
- oferece link para login
- oferece link para a página de teste `/hello`

### Login

Arquivos:

- `src/app/(public)/login/page.tsx`
- `src/features/auth/components/form-login.tsx`

Função:

- coleta email e senha
- valida com `zod`
- chama `loginAction` (server action)
- redireciona para `/dashboard` em sucesso

### Cadastro

Arquivos:

- `src/app/(public)/register/page.tsx`
- `src/features/users/components/form-register.tsx`

Função:

- cria usuário por `registerAndLoginAction`
- em seguida faz login automático
- redireciona para `/dashboard`

### Hello

Arquivos:

- `src/app/(public)/hello/page.tsx`
- `src/app/(public)/hello/_services/get-hello.ts`

Função:

- busca uma mensagem da API externa
- renderiza o JSON formatado visualmente
- em caso de erro da API, mostra a mensagem de detalhe

### Dashboard

Arquivos:

- `src/app/(private)/dashboard/page.tsx`
- `src/features/todos/components/list-card.tsx`
- `src/features/todos/components/card.tsx`

Função:

- busca tarefas via `getTodos`, usando `access_token`
- divide em três colunas: `TODO`, `DOING` e `DONE`
- permite mudar estado visualmente no cliente
- permite excluir tarefa via `DELETE /todos/{id}`

Ponto importante:
Hoje a mudança de estado entre `TODO`, `DOING` e `DONE` é apenas local no frontend. Não existe chamada visível para persistir essa alteração na API externa.

### Nova tarefa

Arquivos:

- `src/app/(private)/new-task/page.tsx`
- `src/features/todos/components/task-input.tsx`

Função:

- cria uma tarefa por `createTodoAction`
- revalida `/dashboard` após criação
- exibe toast perguntando se o usuário quer cadastrar outra tarefa

### Perfil

Arquivos:

- `src/app/(private)/profile/page.tsx`
- `src/features/users/components/profile.tsx`

Função:

- busca os dados do usuário autenticado por `getUser`
- exibe `id`, `username` e `email`

### Loading e Not Found

- `loading.tsx` existe para `dashboard`, `login`, `register` e `hello`
- `not-found.tsx` define a tela 404

## Componentes principais

- `src/features/auth/components/form-login.tsx`: formulário com validação local via `zod`
- `src/features/users/components/form-register.tsx`: formulário com confirmação de senha
- `src/features/todos/components/task-input.tsx`: formulário de criação de tarefa
- `src/features/todos/components/list-card.tsx`: distribui tarefas em colunas por estado
- `src/features/todos/components/card.tsx`: card individual da tarefa com ações de avançar, voltar e excluir
- `src/features/auth/components/logout-button.tsx`: limpa sessão e redireciona para `/`
- `src/components/navigation/home-button.tsx`: atalho para a home
- `src/features/users/components/profile.tsx`: exibição simples de dados do usuário

## Utilitários e domínio

### `src/lib/http/api-caller.ts`

Centraliza chamadas para a API externa usando `fetch`.
Se `URL_API` não existir, lança erro.
Quando a API responde com erro, encapsula isso em `ApiError`.

### `src/lib/errors/api-error.ts`

Define `ApiError` com:

- `message`
- `detalhe`
- `status`

### `src/lib/types.ts`

Tipos principais:

- `Message`
- `ActionResult`

### `src/features/auth/services/session.ts`

Funções:

- `getUserSubFromToken()` e `getUserSub()`
- `isTokenValueExpired()` e `isTokenExpired(request)`
- `setSessionCookies()` e `clearSessionCookies()`

### `src/features/*/schemas.ts`

Schemas principais:

- `auth`: `loginSchema`
- `users`: `registerUserSchema` e `registerUserFormSchema`
- `todos`: `registerTodoSchema`

### `src/features/todos/todo-state.ts`

Enum `TodoState`:

- `todo`
- `doing`
- `done`
- `trash`

### Tipos de domínio

- `src/features/users/types.ts`: `User`
- `src/features/todos/types.ts`: `Todo`, `TodoList`

## Detalhes técnicos relevantes para futuras dúvidas

- O projeto usa `App Router` e server actions (`src/features/auth/actions.ts`, `src/features/todos/actions.ts`).
- As chamadas à API externa são feitas no servidor via `server-only` e `src/lib/http/api-caller.ts`.
- O dashboard atualiza estado apenas em memória no cliente; apenas a exclusão faz chamada de API.
- A listagem do dashboard usa limite fixo de `10` tarefas.
- Não há testes automatizados no repositório.
- O `README.md` ainda está parcialmente no template padrão do Next.js.
- Há coexistência de duas configurações de ESLint (`eslint.config.mjs` e `.eslintrc.js`).
- O `body` em `globals.css` usa `Arial, Helvetica, sans-serif`, embora as fontes Geist estejam carregadas no layout.
- `src/proxy.ts` contém lógica de middleware, mas não há `middleware.ts` no projeto para conectá-lo.
- `src/features/todos/components/card.tsx` usa `cookies()` e serviço `server-only` dentro de um componente importado por `list-card.tsx` (client), o que pode gerar conflito de renderização.

## Pontos pendentes já visíveis no próprio repositório

O `README.md` lista como pendências:

- Imprementação das demais funções que retornam da API
- Geração dos testes
- Ajustes no CI
- Refatoração completinha (marcada como concluída no README)
- Desenvolver CD
- Template Pull Request
- Criar um README de verdade

## Arquivos observados

Foram lidos os arquivos de configuração, páginas, layouts, componentes, serviços, schemas, utilitários e arquivos de ambiente/versionamento relevantes do projeto.

Arquivos gerados ou de terceiros, como `node_modules` e `.next`, não devem ser tratados como código autoral do projeto.

## Como devo agir nas próximas conversas

Ao responder dúvidas sobre este repositório, devo:

- responder em português
- assumir que o usuário quer explicações, não alterações
- usar este arquivo como referência rápida do projeto
- evitar sugerir mudanças invasivas sem necessidade
- deixar explícito quando alguma conclusão depender da API externa e não apenas do frontend
- quando houver pedido de revisão, responder com rigor técnico e franqueza, no padrão mais próximo possível de um dev sênior
