import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'
import type { User, LoginCredentials, RegisterData, AuthResponse } from '@/shared/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const loading = ref(false)

  const isAuthenticated = computed(() => !!token.value)

  const setAuth = (data: AuthResponse) => {
    token.value = data.token
    user.value = data.user
    localStorage.setItem('token', data.token)
  }

  const clearAuth = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  const login = async (credentials: LoginCredentials) => {
    loading.value = true
    try {
      const { data } = await api.post<AuthResponse>('/auth/login', credentials)
      setAuth(data)
      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.error || 'Login failed'
      }
    } finally {
      loading.value = false
    }
  }

  const register = async (registerData: RegisterData) => {
    loading.value = true
    try {
      const { data } = await api.post<User>('/auth/register', registerData)
      return { success: true, user: data }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.error || 'Registration failed'
      }
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    clearAuth()
  }

  const fetchUser = async () => {
    if (!token.value) return
    try {
      const { data } = await api.get<User>('/auth/me')
      user.value = data
    } catch {
      clearAuth()
    }
  }

  return {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    fetchUser
  }
})
