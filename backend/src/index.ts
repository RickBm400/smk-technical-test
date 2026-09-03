import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { authRouter } from './routes/auth.js'
import { filesRouter } from './routes/files.js'
import { errorHandler } from './middleware/errorHandler.js'

config()

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/files', filesRouter)

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok' })
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
