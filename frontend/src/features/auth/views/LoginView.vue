<script lang="ts">
import { defineComponent } from 'vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { useAuthStore } from '@/features/auth/stores/auth'
import { isValidEmail } from '@/shared/utils/validation'

export default defineComponent({
  name: 'LoginView',
  components: {
    InputText,
    Password,
    Button,
    Message
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      successMessage: ''
    }
  },
  computed: {
    authStore() {
      return useAuthStore()
    },
    isEmailValid(): boolean {
      return isValidEmail(this.email)
    }
  },
  watch: {
    email() {
      if (this.errorMessage) this.errorMessage = ''
    },
    password() {
      if (this.errorMessage) this.errorMessage = ''
    }
  },
  methods: {
    handleLogin() {
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

      this.authStore.login({
        email: this.email,
        password: this.password
      }).then((result) => {
        if (result.success) {
          this.successMessage = '¡Inicio de sesión exitoso!'
          setTimeout(() => {
            this.$router.push({ name: 'dashboard' })
          }, 500)
        } else {
          this.errorMessage = result.message || 'Credenciales inválidas. Verifique su email y contraseña.'
        }
      }).catch(() => {
        this.errorMessage = 'Error de conexión. Intente nuevamente.'
      })
    }
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 class="text-2xl font-bold mb-6 text-center">CSV Manager - Iniciar Sesión</h1>

      <Message v-if="errorMessage" severity="error" class="mb-4" :closable="true" @close="errorMessage = ''">
        {{ errorMessage }}
      </Message>

      <Message v-if="successMessage" severity="success" class="mb-4">
        {{ successMessage }}
      </Message>

      <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
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
            :feedback="false"
            toggleMask
            placeholder="Ingrese su contraseña"
            inputClass="w-full"
            class="w-full"
            :inputProps="{ autocomplete: 'current-password' }"
          />
        </div>

        <Button
          type="submit"
          label="Iniciar Sesión"
          :loading="authStore.loading"
          class="w-full"
        />
      </form>

      <p class="mt-4 text-center text-sm">
        ¿No tiene una cuenta?
        <router-link to="/signup" class="text-primary hover:underline">
          Regístrese
        </router-link>
      </p>
    </div>
  </div>
</template>
