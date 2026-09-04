import { Router, Request, Response, NextFunction } from 'express'
import type { Router as ExpressRouter } from 'express'
import { ZodError } from 'zod'
import { authMiddleware, AuthRequest } from '../middleware/auth.js'
import { AppError } from '../middleware/errorHandler.js'
import { AuthService } from '../services/auth.service.js'

export const authRouter: ExpressRouter = Router()

authRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await AuthService.register(req.body)
    res.status(201).json(user)
  } catch (error) {
    if (error instanceof ZodError) {
      return next(new AppError(400, error.errors[0].message))
    }
    next(error)
  }
})

authRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.login(req.body)
    res.json(result)
  } catch (error) {
    if (error instanceof ZodError) {
      return next(new AppError(400, error.errors[0].message))
    }
    next(error)
  }
})

authRouter.get('/me', authMiddleware, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return next(new AppError(401, 'No user'))
    }
    const user = await AuthService.getUserById(req.userId)
    if (!user) {
      return next(new AppError(404, 'Usuario no encontrado'))
    }
    res.json(user)
  } catch (error) {
    next(error)
  }
})
