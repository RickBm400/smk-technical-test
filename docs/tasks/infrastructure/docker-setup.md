# TODO: Docker Setup for Backend + PostgreSQL

**Estado:** Completado ✓

**Descripción:**
Containerizar el backend Express + Prisma y configurar una base de datos PostgreSQL en Docker con volumen persistente para mantener los datos entre reinicios.

## Decisiones de diseño

- **Ubicación de archivos**: `backend/` (self-contained)
- **Variables de entorno**: `.env` (gitignored) + `.env.example` (commited)
- **Migraciones**: Auto-ejecutar al iniciar el contenedor (`prisma migrate deploy`)
- **Solo backend**: No incluir Dockerfile del frontend

## Arquitectura

```
docker-compose
├── backend (Node.js + Express)
│   ├── Multi-stage build
│   ├── Puerto: 3001
│   ├── Auto-run migrations
│   └── Healthcheck
└── postgres (PostgreSQL 16-alpine)
    ├── Puerto: 5432
    ├── Volumen: postgres_data
    └── Healthcheck pg_isready
```

## Archivos a crear

1. `backend/Dockerfile` - Multi-stage build
2. `backend/.dockerignore` - Excluir archivos innecesarios
3. `backend/docker-compose.yml` - Orquestación de servicios
4. `backend/.env.example` - Template de variables de entorno

## Archivos NO modificados

- `backend/.env` (existente) - Sigue usando localhost para desarrollo local
- docker-compose override de DATABASE_URL cuando se ejecuta en contenedores

## Verificación post-implementación

```bash
cd backend
docker compose build
docker compose up -d
docker compose ps  # Verificar healthy
curl http://localhost:3001/api/health
docker compose exec postgres psql -U postgres -c '\dt'
```

## Notas

- Multi-stage build mantiene la imagen final ~150MB
- Usuario no-root (node) por seguridad
- Volumen nombrado `postgres_data` para persistencia
- Red personalizada para comunicación entre servicios
- Healthchecks en ambos servicios

## Implementación
