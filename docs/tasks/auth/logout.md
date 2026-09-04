# TODO: Task-5: Logout

**Estado:** Completado ✓

**Descripción:**
- Implementar funcionalidad de logout desde el dashboard
- Redirigir al usuario a la página de login después del logout

**Archivos implementados:**

### Frontend
- `frontend/src/features/files/views/DashboardView.vue` - Botón de logout con redirect a /login
- `frontend/src/features/auth/stores/auth.ts` - Método `logout()` que limpia token y usuario

**Funcionalidad:**
1. Usuario hace click en botón "Logout" en el dashboard
2. Se llama `authStore.logout()` que:
   - Limpia el token del localStorage
   - Limpia el estado del usuario en Pinia
3. Se redirige automáticamente a `/login`

**Cambios específicos:**
- `DashboardView.vue`: Added `useRouter` para redirigir después de logout
- `authStore.logout()`: Ya estaba implementado, solo se usa en el componente
