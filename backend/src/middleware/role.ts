import { Response, NextFunction } from 'express'
import { ForbiddenError } from '../common/errors/index.js'
import { ERROR_MESSAGES } from '../common/errors/error-messages.js'
import type { AuthRequest } from './auth.js'

export const requireAdmin = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  if (req.userRole !== 'ADMIN') {
    return next(new ForbiddenError(ERROR_MESSAGES.AUTH.ADMIN_ACCESS_REQUIRED))
  }
  next()
}
