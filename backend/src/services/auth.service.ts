import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../config/prisma.js'
import { registerSchema, loginSchema } from '../types/schemas.js'
import { ERROR_MESSAGES } from '../common/errors/error-messages.js'
import { BadRequestError, UnauthorizedError } from '../common/errors/index.js'
import { env } from '../config/env.js'
import type { JwtPayload } from '../types/jwt.js'

export class AuthService {
  static async register(input: unknown) {
    const data = registerSchema.parse(input)

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    })

    if (existingUser) {
      throw new BadRequestError(ERROR_MESSAGES.AUTH.EMAIL_ALREADY_REGISTERED)
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: data.role
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true
      }
    })

    return user
  }

  static async login(input: unknown) {
    const data = loginSchema.parse(input)

    const user = await prisma.user.findUnique({
      where: { email: data.email }
    })

    if (!user) {
      throw new UnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS)
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password)

    if (!isValidPassword) {
      throw new UnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS)
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role } as JwtPayload,
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] }
    )

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    }
  }

  static async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true
      }
    })

    return user
  }
}
