# TODO: Frontend Task-7: Dashboard Table Actions

**Estado:** Completado ✓

**Descripción:**
Implementar botones de acción en cada fila de la tabla del dashboard:
- Botón de descarga para todos los usuarios
- Botón de eliminación solo para usuarios ADMIN

**Archivos modificados:**

- `frontend/src/features/files/stores/files.ts` - Nueva función `downloadFile`
- `frontend/src/features/files/views/DashboardView.vue` - Columna de acciones agregada
- `frontend/src/main.ts` - Tooltip directive registrado

**Funcionalidad:**

### Columna Acciones
- Botón "Descargar" (icono `pi-download`): Para todos los usuarios autenticados
- Botón "Eliminar" (icono `pi-trash`): Solo visible para ADMIN
- Tooltips informativos en ambos botones

### Descarga
- Llama al endpoint `GET /api/files/:id/download`
- Recibe el CSV como blob
- Crea enlace temporal para descarga
- Limpia el objeto URL después de la descarga

### Eliminación
- Solo usuarios con rol ADMIN ven el botón
- Llama al endpoint `DELETE /api/files/:id` (ya con RBAC)
- Refresca la lista después de eliminar

**Dependencias:**
- PrimeVue Tooltip directive
- PrimeIcons (pi-download, pi-trash)
