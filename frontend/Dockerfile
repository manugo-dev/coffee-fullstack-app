FROM node:24-alpine AS deps

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with cache mount
RUN --mount=type=cache,target=/root/.npm \
    npm ci

FROM node:24-alpine AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package*.json ./

# Copy source code
COPY . .

# Build with deterministic placeholders — replaced at container startup by entrypoint.sh
# For each NEXT_PUBLIC_* var, use __VAR_NAME__ as the placeholder value.
# See entrypoint.sh for the full mapping of external names → Next.js names.
ENV NEXT_PUBLIC_API_URL=__NEXT_PUBLIC_API_URL__

# Build Next.js app
RUN npm run build

FROM node:24-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Next.js standalone output is self-contained (includes server + minimal node_modules)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Entrypoint replaces NEXT_PUBLIC_* placeholders at runtime
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

ENTRYPOINT ["./entrypoint.sh"]
CMD ["node", "server.js"]
