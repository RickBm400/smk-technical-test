# TODO: Task-1: Login Feature

**Estado:** Completado ✓

**Descripción:**
- Login con validación de email (formato) y password (requerido)
- Backend: Endpoint POST /api/auth/login con JWT
- Frontend: Componente LoginView con validación

**Archivos implementados:**

### Backend
- `backend/src/routes/auth.ts` - Login endpoint
- `backend/src/middleware/auth.ts` - JWT middleware
- `backend/src/config/prisma.ts` - Prisma client
- `backend/src/types/schemas.ts` - Zod schemas

### Frontend
- `frontend/src/features/auth/stores/auth.ts` - Auth Pinia store
- `frontend/src/features/auth/views/LoginView.vue` - Login component
- `frontend/src/services/api.ts` - Axios configured instance

**Validaciones:**
- Email: formato válido requerido
- Password: no vacío
- Credenciales inválidas: retorna error 401
