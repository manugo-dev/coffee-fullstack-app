# MVST Coffee - Frontend

Next.js application following **Feature Sliced Design (FSD)** architecture.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **SCSS Modules** - Scoped styling
- **TanStack Query** - Server state management
- **Axios** - HTTP client
- **React Hook Form + Yup** - Form handling and validation
- **Motion** - Animations

## Project Structure (FSD)

```
src/
├── app/              # Next.js App Router (pages, layout, providers)
├── views/            # Page-level components
├── widgets/          # Complex UI blocks (Header, Footer, Hero)
├── features/         # User interactions (create-coffee)
├── entities/         # Business entities (coffee)
└── shared/           # Reusable code (ui, api, lib, styles)
```

## Setup

```bash
# Install dependencies
npm install

# Run development server (port 3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Scripts

| Command         | Description      |
| --------------- | ---------------- |
| `npm run dev`   | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production |
| `npm run lint`  | Run ESLint       |
