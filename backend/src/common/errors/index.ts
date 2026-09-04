/**
 * Base application error class. All custom errors should extend this.
 */
export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super(message)
    this.name = this.constructor.name
  }
}

/**
 * Error thrown when client sends an invalid request (HTTP 400).
 */
export class BadRequestError extends AppError {
  constructor(message: string) {
    super(400, message)
  }
}

/**
 * Error thrown when authentication is required or invalid (HTTP 401).
 */
export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(401, message)
  }
}

/**
 * Error thrown when user lacks permission to perform an action (HTTP 403).
 */
export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(403, message)
  }
}

/**
 * Error thrown when a resource is not found (HTTP 404).
 */
export class NotFoundError extends AppError {
  constructor(message: string) {
    super(404, message)
  }
}

/**
 * Error thrown when multiple field-level validation errors occur (HTTP 400).
 * Preserves a list of per-row errors for client-side display.
 */
export class ValidationError extends AppError {
  constructor(public readonly errors: Array<{ row: number; field: string; message: string }>) {
    super(400, 'Validation failed')
  }
}

/**
 * Express error handling middleware. Converts thrown errors to JSON responses.
 */
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

  console.error(err)
  res.status(500).json({ error: 'Error interno del servidor' })
}
