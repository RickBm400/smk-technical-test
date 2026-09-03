export interface User {
  id: string
  email: string
  role: 'ADMIN' | 'MEMBER'
  createdAt?: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  role?: 'ADMIN' | 'MEMBER'
}
