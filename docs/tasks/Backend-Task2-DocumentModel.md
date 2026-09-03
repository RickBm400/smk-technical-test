# TODO: Backend Task-2: Document Model

**Estado:** Completado ✓

**Descripción:**
Crear modelo Document en Prisma para almacenar datos de filas CSV vinculados al modelo File.

**Archivos implementados:**

- `backend/prisma/schema.prisma` - Agregado modelo Document

**Modelo Document:**
```prisma
model Document {
  id        String  @id @default(uuid())
  fileId    String
  file      File    @relation(fields: [fileId], references: [id], onDelete: Cascade)
  correo    String
  nombre    String
  telefono  String
  ciudad    String
  notas     String?

  @@map("documents")
}
```

**Relaciones:**
- File tiene muchos Documents (relación 1:N)
- Eliminación en cascada: al eliminar un File se eliminan sus Documents
