# TODO: Task-3: Login Feedback

**Estado:** Completado ✓

**Descripción:**
- Feedback visual usando PrimeVue Alert components
- Errores: Alert con severity="error"
- Éxito: Alert con severity="success"

**Archivos implementados:**

### Frontend
- `frontend/src/features/auth/views/LoginView.vue`
  - Error alert para credenciales inválidas
  - Success alert al hacer login exitoso
- `frontend/src/features/auth/views/SignUpView.vue`
  - Error alert para validaciones y errores de registro
  - Success alert al registrarse exitosamente

**Componentes PrimeVue usados:**
- `<Alert severity="error">` - Mensajes de error
- `<Alert severity="success">` - Mensajes de éxito
