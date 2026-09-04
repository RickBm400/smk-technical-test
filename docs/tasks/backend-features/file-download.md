# TODO: Backend Task-9: Download File Endpoint

**Estado:** Completado ✓

**Descripción:**
Implementar endpoint de descarga de archivo que reconstruye el CSV a partir de los documentos almacenados en la base de datos y lo envía al frontend.

**Archivos implementados:**

### Nuevos
- `backend/src/utils/csvBuilder.ts` - Utilidad para construir CSV

### Modificados
- `backend/src/routes/files.ts` - Nuevo endpoint GET /api/files/:id/download
- `backend/src/common/errors/error-messages.ts` - Nuevo mensaje NO_DOCUMENTS_FOUND

**Endpoint:** `GET /api/files/:id/download`

**Funcionalidad:**
- Busca el archivo por ID
- Recupera todos los documentos asociados al archivo
- Construye un CSV con headers `correo,nombre,telefono,ciudad,notas`
- Escapa valores que contengan comas, comillas o saltos de línea
- Envía el CSV con headers `Content-Type: text/csv` y `Content-Disposition: attachment`

**Respuesta:**
- Status 200 con contenido CSV en el body
- Headers apropiados para descarga automática

**Errores:**
- 404 si el archivo no existe
- 404 si el archivo no tiene documentos
