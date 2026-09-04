# TODO: Backend Task-3: Multer Configuration

**Estado:** Completado ✓

**Descripción:**
Configurar Multer para subida de archivos con límite de 10MB.

**Dependencias instaladas:**
- `multer`
- `@types/multer`
- `csv-parse`

**Archivos implementados:**

- `backend/src/config/multer.ts` - Configuración de Multer

**Configuración:**
```typescript
const FILE_SIZE_LIMIT = 10 * 1024 * 1024 // 10MB

export const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: FILE_SIZE_LIMIT },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'text/csv' || ...) {
      cb(null, true)
    } else {
      cb(new Error('Only CSV files are allowed'))
    }
  }
})
```
