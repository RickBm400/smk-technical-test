import { Router, Response, NextFunction } from 'express'
import type { Request } from 'express'
import type { Router as ExpressRouter } from 'express'
import { parse } from 'csv-parse/sync'
import { prisma } from '../config/prisma.js'
import { authMiddleware, AuthRequest } from '../middleware/auth.js'
import { AppError, ValidationError } from '../middleware/errorHandler.js'
import { uploadMiddleware } from '../config/multer.js'
import { csvRowSchema, type CsvValidationError } from '../types/schemas.js'
import { requireAdmin } from '../middleware/role.js'
import { ERROR_MESSAGES } from '../common/errors/error-messages.js'

export const filesRouter: ExpressRouter = Router()

filesRouter.use(authMiddleware)

filesRouter.get('/', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const search = (req.query.search as string) || ''
    const skip = (page - 1) * limit

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { user: { email: { contains: search, mode: 'insensitive' as const } } }
          ]
        }
      : {}

    const [files, total] = await Promise.all([
      prisma.file.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { documents: true }
          },
          user: {
            select: {
              email: true
            }
          }
        }
      }),
      prisma.file.count({ where })
    ])

    const totalPages = Math.ceil(total / limit)

    res.json({
      data: files.map(file => ({
        id: file.id,
        name: file.name,
        size: file.size,
        uploadedBy: file.user.email,
        createdAt: file.createdAt,
        documentCount: file._count.documents
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    })
  } catch (error) {
    next(error)
  }
})

filesRouter.get('/:id', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const file = await prisma.file.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId
      },
      include: {
        documents: true
      }
    })

    if (!file) {
      throw new AppError(404, ERROR_MESSAGES.FILE.FILE_NOT_FOUND)
    }

    res.json(file)
  } catch (error) {
    next(error)
  }
})

filesRouter.post('/upload', uploadMiddleware.single('file'), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      throw new AppError(400, ERROR_MESSAGES.FILE.NO_FILE_UPLOADED)
    }

    const csvContent = req.file.buffer.toString('utf-8')

    let records: Record<string, string>[]
    try {
      records = parse(csvContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true
      })
    } catch {
      throw new AppError(400, ERROR_MESSAGES.FILE.INVALID_CSV_FORMAT)
    }

    if (records.length === 0) {
      throw new AppError(400, ERROR_MESSAGES.FILE.CSV_FILE_EMPTY)
    }

    const errors: CsvValidationError[] = []
    const validRows: Array<{ correo: string; nombre: string; telefono: string; ciudad: string; notas: string | null }> = []

    records.forEach((row, index) => {
      const rowNumber = index + 2

      const result = csvRowSchema.safeParse(row)

      if (!result.success) {
        result.error.errors.forEach((err) => {
          errors.push({
            row: rowNumber,
            field: err.path.join('.'),
            message: err.message
          })
        })
      } else {
        validRows.push({
          correo: result.data.correo,
          nombre: result.data.nombre,
          telefono: result.data.telefono,
          ciudad: result.data.ciudad,
          notas: result.data.notas ?? null
        })
      }
    })

    if (errors.length > 0) {
      throw new ValidationError(errors)
    }

    const file = await prisma.file.create({
      data: {
        name: req.file.originalname,
        path: `uploads/${req.file.originalname}`,
        size: req.file.size,
        userId: req.userId!
      },
      include: {
        user: {
          select: {
            email: true
          }
        }
      }
    })

    await prisma.document.createMany({
      data: validRows.map((row) => ({
        ...row,
        fileId: file.id
      }))
    })

    res.status(201).json({
      success: true,
      file: {
        id: file.id,
        name: file.name,
        size: file.size,
        uploadedBy: file.user.email,
        createdAt: file.createdAt
      },
      documentsCreated: validRows.length
    })
  } catch (error) {
    next(error)
  }
})

filesRouter.delete('/:id', requireAdmin, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const file = await prisma.file.findFirst({
      where: {
        id: req.params.id
      }
    })

    if (!file) {
      throw new AppError(404, ERROR_MESSAGES.FILE.FILE_NOT_FOUND)
    }

    await prisma.file.delete({ where: { id: req.params.id } })

    res.json({ message: ERROR_MESSAGES.FILE.FILE_DELETED })
  } catch (error) {
    next(error)
  }
})
