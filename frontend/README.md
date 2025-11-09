# URL Shortener — Frontend

This frontend is a Next.js application that provides a user interface to create and use shortened URLs.

Prerequisites

- Node.js
- npm (or yarn/pnpm)

## Install and run

From the `frontend/` directory:

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env.local` file in the `frontend` directory to set public environment variables.

For example, to point to the backend API:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Available Scripts
- `dev`: Starts the development server.
- `build`: Builds the application for production.
- `start`: Starts a production server.
- `lint`: Runs ESLint for code analysis.