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

export type ErrorMessageKey = keyof typeof ERROR_MESSAGES
