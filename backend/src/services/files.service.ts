import { parse } from 'csv-parse/sync'
import { prisma } from '../config/prisma.js'
import { csvRowSchema, type CsvValidationError } from '../types/schemas.js'
import { ERROR_MESSAGES } from '../common/errors/error-messages.js'
import { BadRequestError, NotFoundError, ValidationError } from '../common/errors/index.js'
import { buildCsv } from '../utils/csvBuilder.js'

export interface FileListResult {
  data: Array<{
    id: string
    name: string
    size: number
    uploadedBy: string
    createdAt: Date
    documentCount: number
  }>
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export class FilesService {
  static async listFiles(userId: string, page: number, limit: number, search: string): Promise<FileListResult> {
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
          _count: { select: { documents: true } },
          user: { select: { email: true } }
        }
      }),
      prisma.file.count({ where })
    ])

    const totalPages = Math.ceil(total / limit)

    return {
      data: files.map(file => ({
        id: file.id,
        name: file.name,
        size: file.size,
        uploadedBy: file.user.email,
        createdAt: file.createdAt,
        documentCount: file._count.documents
      })),
      pagination: { page, limit, total, totalPages }
    }
  }

  static async getFileById(fileId: string, userId: string) {
    const file = await prisma.file.findFirst({
      where: { id: fileId, userId }
    })

    if (!file) {
      throw new NotFoundError(ERROR_MESSAGES.FILE.FILE_NOT_FOUND)
    }

    return file
  }

  static async uploadFile(
    userId: string,
    file: Express.Multer.File,
    originalName: string,
    size: number
  ) {
    const csvContent = file.buffer.toString('utf-8')

    let records: Record<string, string>[]
    try {
      records = parse(csvContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        relax_column_count: true
      })
    } catch {
      throw new BadRequestError(ERROR_MESSAGES.FILE.INVALID_CSV_FORMAT)
    }

    if (records.length === 0) {
      throw new BadRequestError(ERROR_MESSAGES.FILE.CSV_FILE_EMPTY)
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

    const createdFile = await prisma.$transaction(async (tx) => {
      const newFile = await tx.file.create({
        data: {
          name: originalName,
          size,
          userId
        },
        include: {
          user: { select: { email: true } }
        }
      })

      await tx.document.createMany({
        data: validRows.map((row) => ({
          ...row,
          fileId: newFile.id
        }))
      })

      return newFile
    })

    return {
      file: {
        id: createdFile.id,
        name: createdFile.name,
        size: createdFile.size,
        uploadedBy: createdFile.user.email,
        createdAt: createdFile.createdAt
      },
      documentsCreated: validRows.length
    }
  }

  static async deleteFile(fileId: string) {
    const file = await prisma.file.findFirst({ where: { id: fileId } })

    if (!file) {
      throw new NotFoundError(ERROR_MESSAGES.FILE.FILE_NOT_FOUND)
    }

    await prisma.file.delete({ where: { id: fileId } })
  }

  static async getFileForDownload(fileId: string, userId: string) {
    const file = await prisma.file.findFirst({
      where: { id: fileId, userId },
      include: { documents: true }
    })

    if (!file) {
      throw new NotFoundError(ERROR_MESSAGES.FILE.FILE_NOT_FOUND)
    }

    if (file.documents.length === 0) {
      throw new NotFoundError(ERROR_MESSAGES.FILE.NO_DOCUMENTS_FOUND)
    }

    const csvContent = buildCsv(file.documents.map(doc => ({
      correo: doc.correo,
      nombre: doc.nombre,
      telefono: doc.telefono,
      ciudad: doc.ciudad,
      notas: doc.notas
    })))

    return { filename: file.name, content: csvContent }
  }
}
