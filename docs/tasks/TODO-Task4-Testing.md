# TODO: Task-4: Unit Testing

**Estado:** Completado ✓

**Descripción:**
- Tests unitarios para login y sign up
- Tests de validación de schemas Zod

**Archivos implementados:**

### Frontend (Vitest + Vue Test Utils)
- `frontend/vite.config.ts` - Configuración Vitest con jsdom
- `frontend/src/tests/setup.ts` - Setup global para tests
- `frontend/src/features/auth/tests/LoginView.spec.ts`
  - Renderizado de campos
  - Validación email vacío
  - Validación formato email
  - Validación password vacío
- `frontend/src/features/auth/tests/SignUpView.spec.ts`
  - Renderizado del formulario
  - Validación password mismatch
  - Validación password corto

### Backend (Jest + ts-jest)
- `backend/jest.config.js` - Configuración Jest con ts-jest
- `backend/src/__tests__/auth.test.ts`
  - Tests de registerSchema
  - Tests de loginSchema
  - Validaciones de email, password, role

**Comandos para ejecutar:**

Frontend:
```bash
cd frontend && pnpm test
```

Backend:
```bash
cd backend && pnpm test
```
