import express from 'express'
import cors from 'cors'
import { env } from './config/env.js'
import { authRouter } from './routes/auth.js'
import { filesRouter } from './routes/files.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()

app.use(cors({
  origin: env.FRONTEND_URL,
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
})
