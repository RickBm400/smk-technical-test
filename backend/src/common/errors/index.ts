export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super(message)
    this.name = this.constructor.name
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(400, message)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(401, message)
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(403, message)
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(404, message)
  }
}

export class ValidationError extends AppError {
  constructor(public readonly errors: Array<{ row: number; field: string; message: string }>) {
    super(400, 'Validation failed')
  }
}

export const errorHandler = (
  err: Error,
  _req: import('express').Request,
  res: import('express').Response,
  _next: import('express').NextFunction
) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      errors: err.errors
    })
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message })
  }

  if (err instanceof Error && 'code' in err && err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      errors: [{ row: 0, field: 'file', message: 'El archivo excede el límite de 10MB' }]
    })
  }

  console.error(err)
  res.status(500).json({ error: 'Error interno del servidor' })
}
