import { Router, Response, NextFunction } from 'express'
import type { Request } from 'express'
import type { Router as ExpressRouter } from 'express'
import { authMiddleware, AuthRequest } from '../middleware/auth.js'
import { AppError, BadRequestError } from '../middleware/errorHandler.js'
import { uploadMiddleware, handleMulterError } from '../config/multer.js'
import { requireAdmin } from '../middleware/role.js'
import { validateQuery } from '../middleware/validate.js'
import { FilesService } from '../services/files.service.js'
import { paginationQuerySchema } from '../types/schemas.js'

export const filesRouter: ExpressRouter = Router()

filesRouter.use(authMiddleware)

filesRouter.get('/', validateQuery(paginationQuerySchema), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      throw new BadRequestError('No user')
    }
    const { page, limit, search } = req.query as unknown as { page: number; limit: number; search: string }
    const result = await FilesService.listFiles(req.userId, page, limit, search)
    res.json(result)
  } catch (error) {
    next(error)
  }
})

filesRouter.get('/:id', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      throw new BadRequestError('No user')
    }
    const file = await FilesService.getFileById(req.params.id, req.userId)
    res.json(file)
  } catch (error) {
    next(error)
  }
})

filesRouter.post('/upload',
  (req: Request, res: Response, next: NextFunction) => uploadMiddleware.single('file')(req, res, (err: unknown) => {
    if (err) return handleMulterError(err, req as AuthRequest, res, next)
    next()
  }),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        throw new AppError(400, 'No se ha subido ningún archivo')
      }

      if (!req.userId) {
        throw new BadRequestError('No user')
      }

      const result = await FilesService.uploadFile(
        req.userId,
        req.file,
        req.file.originalname,
        req.file.size
      )

      res.status(201).json({
        success: true,
        file: result.file,
        documentsCreated: result.documentsCreated
      })
    } catch (error) {
      next(error)
    }
  }
)

filesRouter.delete('/:id', requireAdmin, async (_req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await FilesService.deleteFile(_req.params.id)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

filesRouter.get('/:id/download', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      throw new BadRequestError('No user')
    }
    const { filename, content } = await FilesService.getFileForDownload(req.params.id)
    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    res.send(content)
  } catch (error) {
    next(error)
  }
})
