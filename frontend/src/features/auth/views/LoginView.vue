<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { useAuthStore } from '@/features/auth/stores/auth'

export default defineComponent({
  name: 'LoginView',
  components: {
    InputText,
    Password,
    Button,
    Message
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    const email = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const successMessage = ref('')

    const validateEmail = (value: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(value)
    }

    const handleLogin = async () => {
      errorMessage.value = ''
      successMessage.value = ''

      if (!email.value) {
        errorMessage.value = 'El email es requerido'
        return
      }

      if (!validateEmail(email.value)) {
        errorMessage.value = 'Formato de email inválido'
        return
      }

      if (!password.value) {
        errorMessage.value = 'La contraseña es requerida'
        return
      }

      const result = await authStore.login({
        email: email.value,
        password: password.value
      })

      if (result.success) {
        successMessage.value = '¡Inicio de sesión exitoso!'
        setTimeout(() => {
          router.push('/dashboard')
        }, 500)
      } else {
        errorMessage.value = result.message || 'Inicio de sesión fallido'
      }
    }

    return {
      email,
      password,
      errorMessage,
      successMessage,
      handleLogin,
      authStore
    }
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 class="text-2xl font-bold mb-6 text-center">CSV Manager - Iniciar Sesión</h1>

      <Message v-if="errorMessage" severity="error" class="mb-4">
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
