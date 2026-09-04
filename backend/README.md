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
FRONTEND_URL=http://localhost:5173,http://other-origin.com
```

`FRONTEND_URL` accepts comma-separated values for multiple allowed CORS origins.

## Docker Setup

El backend se puede levantar completamente con Docker Compose, incluyendo PostgreSQL.

### Requisitos

- Docker
- Docker Compose

### Configuración inicial

```bash
# Desde el directorio backend
cp .env.example .env
# Editar .env y cambiar JWT_SECRET por algo seguro
```

### Comandos Make

| Comando | Descripción |
|---------|-------------|
| `make help` | Muestra ayuda de comandos disponibles |
| `make up` | Construye y levanta los contenedores en segundo plano |
| `make down` | Detiene y elimina los contenedores (conserva volúmenes) |
| `make restart` | Reinicia los contenedores |
| `make logs` | Muestra los logs en tiempo real del backend |
| `make build` | Construye las imágenes sin levantar |
| `make ps` | Muestra el estado de los contenedores |
| `make shell-backend` | Abre una shell en el contenedor del backend |
| `make shell-db` | Abre psql en el contenedor de PostgreSQL |
| `make migrate` | Ejecuta las migraciones de Prisma manualmente |
| `make seed` | Ejecuta el seed de la base de datos |
| `make status` | Muestra el estado de salud de los servicios |

### Inicio rápido

```bash
cd backend
make up
```

Servicios disponibles:
- **Backend**: http://localhost:3001
- **PostgreSQL**: localhost:5432

### Eliminar datos persistentes

Para eliminar los volúmenes (incluyendo los datos de la base de datos):

```bash
cd backend
docker compose down -v
```

### Verificar estado

```bash
make status
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | User login |
| GET | /api/auth/me | Get current user |
| GET | /api/files | List files (paginated) |
| POST | /api/files/upload | Upload CSV file |
| GET | /api/files/:id | Get file details |
| GET | /api/files/:id/download | Download file as CSV |
| DELETE | /api/files/:id | Delete file (ADMIN only) |

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
