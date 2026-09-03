# CSV Manager

Web application for managing CSV files with user authentication.

## Projects

- `frontend/` - Vue 3 application
- `backend/` - Express REST API

## Quick Start

```bash
# Install dependencies
cd frontend && pnpm install
cd backend && pnpm install

# Generate Prisma client
cd backend && pnpm prisma generate

# Run both projects
npm run dev
```

## Available Commands

From root:

```bash
npm run dev              # Run both projects
npm run dev:backend     # Run backend only
npm run dev:frontend    # Run frontend only
npm run test            # Run all tests
npm run lint            # Lint all projects
npm run build           # Build all projects
npm run install:all     # Install all dependencies
```

## Documentation

See individual project READMEs:
- `frontend/README.md`
- `backend/README.md`

See `docs/` for project context and tasks.
