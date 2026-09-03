# TODO: Backend Task-7: Error Messages

**Estado:** Completado ✓

**Descripción:**
Crear archivo error-messages.ts con todas las mensagens de error centralizadas y actualizar los archivos del backend para usar estas constantes en lugar de strings literales.

**Archivos implementados:**

### Nuevo archivo
- `backend/src/common/errors/error-messages.ts` - Archivo centralizado de mensagens de error

### Archivos modificados
- `backend/src/middleware/errorHandler.ts` - Usa ERROR_MESSAGES
- `backend/src/middleware/auth.ts` - Usa ERROR_MESSAGES
- `backend/src/middleware/role.ts` - Usa ERROR_MESSAGES
- `backend/src/routes/auth.ts` - Usa ERROR_MESSAGES
- `backend/src/routes/files.ts` - Usa ERROR_MESSAGES

**Estructura del archivo error-messages.ts:**

```typescript
export const ERROR_MESSAGES = {
  FILE: {
    NO_FILE_UPLOADED: 'No se ha subido ningún archivo',
    INVALID_CSV_FORMAT: 'Formato CSV inválido',
    CSV_FILE_EMPTY: 'El archivo CSV está vacío',
    FILE_TOO_LARGE: 'El archivo excede el límite de 10MB',
    UNEXPECTED_FILE_FIELD: 'Campo de archivo inesperado',
    FILE_NOT_FOUND: 'Archivo no encontrado',
    FILE_DELETED: 'Archivo eliminado',
    NAME_REQUIRED: 'Nombre, ruta y tamaño son requeridos'
  },
  CSV_VALIDATION: {
    CORREO_INVALID: 'Correo debe ser un email válido',
    NOMBRE_REQUIRED: 'Nombre es requerido',
    TELEFONO_INVALID: 'Teléfono debe ser numérico con 7-15 dígitos',
    CIUDAD_REQUIRED: 'Ciudad es requerida'
  },
  AUTH: {
    INVALID_CREDENTIALS: 'Credenciales inválidas',
    EMAIL_ALREADY_REGISTERED: 'El email ya está registrado',
    ADMIN_ACCESS_REQUIRED: 'Se requiere acceso de administrador',
    NO_TOKEN_PROVIDED: 'No se proporcionó token',
    INVALID_TOKEN: 'Token inválido'
  },
  VALIDATION: {
    EMAIL_INVALID: 'Formato de email inválido',
    PASSWORD_TOO_SHORT: 'La contraseña debe tener al menos 6 caracteres',
    PASSWORD_REQUIRED: 'Contraseña es requerida',
    EMAIL_REQUIRED: 'Email es requerido'
  },
  INTERNAL: {
    SERVER_ERROR: 'Error interno del servidor'
  }
} as const
```

**Beneficios:**
- Centralización de mensagens de error
- Fácil mantenimiento y actualización
- Consistencia en todas las respuestas de error
- type-safety con TypeScript
