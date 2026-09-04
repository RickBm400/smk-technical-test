import multer, { MulterError } from 'multer'
import type { Response, NextFunction } from 'express'

const FILE_SIZE_LIMIT = 10 * 1024 * 1024

const storage = multer.memoryStorage()

export const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: FILE_SIZE_LIMIT
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.mimetype === 'application/vnd.ms-excel') {
      cb(null, true)
    } else {
      cb(new Error('Solo se permiten archivos CSV'))
    }
  }
})

export const handleMulterError = (
  err: unknown,
  _req: unknown,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        errors: [{ row: 0, field: 'file', message: 'El archivo excede el límite de 10MB' }]
      })
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        errors: [{ row: 0, field: 'file', message: 'Campo de archivo inesperado' }]
      })
    }
  }
  next(err)
}
