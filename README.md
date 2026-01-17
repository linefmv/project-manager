# Project Manager

Frontend application for managing projects with full CRUD operations, built with modern web technologies.

## Tech Stack

- React 18 + TypeScript
- Vite
- React Router
- TanStack Query (React Query)
- React Hook Form
- Tailwind CSS
- Lucide Icons
- date-fns

## Getting Started

```bash
npm install
```

```bash
cp .env.example .env
# Configure VITE_API_URL
```

```bash
npm run dev
```

## Architecture

Following the **Summary Pattern**:
- Presentational components (UI only)
- Custom hooks (business logic)
- Service layer (API calls)
- React Query (state & cache management)

## Project Structure

```
src/
├── components/    # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom hooks
├── queries/       # React Query hooks
├── services/      # API service layer
├── types/         # TypeScript definitions
├── utils/         # Helper functions
└── config/        # App configuration
```
