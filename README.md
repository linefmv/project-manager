# Project Manager

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-3.2-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)

## Sobre o Projeto

Aplicação frontend para gerenciamento de projetos. A solução oferece uma interface intuitiva e responsiva para criar, editar, organizar e buscar projetos, com foco em experiência do usuário e qualidade de código.
(+infos na wiki)[
Construída com **React 18**, **TypeScript** (strict mode), **Vite 6**, **TanStack Query v5** e **React Hook Form**.


**[Acesse a aplicação](https://alineviana.github.io/project-manager/)**

---

## Sumário

- [Requisitos](#requisitos)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Deploy](#deploy)
- [Como Executar](#como-executar)

---

## Requisitos

### Checklist de Requisitos

| Requisito | Status |
|-----------|--------|
| Listagem inicial sem projetos (Empty State) | ✅ |
| Título da página com total de projetos | ✅ |
| Filtro para exibir apenas favoritos | ✅ |
| Ordenação alfabética (padrão) | ✅ |
| Ordenação por projetos mais recentes | ✅ |
| Ordenação por prazo de finalização | ✅ |
| Formulário de criação de projeto | ✅ |
| Formulário de edição de projeto | ✅ |
| Modal de confirmação de remoção | ✅ |
| Favoritar/desfavoritar projetos | ✅ |
| Busca com mínimo de 3 caracteres | ✅ |
| **(Opcional)** Histórico das últimas 5 buscas | ✅ |
| **(Opcional)** Highlight nos resultados da busca | ✅ |

---

## Tecnologias

| Categoria | Tecnologia |
|-----------|------------|
| **Framework** | React 18 com Hooks |
| **Linguagem** | TypeScript (strict mode) |
| **Build Tool** | Vite 6 |
| **Estilização** | Tailwind CSS |
| **Ícones** | Lucide React |
| **Server State** | TanStack Query v5 |
| **Formulários** | React Hook Form |
| **Roteamento** | React Router DOM v6 |
| **Notificações** | React Toastify |
| **Testes** | Vitest + React Testing Library |
| **CI/CD** | GitHub Actions + GitHub Pages |

---

## Arquitetura

O projeto segue uma arquitetura modular focada em **separação de responsabilidades** e **manutenibilidade**:

```
┌─────────────────────────────────────────────────────────────┐
│                        Pages                                │
│              (Composição de componentes)                    │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│  Components   │   │    Hooks      │   │   Queries     │
│     (UI)      │   │   (Lógica)    │   │ (Server State)│
└───────────────┘   └───────────────┘   └───────────────┘
                            │                   │
                            └─────────┬─────────┘
                                      ▼
                            ┌───────────────┐
                            │   Services    │
                            │  (API Layer)  │
                            └───────────────┘
```


---

## Deploy

A aplicação está deployada no **GitHub Pages**: [https://linefmv.github.io/project-manager/](https://linefmv.github.io/project-manager/)

O deploy acontece automaticamente a cada push na branch `main` ou pode ser feito manualmente com `npm run deploy`.

---

## Como Executar

### Pré-requisitos

- **Node.js** v22+ (veja `.nvmrc`)
- **npm** v10+

### Instalação

```bash
git clone https://github.com/alineviana/project-manager.git
cd project-manager

nvm use

npm install
```

### Configuração

A URL da API está configurada em `src/config/api.ts`:

```typescript
export const API_BASE_URL = 'https://us-central1-backend-project-manager.cloudfunctions.net/api'
```

> **Nota:** O backend foi desenvolvido utilizando Cloud Functions + Firebase, permitindo que o frontend focasse exclusivamente na interface e experiência do usuário.

### Execução

```bash
npm run dev

npm run build

npm run preview
```

A aplicação estará disponível em `http://localhost:3000`

---

