# Backend Tasks List

Lista de tareas correspondientes al proyecto backend.

## Funcionalidades

### Task-1: CSV Row Validation Schema ✓

Implementar esquema Zod para validación de filas CSV con los siguientes campos:

- `correo`: String (formato email, obligatorio)
- `nombre`: String (obligatorio)
- `telefono`: String (solo numérico, obligatorio)
- `ciudad`: String (obligatorio)
- `notas`: String (opcional)

**Status:** Completed ✓

**Detalles:** [Ver documentación](./tasks/backend-features/csv-validation.md)

### Task-2: Document Model ✓

Crear modelo `Document` en el esquema de Prisma para almacenar los datos de las filas del CSV vinculados al modelo `File`.

**Status:** Completed ✓

**Detalles:** [Ver documentación](./tasks/backend-features/document-model.md)

### Task-3: Multer Configuration ✓

Configurar Multer para la subida de archivos con un límite de tamaño de 10MB.

**Status:** Completed ✓

**Detalles:** [Ver documentación](./tasks/backend-features/multer-config.md)

### Task-4: CSV Upload Endpoint ✓

Implementar endpoint `POST /api/files/upload` con los siguientes requisitos:

- Aceptar archivo CSV mediante `multipart/form-data`
- Parsear el CSV y validar todas las filas simultáneamente
- Retornar todos los errores con detalles de fila y campo
- Crear registros de `File` y `Document` en caso de éxito

**Status:** Completed ✓

**Detalles:** [Ver documentación](./tasks/backend-features/csv-upload-endpoint.md)

### Task-8: Paginated dashboard ✓

Para el endpoint `/files`, implementar un mecanismo de paginación con el fin de reducir la carga de respuesta. Agregar la funcionalidad de búsqueda de registros por nombre de archivo o ID de usuario.

**Status:** Completed ✓

**Detalles:** [Ver documentación](./tasks/backend-features/pagination.md)

### Task-9: Download file and Soft Delete ✓

Implementar endpoint de descarga de archivo. A partir de la colección de documentos, crear un endpoint que, dado un ID de archivo, reconstruya el CSV a través del archivo JSON y lo envíe a la capa del frontend.

**Status:** Completed ✓

**Detalles:** [Ver documentación](./tasks/backend-features/file-download.md)

### Task-7: Error Messages ✓

Crear archivo `error-messages.ts` con todos los mensajes de error centralizados y actualizar los archivos del backend para usar estas constantes en lugar de cadenas literales.

**Status:** Completed ✓

**Detalles:** [Ver documentación](./tasks/backend-features/error-messages.md)

## Control de acceso (RBAC)

### Task-5: RBAC Middleware ✓

Crear middleware `requireAdmin` para el control de acceso basado en roles.

**Status:** Completed ✓

**Detalles:** [Ver documentación](./tasks/backend-rbac/rbac-middleware.md)

### Task-6: RBAC on Delete Endpoint ✓

Aplicar middleware `requireAdmin` al endpoint `DELETE /api/files/:id` para que solo los administradores puedan eliminar archivos.

**Status:** Completed ✓

**Detalles:** [Ver documentación](./tasks/backend-rbac/rbac-delete.md)
