# Backend Context

API REST para una aplicación de gestión de archivos CSV con autenticación de usuarios.

## Descripción general

Backend en Node.js + Express que provee endpoints para la gestión de archivos CSV. Soporta autenticación con JWT, control de acceso basado en roles (ADMIN, MEMBER) y operaciones CRUD sobre archivos y documentos.

## Stack

- **Lenguaje/Framework**: Node.js + Express + TypeScript
- **Base de datos**: PostgreSQL
- **ORM**: Prisma
- **Estilo de API**: REST
- **Autenticación**: JWT
- **Validación**: Zod
- **Upload de archivos**: Multer + csv-parse

## Requisitos previos

- Node.js 18+
- PostgreSQL 14+
- pnpm

## Puertos y servicios

| Puerto | Servicio | Descripción |
|--------|----------|-------------|
| 3001 | Express API | Servidor backend principal |

## Variables de entorno

```
DATABASE_URL=postgresql://user:password@localhost:5432/csvmanager
JWT_SECRET=your-super-secret-key
PORT=3001
FRONTEND_URL=http://localhost:5173
JWT_EXPIRES_IN=24h
```

## Endpoints principales

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/api/auth/register` | Registrar nuevo usuario | No |
| POST | `/api/auth/login` | Inicio de sesión | No |
| GET | `/api/auth/me` | Obtener usuario actual | Sí |
| GET | `/api/files` | Listar archivos CSV (paginado) | Sí |
| POST | `/api/files/upload` | Subir archivo CSV | Sí |
| GET | `/api/files/:id` | Obtener detalles de archivo | Sí |
| GET | `/api/files/:id/download` | Descargar archivo CSV reconstruido | Sí |
| DELETE | `/api/files/:id` | Eliminar archivo | Sí (ADMIN) |

## Modelos de datos

### User

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | String (UUID) | Identificador único |
| email | String | Email único |
| password | String | Contraseña hasheada (bcrypt) |
| role | Enum | `ADMIN` o `MEMBER` (default: `MEMBER`) |
| createdAt | DateTime | Fecha de creación |
| updatedAt | DateTime | Fecha de actualización |

### File

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | String (UUID) | Identificador único |
| name | String | Nombre original del archivo |
| path | String | Ruta del archivo |
| size | Int | Tamaño en bytes |
| userId | String | Referencia al usuario que subió el archivo |
| createdAt | DateTime | Fecha de subida |
| updatedAt | DateTime | Fecha de actualización |

### Document

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | String (UUID) | Identificador único |
| fileId | String | Referencia al archivo |
| correo | String | Email validado |
| nombre | String | Nombre de la persona |
| telefono | String | Teléfono (7-15 dígitos) |
| ciudad | String | Ciudad |
| notas | String? | Notas (opcional) |

## Middlewares principales

- **authMiddleware**: Verifica el token JWT en el header `Authorization`
- **requireAdmin**: Verifica que el usuario tenga rol `ADMIN`
- **validateBody/validateQuery**: Valida payloads con esquemas Zod
- **uploadMiddleware**: Maneja la subida de archivos con Multer (10MB max)
- **errorHandler**: Manejo centralizado de errores con respuestas en español
