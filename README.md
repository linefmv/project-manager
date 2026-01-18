# Clicksign Project Manager

Sistema de gerenciamento de projetos desenvolvido com React e TypeScript, oferecendo operações completas de CRUD (Create, Read, Update, Delete) com interface moderna e responsiva.

## 📋 Sobre o Projeto

O Clicksign Project Manager é uma aplicação frontend moderna para gerenciamento de projetos, permitindo criar, visualizar, editar e excluir projetos de forma intuitiva. O sistema inclui funcionalidades como upload de imagens, gerenciamento de datas e interface amigável.

## ✨ Funcionalidades

- ✅ Listagem de projetos
- ✅ Criação de novos projetos
- ✅ Edição de projetos existentes
- ✅ Exclusão de projetos
- ✅ Upload de imagens para projetos
- ✅ Formulários validados com React Hook Form
- ✅ Gerenciamento de estado com TanStack Query
- ✅ Interface responsiva com Tailwind CSS
- ✅ Navegação com breadcrumbs

## 🚀 Tecnologias Utilizadas

### Core
- **React 18** - Biblioteca para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool e dev server ultra-rápido

### Roteamento e Estado
- **React Router DOM** v6 - Roteamento client-side
- **TanStack Query** (React Query) v5 - Gerenciamento de estado assíncrono e cache

### Formulários e UI
- **React Hook Form** - Gerenciamento de formulários performático
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Biblioteca de ícones
- **date-fns** - Manipulação de datas

### Utilitários
- **clsx** - Gerenciamento de classes CSS
- **tailwind-merge** - Mesclagem de classes Tailwind

## 📦 Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd clicksign
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Edite o arquivo `.env` e configure a URL da API:
```env
VITE_API_URL=https://sua-cloud-function-url.cloudfunctions.net
```

## 🎮 Como Usar

### Desenvolvimento

Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build para Produção

Gere a versão otimizada para produção:
```bash
npm run build
```

### Preview da Build

Visualize a versão de produção localmente:
```bash
npm run preview
```

### Linting

Execute o linter para verificar problemas no código:
```bash
npm run lint
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Breadcrumb/     # Componente de navegação breadcrumb
│   ├── FormDateInput/  # Input de data para formulários
│   ├── FormInput/      # Input genérico para formulários
│   ├── Header/         # Cabeçalho da aplicação
│   ├── Icons/          # Ícones customizados
│   ├── ImageUpload/    # Componente de upload de imagens
│   ├── Layout/         # Layout principal
│   ├── NewProjectButton/ # Botão para criar projeto
│   └── ProjectForm/    # Formulário de projeto
│
├── pages/              # Páginas da aplicação
│   ├── CreateProject/  # Página de criação de projetos
│   └── ProjectsList/   # Página de listagem de projetos
│
├── hooks/              # Custom hooks
│   ├── useProjectForm.ts     # Lógica do formulário de projeto
│   └── useImageUpload.ts     # Lógica de upload de imagem
│
├── services/           # Camada de serviços (API)
│   └── api.ts         # Chamadas à API REST
│
├── types/              # Definições TypeScript
│   └── project.ts     # Tipos relacionados a projetos
│
├── utils/              # Funções utilitárias
│   └── cn.ts          # Utilitário para classes CSS
│
├── config/             # Configurações
│   ├── api.ts         # Configuração da API
│   └── queryClient.ts # Configuração do React Query
│
├── App.tsx            # Componente raiz
└── main.tsx           # Entry point
```

## 🏗️ Arquitetura

O projeto segue o **Summary Pattern**, uma arquitetura que separa responsabilidades:

### Camadas da Aplicação

1. **Componentes Apresentacionais**
   - Responsáveis apenas pela UI
   - Recebem dados via props
   - Não contêm lógica de negócio

2. **Custom Hooks**
   - Encapsulam lógica de negócio
   - Gerenciam estado local
   - Reutilizáveis entre componentes

3. **Service Layer**
   - Centraliza chamadas à API
   - Abstrai detalhes de comunicação HTTP
   - Facilita manutenção e testes

4. **React Query**
   - Gerencia estado assíncrono
   - Cache automático de dados
   - Sincronização em background
   - Otimização de performance

### Fluxo de Dados

```
UI Component → Custom Hook → Service Layer → API
     ↓              ↓              ↓
  Props        Business Logic   HTTP Calls
```

## 🎨 Estilo de Código

- **TypeScript** para tipagem estática
- **ESLint** para linting
- **Tailwind CSS** para estilização
- Convenções de nomenclatura:
  - Componentes: PascalCase
  - Hooks: camelCase com prefixo `use`
  - Utilitários: camelCase

## 🔐 Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `VITE_API_URL` | URL base da API | `https://api.exemplo.com` |

## 📝 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm run preview` | Preview da build de produção |
| `npm run lint` | Executa linter no código |

## 🤝 Contribuindo

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e proprietário.

## 👥 Autores

Desenvolvido pela equipe Clicksign

---

Feito com ❤️ usando React + TypeScript
