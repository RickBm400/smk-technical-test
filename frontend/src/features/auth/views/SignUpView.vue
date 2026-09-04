<script lang="ts">
import { defineComponent } from 'vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Select from 'primevue/select'
import Message from 'primevue/message'
import { useAuthStore } from '@/features/auth/stores/auth'

export default defineComponent({
  name: 'SignUpView',
  components: {
    InputText,
    Password,
    Button,
    Select,
    Message
  },
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      role: 'MEMBER' as 'ADMIN' | 'MEMBER',
      errorMessage: '',
      successMessage: '',
      roles: [
        { label: 'Miembro', value: 'MEMBER' },
        { label: 'Administrador', value: 'ADMIN' }
      ]
    }
  },
  computed: {
    authStore() {
      return useAuthStore()
    },
    isEmailValid(): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(this.email)
    }
  },
  methods: {
    handleSignUp() {
      this.errorMessage = ''
      this.successMessage = ''

      if (!this.email) {
        this.errorMessage = 'El email es requerido'
        return
      }

      if (!this.isEmailValid) {
        this.errorMessage = 'Formato de email inválido'
        return
      }

      if (!this.password) {
        this.errorMessage = 'La contraseña es requerida'
        return
      }

      if (this.password.length < 6) {
        this.errorMessage = 'La contraseña debe tener al menos 6 caracteres'
        return
      }

      if (!this.confirmPassword) {
        this.errorMessage = 'Por favor confirme su contraseña'
        return
      }

      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden'
        return
      }

      this.authStore.register({
        email: this.email,
        password: this.password,
        role: this.role
      }).then((result) => {
        if (result.success) {
          this.successMessage = '¡Registro exitoso! Redirigiendo al inicio de sesión...'
          setTimeout(() => {
            this.$router.push({ name: 'login' })
          }, 1500)
        } else {
          this.errorMessage = result.message || 'Registro fallido'
        }
      })
    }
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 class="text-2xl font-bold mb-6 text-center">CSV Manager - Registro</h1>

      <Message v-if="errorMessage" severity="error" class="mb-4">
        {{ errorMessage }}
      </Message>

      <Message v-if="successMessage" severity="success" class="mb-4">
        {{ successMessage }}
      </Message>

      <form @submit.prevent="handleSignUp" class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label for="email" class="text-sm font-medium">Email</label>
          <InputText
            id="email"
            v-model="email"
            type="email"
            placeholder="Ingrese su email"
            class="w-full"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="password" class="text-sm font-medium">Contraseña</label>
          <Password
            id="password"
            v-model="password"
            toggleMask
            placeholder="Ingrese su contraseña"
            inputClass="w-full"
            class="w-full"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="confirmPassword" class="text-sm font-medium">Confirmar Contraseña</label>
          <Password
            id="confirmPassword"
            v-model="confirmPassword"
            :feedback="false"
            toggleMask
            placeholder="Confirme su contraseña"
            inputClass="w-full"
            class="w-full"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="role" class="text-sm font-medium">Rol</label>
          <Select
            id="role"
            v-model="role"
            :options="roles"
            optionLabel="label"
            optionValue="value"
            class="w-full"
          />
        </div>

        <Button
          type="submit"
          label="Registrarse"
          :loading="authStore.loading"
          class="w-full"
        />
      </form>

      <p class="mt-4 text-center text-sm">
        ¿Ya tiene una cuenta?
        <router-link to="/login" class="text-primary hover:underline">
          Iniciar Sesión
        </router-link>
      </p>
    </div>
  </div>
</template>
