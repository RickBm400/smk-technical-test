# TODO: Backend Task-8: Paginated Files Endpoint

**Estado:** Completado ✓

**Descripción:**
Implementar mecanismo de paginación en el endpoint `/files` para reducir la carga de respuesta, con funcionalidad de búsqueda por nombre de archivo o email de usuario.

**Archivos modificados:**

- `backend/src/routes/files.ts` - Endpoint GET /files actualizado

**Cambios implementados:**

### Endpoint GET /files

**Query Parameters:**
- `page` (default: 1) - Número de página
- `limit` (default: 10) - Registros por página
- `search` (opcional) - Búsqueda por nombre de archivo o email

**Respuesta:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "archivo.csv",
      "size": 1234,
      "uploadedBy": "user@example.com",
      "createdAt": "2024-01-15T10:30:00Z",
      "documentCount": 50
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

**Funcionalidades:**
- Búsqueda case-insensitive por nombre de archivo
- Búsqueda case-insensitive por email del usuario que subió
- Paginación con skip/take de Prisma
- metadata de paginación incluida en respuesta
