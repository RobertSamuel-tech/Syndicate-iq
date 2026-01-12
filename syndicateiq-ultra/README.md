# SyndicateIQ Ultra

**Enterprise AI Operating System for Syndicated Loan Intelligence**

## 🏗️ Architecture

This is a production-ready monorepo built with:

- **Frontend**: Vite + React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Fastify + TypeScript
- **Shared**: Zod schemas for API contracts
- **AI Layer**: Separate services for extraction, reasoning, scoring
- **Database**: Prisma ORM
- **Queue**: Redis or in-memory abstraction
- **Logging**: Pino
- **Environment**: dotenv

## 📁 Project Structure

```
syndicateiq-ultra/
├── apps/
│   ├── frontend/          # React + Vite frontend
│   └── backend/           # Fastify API server
├── packages/
│   ├── shared/            # Shared Zod schemas and types
│   └── ai-services/       # AI extraction, reasoning, scoring services
├── package.json           # Root workspace configuration
└── tsconfig.json          # Root TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL (for database)
- Redis (optional, for queue)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
# - Set DATABASE_URL
# - Add AI API keys
# - Configure other settings

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate
```

### Development

```bash
# Run all services in development mode
npm run dev

# Or run individually:
npm run dev:frontend    # Frontend only (port 5173)
npm run dev:backend     # Backend only (port 3001)
```

### Building

```bash
# Build all packages
npm run build

# Build individually
npm run build:frontend
npm run build:backend
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests for specific workspace
npm test --workspace=apps/backend
```

## 📝 Code Quality

```bash
# Lint all code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check

# Type check
npm run typecheck
```

## 🗄️ Database

```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Open Prisma Studio
npm run db:studio
```

## 📦 Workspaces

### Apps

- **frontend**: React application with Vite
- **backend**: Fastify API server

### Packages

- **shared**: Shared types, schemas, and utilities
- **ai-services**: AI service modules

## 🔐 Environment Variables

See `.env.example` for all required environment variables.

## 📚 Documentation

- [API Documentation](./docs/api.md) - API endpoints and schemas
- [Architecture](./docs/architecture.md) - System architecture
- [Development Guide](./docs/development.md) - Development workflow

## 🏗️ Phases

This project is built in phases:

- ✅ **Phase 0**: Project bootstrap (current)
- ⏳ **Phase 1**: Ingestion pipeline
- ⏳ **Phase 2**: Adaptive extraction
- ⏳ **Phase 3**: Normalization engine
- ⏳ **Phase 4**: Claim reasoning
- ⏳ **Phase 5**: Risk scoring
- ⏳ **Phase 6**: Feedback learning
- ⏳ **Phase 7**: Frontend dashboard
- ⏳ **Phase 8**: Integration & polish

## 📄 License

MIT
