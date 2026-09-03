import { Router, Response, NextFunction } from 'express'
import type { Router as ExpressRouter } from 'express'
import { prisma } from '../config/prisma.js'
import { authMiddleware, AuthRequest } from '../middleware/auth.js'
import { AppError } from '../middleware/errorHandler.js'

export const filesRouter: ExpressRouter = Router()

filesRouter.use(authMiddleware)

filesRouter.get('/', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const files = await prisma.file.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' }
    })
    res.json(files)
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
      }
    })

    if (!file) {
      throw new AppError(404, 'File not found')
    }

    res.json(file)
  } catch (error) {
    next(error)
  }
})

filesRouter.post('/', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, path, size } = req.body

    if (!name || !path || size === undefined) {
      throw new AppError(400, 'Name, path and size are required')
    }

    const file = await prisma.file.create({
      data: {
        name,
        path,
        size,
        userId: req.userId!
      }
    })

    res.status(201).json(file)
  } catch (error) {
    next(error)
  }
})

filesRouter.delete('/:id', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const file = await prisma.file.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    })

    if (!file) {
      throw new AppError(404, 'File not found')
    }

    await prisma.file.delete({ where: { id: req.params.id } })

    res.json({ message: 'File deleted' })
  } catch (error) {
    next(error)
  }
})
