import { Request, Response, NextFunction } from 'express'
import { AnyZodObject, ZodError } from 'zod'
import { AppError } from '../common/errors/index.js'

export const validateBody = (schema: AnyZodObject) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        return next(new AppError(400, error.errors[0].message))
      }
      next(error)
    }
  }
}

export const validateQuery = (schema: AnyZodObject) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse(req.query)
      Object.assign(req.query, validated)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        return next(new AppError(400, error.errors[0].message))
      }
      next(error)
    }
  }
}
