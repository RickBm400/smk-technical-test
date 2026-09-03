# TODO: Task-2: SignUp Feature

**Estado:** Completado ✓

**Descripción:**
- Formulario de registro con email, password, confirm password y rol
- Validación doble de password
- Selección de rol: ADMIN o MEMBER

**Archivos implementados:**

### Backend
- `backend/src/routes/auth.ts` - Register endpoint (POST /api/auth/register)
- `backend/prisma/schema.prisma` - User model con roles

### Frontend
- `frontend/src/features/auth/views/SignUpView.vue` - SignUp component
- `frontend/src/features/auth/stores/auth.ts` - register action

**Validaciones:**
- Email: formato válido requerido
- Password: mínimo 6 caracteres
- Confirm Password: debe coincidir con password
- Rol: ADMIN o MEMBER (default MEMBER)
- Email duplicado: retorna error 400
