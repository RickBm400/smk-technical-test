import { Response, NextFunction } from 'express'
import { AppError } from './errorHandler.js'
import type { AuthRequest } from './auth.js'
import { ERROR_MESSAGES } from '../common/errors/error-messages.js'

export const requireAdmin = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  if (req.userRole !== 'ADMIN') {
    return next(new AppError(403, ERROR_MESSAGES.AUTH.ADMIN_ACCESS_REQUIRED))
  }
  next()
}
