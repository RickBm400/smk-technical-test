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
      { label: 'Member', value: 'MEMBER' },
      { label: 'Admin', value: 'ADMIN' }
    ]

    const validateEmail = (value: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(value)
    }

    const handleSignUp = async () => {
      errorMessage.value = ''
      successMessage.value = ''

      if (!email.value) {
        errorMessage.value = 'Email is required'
        return
      }

      if (!validateEmail(email.value)) {
        errorMessage.value = 'Invalid email format'
        return
      }

      if (!password.value) {
        errorMessage.value = 'Password is required'
        return
      }

      if (password.value.length < 6) {
        errorMessage.value = 'Password must be at least 6 characters'
        return
      }

      if (!confirmPassword.value) {
        errorMessage.value = 'Please confirm your password'
        return
      }

      if (password.value !== confirmPassword.value) {
        errorMessage.value = 'Passwords do not match'
        return
      }

      const result = await authStore.register({
        email: email.value,
        password: password.value,
        role: role.value
      })

      if (result.success) {
        successMessage.value = 'Registration successful! Redirecting to login...'
        setTimeout(() => {
          router.push('/login')
        }, 1500)
      } else {
        errorMessage.value = result.message || 'Registration failed'
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
      <h1 class="text-2xl font-bold mb-6 text-center">CSV Manager - Sign Up</h1>

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
            placeholder="Enter your email"
            class="w-full"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="password" class="text-sm font-medium">Password</label>
          <Password
            id="password"
            v-model="password"
            toggleMask
            placeholder="Enter your password"
            inputClass="w-full"
            class="w-full"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="confirmPassword" class="text-sm font-medium">Confirm Password</label>
          <Password
            id="confirmPassword"
            v-model="confirmPassword"
            :feedback="false"
            toggleMask
            placeholder="Confirm your password"
            inputClass="w-full"
            class="w-full"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="role" class="text-sm font-medium">Role</label>
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
          label="Sign Up"
          :loading="authStore.loading"
          class="w-full"
        />
      </form>

      <p class="mt-4 text-center text-sm">
        Already have an account?
        <router-link to="/login" class="text-primary hover:underline">
          Login
        </router-link>
      </p>
    </div>
  </div>
</template>
