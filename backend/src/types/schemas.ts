import { z } from 'zod'
import { ERROR_MESSAGES } from '../common/errors/error-messages.js'

export const registerSchema = z.object({
  email: z.string().email(ERROR_MESSAGES.VALIDATION.EMAIL_INVALID),
  password: z.string().min(6, ERROR_MESSAGES.VALIDATION.PASSWORD_TOO_SHORT),
  role: z.enum(['ADMIN', 'MEMBER']).optional().default('MEMBER')
})

export const loginSchema = z.object({
  email: z.string().email(ERROR_MESSAGES.VALIDATION.EMAIL_INVALID),
  password: z.string().min(1, ERROR_MESSAGES.VALIDATION.PASSWORD_REQUIRED)
})

export const csvRowSchema = z.object({
  correo: z.string().email(ERROR_MESSAGES.CSV_VALIDATION.CORREO_INVALID),
  nombre: z.string().min(1, ERROR_MESSAGES.CSV_VALIDATION.NOMBRE_REQUIRED),
  telefono: z.string().regex(/^\d{7,15}$/, ERROR_MESSAGES.CSV_VALIDATION.TELEFONO_INVALID),
  ciudad: z.string().min(1, ERROR_MESSAGES.CSV_VALIDATION.CIUDAD_REQUIRED),
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
