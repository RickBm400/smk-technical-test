import { Request, Response, NextFunction } from 'express'
import type { MulterError } from 'multer'
import { ERROR_MESSAGES } from '../common/errors/error-messages.js'

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string
  ) {
    super(message)
  }
}

export class ValidationError extends AppError {
  constructor(public errors: Array<{ row: number; field: string; message: string }>) {
    super(400, 'Validation failed')
  }
}

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      errors: err.errors
    })
  }

  if (err instanceof AppError) {
    if (
      err.message === ERROR_MESSAGES.FILE.NO_FILE_UPLOADED ||
      err.message === ERROR_MESSAGES.FILE.INVALID_CSV_FORMAT ||
      err.message === ERROR_MESSAGES.FILE.CSV_FILE_EMPTY
    ) {
      return res.status(400).json({
        success: false,
        errors: [{ row: 0, field: 'file', message: err.message }]
      })
    }
    return res.status(err.statusCode).json({ error: err.message })
  }

  if (err instanceof Error && 'code' in err) {
    const multerError = err as MulterError
    if (multerError.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        errors: [{ row: 0, field: 'file', message: ERROR_MESSAGES.FILE.FILE_TOO_LARGE }]
      })
    }
    if (multerError.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        errors: [{ row: 0, field: 'file', message: ERROR_MESSAGES.FILE.UNEXPECTED_FILE_FIELD }]
      })
    }
  }

  console.error(err)
  res.status(500).json({ error: ERROR_MESSAGES.INTERNAL.SERVER_ERROR })
}
