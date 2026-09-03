import multer from 'multer'

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
      cb(new Error('Only CSV files are allowed'))
    }
  }
})
