# TODO: Backend Task-1: CSV Row Validation Schema

**Estado:** Completado ✓

**Descripción:**
Implementar esquema de validación Zod para filas CSV con los siguientes campos:
- correo: String (formato email, requerido)
- nombre: String (requerido)
- telefono: String (solo numérico, 7-15 dígitos, requerido)
- ciudad: String (requerido)
- notas: String (opcional)

**Archivos implementados:**

- `backend/src/types/schemas.ts` - Agregado `csvRowSchema` y tipo `CsvValidationError`

**Validaciones:**
```typescript
correo: z.string().email('Correo must be a valid email')
nombre: z.string().min(1, 'Nombre is required')
telefono: z.string().regex(/^\d{7,15}$/, 'Telefono must be numeric with 7-15 digits')
ciudad: z.string().min(1, 'Ciudad is required')
notas: z.string().optional()
```
