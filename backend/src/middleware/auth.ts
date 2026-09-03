import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AppError } from './errorHandler.js'
import { ERROR_MESSAGES } from '../common/errors/error-messages.js'

export interface AuthRequest extends Request {
  userId?: string
  userRole?: string
}

export const authMiddleware = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return next(new AppError(401, ERROR_MESSAGES.AUTH.NO_TOKEN_PROVIDED))
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string
      role: string
    }
    req.userId = decoded.userId
    req.userRole = decoded.role
    next()
  } catch {
    return next(new AppError(401, ERROR_MESSAGES.AUTH.INVALID_TOKEN))
  }
}
