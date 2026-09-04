import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { UnauthorizedError } from '../common/errors/index.js'
import { env } from '../config/env.js'
import { ERROR_MESSAGES } from '../common/errors/error-messages.js'
import type { JwtPayload } from '../types/jwt.js'
import type { Role } from '../types/role.js'
import type { Request } from 'express'

export interface AuthRequest extends Request {
  userId?: string
  userRole?: Role
}

export const authMiddleware = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return next(new UnauthorizedError(ERROR_MESSAGES.AUTH.NO_TOKEN_PROVIDED))
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload
    req.userId = decoded.userId
    req.userRole = decoded.role as Role
    next()
  } catch {
    return next(new UnauthorizedError(ERROR_MESSAGES.AUTH.INVALID_TOKEN))
  }
}
