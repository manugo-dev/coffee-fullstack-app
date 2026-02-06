FROM node:24-alpine AS deps

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

# Install dependencies with cache mount
RUN --mount=type=cache,target=/root/.npm \
    npm ci

FROM node:24-alpine AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package*.json ./
COPY --from=deps /app/prisma ./prisma
COPY --from=deps /app/prisma.config.ts ./

# Copy source code
COPY . .

# Set placeholder DATABASE_URL for Prisma generation
ENV DATABASE_URL=postgresql://placeholder:placeholder@localhost:5432/placeholder

# Generate Prisma Client and build
RUN npm run prisma:gen
RUN npm run build

FROM node:24-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

# Install production dependencies only
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Copy build output and generated Prisma client (schema has output = "./generated")
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma/generated ./prisma/generated
# Copy Prisma CLI and runtime for migrations at startup
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

EXPOSE 5000

ENV NODE_ENV=production

CMD ["node", "dist/src/main"]
