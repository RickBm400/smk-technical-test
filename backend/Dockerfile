# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Install wget for healthcheck, git for some packages
RUN apk add --no-cache wget git

# Enable corepack and pin pnpm to the version used to generate the lockfile
RUN corepack enable && corepack prepare pnpm@10.33.4 --activate

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma
COPY tsconfig.json ./

# Use --shamefully-hoist to make node_modules compatible with Alpine's Node.js
RUN pnpm install --frozen-lockfile --shamefully-hoist

RUN pnpm prisma generate

COPY src ./src
RUN pnpm build

# Stage 2: Production
FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

# Install wget for healthcheck
RUN apk add --no-cache wget

# Enable corepack for prisma migration command
RUN corepack enable && corepack prepare pnpm@10.33.4 --activate

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./

USER node

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/api/health || exit 1

CMD ["sh", "-c", "pnpm prisma migrate deploy && node dist/index.js"]
