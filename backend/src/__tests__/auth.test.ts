import { z } from 'zod'
import { registerSchema, loginSchema } from '../types/schemas.js'

describe('Auth Schemas', () => {
  describe('registerSchema', () => {
    it('validates correct registration data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
        role: 'MEMBER' as const
      }

      const result = registerSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('rejects invalid email format', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'password123'
      }

      const result = registerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('rejects short password', () => {
      const invalidData = {
        email: 'test@example.com',
        password: '12345'
      }

      const result = registerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('accepts valid roles', () => {
      const adminData = { email: 'test@example.com', password: 'password123', role: 'ADMIN' }
      const memberData = { email: 'test@example.com', password: 'password123', role: 'MEMBER' }

      expect(registerSchema.safeParse(adminData).success).toBe(true)
      expect(registerSchema.safeParse(memberData).success).toBe(true)
    })

    it('rejects invalid role', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'password123',
        role: 'SUPERUSER'
      }

      const result = registerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('defaults role to MEMBER', () => {
      const data = { email: 'test@example.com', password: 'password123' }
      const result = registerSchema.safeParse(data)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.role).toBe('MEMBER')
      }
    })
  })

  describe('loginSchema', () => {
    it('validates correct login data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123'
      }

      const result = loginSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('rejects invalid email format', () => {
      const invalidData = {
        email: 'not-an-email',
        password: 'password123'
      }

      const result = loginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('rejects empty password', () => {
      const invalidData = {
        email: 'test@example.com',
        password: ''
      }

      const result = loginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })
})
