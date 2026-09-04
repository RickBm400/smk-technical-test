import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

const shutdown = async (signal: string) => {
  console.log(`Received ${signal}, closing Prisma connection...`)
  await prisma.$disconnect()
  process.exit(0)
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
