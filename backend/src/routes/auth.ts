import { Router, Request, Response, NextFunction } from 'express'
import type { Router as ExpressRouter } from 'express'
import { authMiddleware, AuthRequest } from '../middleware/auth.js'
import { AppError, BadRequestError } from '../middleware/errorHandler.js'
import { validateBody } from '../middleware/validate.js'
import { AuthService } from '../services/auth.service.js'
import { registerSchema, loginSchema } from '../types/schemas.js'

export const authRouter: ExpressRouter = Router()

authRouter.post('/register', validateBody(registerSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await AuthService.register(req.body)
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
})

authRouter.post('/login', validateBody(loginSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.login(req.body)
    res.json(result)
  } catch (error) {
    next(error)
  }
})

authRouter.get('/me', authMiddleware, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      throw new BadRequestError('No user')
    }
    const user = await AuthService.getUserById(req.userId)
    if (!user) {
      throw new AppError(404, 'Usuario no encontrado')
    }
    res.json(user)
  } catch (error) {
    next(error)
  }
})
