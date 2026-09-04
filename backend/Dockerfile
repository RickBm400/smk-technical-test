# Stage 1: Build
FROM node:20-slim AS builder
WORKDIR /app

# Install OpenSSL (required by Prisma), wget for healthcheck, git for packages
RUN apt-get update -y && apt-get install -y openssl wget git && rm -rf /var/lib/apt/lists/*

# Enable corepack and pin pnpm to the version used to generate the lockfile
RUN corepack enable && corepack prepare pnpm@10.33.4 --activate

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma
COPY tsconfig.json ./

RUN pnpm install --frozen-lockfile

RUN pnpm prisma generate

COPY src ./src
RUN pnpm build

# Stage 2: Production
FROM node:20-slim AS production
WORKDIR /app

ENV NODE_ENV=production

# Install OpenSSL (required by Prisma engines) and wget for healthcheck
RUN apt-get update -y && apt-get install -y openssl wget && rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare pnpm@10.33.4 --activate

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./

USER node

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/api/health || exit 1

CMD ["sh", "-c", "./node_modules/.bin/prisma migrate deploy && node dist/index.js"]
