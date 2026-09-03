import { z } from 'zod'

export const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['ADMIN', 'MEMBER']).optional().default('MEMBER')
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required')
})

export const csvRowSchema = z.object({
  correo: z.string().email('Correo must be a valid email'),
  nombre: z.string().min(1, 'Nombre is required'),
  telefono: z.string().regex(/^\d{7,15}$/, 'Telefono must be numeric with 7-15 digits'),
  ciudad: z.string().min(1, 'Ciudad is required'),
  notas: z.string().optional()
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type CsvRow = z.infer<typeof csvRowSchema>

export interface CsvValidationError {
  row: number
  field: string
  message: string
}
