# Coffee and Tee List - MVST challenge Backend

## Prerequisites

- Node.js (see `.nvmrc` for version)
- Docker (for the database)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start the database
npm run dev:db:up

# Generate Prisma client
npm run prisma:gen

# Run migrations
npm run prisma:migrate

# Seed the database
npm run prisma:seed
```

## Development

```bash
# Start the server (port 5000)
npm run start:dev
```

## API Endpoints

| Method | Endpoint   | Description                                      |
| ------ | ---------- | ------------------------------------------------ |
| GET    | `/coffees` | List coffees (supports filtering and pagination) |
| POST   | `/coffees` | Create a new coffee                              |

### Query Parameters (GET /coffees)

| Parameter | Type                  | Default | Description             |
| --------- | --------------------- | ------- | ----------------------- |
| `type`    | `arabic` \| `robusta` | -       | Filter by coffee type   |
| `page`    | number                | 1       | Page number             |
| `limit`   | number                | 12      | Items per page (max 50) |

### Request Body (POST /coffees)

```json
{
  "name": "string (required, unique, max 100)",
  "description": "string (required, max 500)",
  "type": "arabic | robusta (required)",
  "price": "number (required, positive, max 2 decimals)",
  "imageUrl": "string (required, valid URL)"
}
```

## Scripts

| Script                   | Description                |
| ------------------------ | -------------------------- |
| `npm run dev:db:up`      | Start PostgreSQL container |
| `npm run dev:db:down`    | Stop PostgreSQL container  |
| `npm run prisma:gen`     | Generate Prisma client     |
| `npm run prisma:migrate` | Run database migrations    |
| `npm run prisma:seed`    | Seed the database          |
| `npm run start:dev`      | Start in development mode  |
| `npm run build`          | Build for production       |
| `npm run lint`           | Run ESLint                 |
| `npm test`               | Run unit tests             |

## Database Configuration

The Docker container uses the following defaults (configurable via `.env`):

```
Host: localhost
Port: 5433
User: postgres
Password: 1234
Database: mvst-coffee-challenge-db
```
