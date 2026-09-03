# TODO: Backend Task-5: RBAC Middleware

**Estado:** Completado ✓

**Descripción:**
Crear middleware requireAdmin para control de acceso basado en roles.

**Archivos implementados:**

- `backend/src/middleware/role.ts` - Middleware requireAdmin

**Implementación:**
```typescript
export const requireAdmin = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  if (req.userRole !== 'ADMIN') {
    return next(new AppError(403, 'Admin access required'))
  }
  next()
}
```

**Uso:**
El middleware extrae `userRole` del token JWT (configurado en auth middleware) y verifica que sea 'ADMIN'.
