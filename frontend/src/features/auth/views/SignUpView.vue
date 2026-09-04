<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
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
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const role = ref<'ADMIN' | 'MEMBER'>('MEMBER')
    const errorMessage = ref('')
    const successMessage = ref('')

    const roles = [
      { label: 'Miembro', value: 'MEMBER' },
      { label: 'Administrador', value: 'ADMIN' }
    ]

    const validateEmail = (value: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(value)
    }

    const handleSignUp = async () => {
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

      if (password.value.length < 6) {
        errorMessage.value = 'La contraseña debe tener al menos 6 caracteres'
        return
      }

      if (!confirmPassword.value) {
        errorMessage.value = 'Por favor confirme su contraseña'
        return
      }

      if (password.value !== confirmPassword.value) {
        errorMessage.value = 'Las contraseñas no coinciden'
        return
      }

      const result = await authStore.register({
        email: email.value,
        password: password.value,
        role: role.value
      })

      if (result.success) {
        successMessage.value = '¡Registro exitoso! Redirigiendo al inicio de sesión...'
        setTimeout(() => {
          router.push('/login')
        }, 1500)
      } else {
        errorMessage.value = result.message || 'Registro fallido'
      }
    }

    return {
      email,
      password,
      confirmPassword,
      role,
      errorMessage,
      successMessage,
      roles,
      handleSignUp,
      authStore
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
