import express from 'express'
import cors from 'cors'
import { env } from './config/env.js'
import { authRouter } from './routes/auth.js'
import { filesRouter } from './routes/files.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()

const allowedOrigins = new Set(env.FRONTEND_URL)

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)

    if (allowedOrigins.has(origin)) {
      return callback(null, true)
    }

    return callback(new Error(`Origin ${origin} not allowed by CORS`))
  },
  credentials: true
}))
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/files', filesRouter)

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok' })
})

app.use(errorHandler)

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`)
  console.log(`CORS allowed origins: ${env.FRONTEND_URL.join(', ')}`)
})
