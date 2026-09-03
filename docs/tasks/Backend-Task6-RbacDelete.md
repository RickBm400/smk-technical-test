# TODO: Backend Task-6: RBAC on Delete Endpoint

**Estado:** Completado ✓

**Descripción:**
Aplicar middleware requireAdmin al endpoint DELETE /api/files/:id para que solo admins puedan eliminar archivos.

**Archivos modificados:**

- `backend/src/routes/files.ts` - Endpoint DELETE ahora usa requireAdmin

**Cambios:**
1. Importado `requireAdmin` de middleware/role.ts
2. Endpoint DELETE aplica `requireAdmin` antes del handler

**Comportamiento:**
- Cualquier usuario autenticado puede ver y subir archivos
- Solo usuarios con rol ADMIN pueden eliminar archivos
- Error 403 "Admin access required" si un MEMBER intenta eliminar

**Seguridad:**
- Eliminación ya no requiere que el usuario sea dueño del archivo
- Cualquier admin puede eliminar cualquier archivo
