# TODO: Backend Task-4: CSV Upload Endpoint

**Estado:** Completado ✓

**Descripción:**
Implementar endpoint POST /api/files/upload que:
- Acepta archivo CSV via multipart/form-data
- Parsea y valida todas las filas al mismo tiempo
- Retorna todos los errores con detalles de fila/campo
- Crea registros File y Document en éxito

**Archivos implementados:**

- `backend/src/routes/files.ts` - Nuevo endpoint /upload

**Endpoint:** `POST /api/files/upload`

**Request:** multipart/form-data con campo `file`

**Respuesta de éxito:**
```json
{
  "success": true,
  "file": { "id": "...", "name": "data.csv", "size": 1234 },
  "documentsCreated": 50
}
```

**Respuesta de error (validación):**
```json
{
  "success": false,
  "errors": [
    { "row": 3, "field": "telefono", "message": "Telefono must be numeric with 7-15 digits" },
    { "row": 5, "field": "correo", "message": "Correo must be a valid email" }
  ]
}
```

**Validaciones por campo:**
- correo: email válido
- nombre: no vacío
- telefono: 7-15 dígitos
- ciudad: no vacío
- notas: opcional
