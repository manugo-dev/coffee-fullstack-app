FROM node:24 AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

RUN npm ci

COPY . .

ENV DATABASE_URL=postgresql://placeholder:placeholder@localhost:5432/placeholder

RUN npm run prisma:gen
RUN npm run build

FROM node:24 AS production

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

RUN npm ci --only=production && \
    npm install -g prisma@latest

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma/generated ./prisma/generated
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

EXPOSE 5000

ENV NODE_ENV=production

CMD ["npm", "run", "start:prod"]
