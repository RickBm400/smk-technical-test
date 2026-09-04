import { defineStore } from 'pinia'
import api from '@/services/api'
import type { User, LoginCredentials, RegisterData, AuthResponse } from '@/shared/types/auth'

interface State {
  user: User | null
  token: string | null
  loading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    user: null,
    token: localStorage.getItem('token'),
    loading: false
  }),
  getters: {
    isAuthenticated(state): boolean {
      return !!state.token
    }
  },
  actions: {
    setAuth(data: AuthResponse) {
      this.token = data.token
      this.user = data.user
      localStorage.setItem('token', data.token)
    },
    clearAuth() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
    },
    async login(credentials: LoginCredentials) {
      this.loading = true
      try {
        const { data } = await api.post<AuthResponse>('/auth/login', credentials)
        this.setAuth(data)
        return { success: true }
      } catch (error: unknown) {
        const message = this.getErrorMessage(error, 'Inicio de sesión fallido')
        return { success: false, message }
      } finally {
        this.loading = false
      }
    },
    async register(registerData: RegisterData) {
      this.loading = true
      try {
        const { data } = await api.post<User>('/auth/register', registerData)
        return { success: true, user: data }
      } catch (error: unknown) {
        const message = this.getErrorMessage(error, 'Registro fallido')
        return { success: false, message }
      } finally {
        this.loading = false
      }
    },
    logout() {
      this.clearAuth()
    },
    async fetchUser() {
      if (!this.token) return
      try {
        const { data } = await api.get<User>('/auth/me')
        this.user = data
      } catch {
        this.clearAuth()
      }
    },
    getErrorMessage(error: unknown, fallback: string): string {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { error?: string } } }
        return axiosError.response?.data?.error || fallback
      }
      return fallback
    }
  }
})
