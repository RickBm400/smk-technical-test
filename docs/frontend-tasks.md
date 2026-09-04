# Frontend Tasks List

Lista de tareas correspondientes al proyecto frontend.

## Auth

### Task-1: Login

La aplicación debe permitir a los usuarios acceder a los datos mediante un componente de inicio de sesión. Debe validar el formato del correo electrónico y una contraseña segura.

**Nota:** No es necesario implementar recuperación de contraseña.

### Task-2: SignUp

Formulario básico con email y contraseña con doble validación usando un campo de confirmación de contraseña. Debe incluir un campo para la selección de rol: `[ADMIN, MEMBER]`.

### Task-3: Login feedback

El frontend debe proporcionar feedback visual mediante componentes de PrimeVue como alertas.

### Task-4: Testing

Implementar tests unitarios sobre las funcionalidades de login y signup.

### Task-5: Logout

Los usuarios deben poder cerrar sesión desde el dashboard al hacer clic en el botón de logout.

## Dashboard

### Task-6: Paginated dashboard ✓

Agregar función de paginación para la lista de archivos CSV, dejando un mínimo de 10 registros. Agregar barra de búsqueda para filtrar registros usando debouncing.

**Status:** Completed ✓

**Detalles:** [Ver documentación](./tasks/frontend-features/pagination.md)

### Task-7: Dashboard table actions ✓

Implementar funciones basadas en roles mediante botones dentro de cada fila de la tabla del dashboard: uno para descargar el contenido del archivo y otro para eliminar el registro de la base de datos. La función de eliminar registro debe mostrarse solo para usuarios ADMIN. Para la funcionalidad del botón de descarga, obtener los datos del backend y crear/descargar un CSV en el cliente actual.

**Status:** Completed ✓

**Detalles:** [Ver documentación](./tasks/frontend-features/table-actions.md)
