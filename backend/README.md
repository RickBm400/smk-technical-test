# CSV Manager - Backend

Express + TypeScript REST API for CSV file management.

## Stack

- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Auth**: JWT
- **Validation**: Zod
- **Testing**: Jest

## Setup

```bash
pnpm install
pnpm prisma generate
```

## Development

```bash
pnpm dev
```

Runs on http://localhost:3001

## Database

```bash
pnpm db:push    # Push schema to database
pnpm db:migrate # Run migrations
pnpm db:generate # Generate Prisma client
```

## Build

```bash
pnpm build
```

## Test

```bash
pnpm test
```

## Environment Variables

```
DATABASE_URL=postgresql://user:password@localhost:5432/csvmanager
JWT_SECRET=your-super-secret-key
PORT=3001
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | User login |
| GET | /api/auth/me | Get current user |
| GET | /api/files | List files |
| POST | /api/files | Upload file |
| GET | /api/files/:id | Get file |
| DELETE | /api/files/:id | Delete file |

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm test` | Run tests |
| `pnpm lint` | Lint files |
| `pnpm db:push` | Sync schema to DB |
| `pnpm db:migrate` | Run migrations |
| `pnpm db:generate` | Generate Prisma client |
