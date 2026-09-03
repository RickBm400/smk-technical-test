import { Response, NextFunction } from 'express'
import { AppError } from './errorHandler.js'
import type { AuthRequest } from './auth.js'

export const requireAdmin = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  if (req.userRole !== 'ADMIN') {
    return next(new AppError(403, 'Admin access required'))
  }
  next()
}
