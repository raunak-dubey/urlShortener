
# URL Shortener — Frontend

This directory contains the Next.js frontend for the URL Shortener project. It provides a small UI to create shortened URLs and redirect to original links.

## Quick overview

- Framework: Next.js 15
- React: 19
- Styling: Tailwind CSS (configured in the project)
- HTTP client: axios

## Prerequisites

- Node.js (recommended 18.x or newer)
- npm (or yarn/pnpm) — this README uses npm examples

On Windows PowerShell, the commands below will work as-is.

## Install

Run from the `frontend` folder:

```powershell
cd frontend
npm install
```

## Available scripts

The project scripts are defined in `package.json`.

- npm run dev — Start the Next.js dev server on port 3001 (uses turbopack)
- npm run build — Build the app for production
- npm run start — Start the production server after building
- npm run lint — Run ESLint

Example (development):

```powershell
npm run dev
```

Open http://localhost:3001 in your browser.

## Environment / Backend

The frontend expects the backend API to be available. By default this project does not hard-code a backend URL. If you need to point the frontend to a running backend, add configuration in one of the following ways:

- Use environment variables in Next.js (for example, create a `.env.local` file in `frontend/` with keys like `NEXT_PUBLIC_API_URL=http://localhost:3000/api`)
- Or update the API helper in `src/utils` to use the proper base URL.

When using `.env.local`, restart the dev server after changing it.

## Project structure

Key folders and files:

- `src/app` — Next.js app folder (layouts and pages)
- `src/components` — React components (for example `UrlForm.jsx`)
- `src/api` — Client-side API utilities
- `public` — Static assets
- `package.json` — npm scripts and dependencies

## Linting & Formatting

ESLint is configured. Run:

```powershell
npm run lint
```

Add Prettier or other formatters if you'd like; none are required by default.

## Build & Run (Production)

1. Build the app:

```powershell
npm run build
```

2. Start the production server:

```powershell
npm run start
```

Consider using a process manager (pm2, systemd, Docker) for production deployments.

## Notes and tips

- The dev server is configured to use port 3001. If you prefer port 3000, change the `dev` script in `package.json`.
- Next.js turbopack flags are used by default; remove `--turbopack` from scripts if you encounter issues.
- If you add new environment variables, follow Next.js conventions and prefix public variables with `NEXT_PUBLIC_`.

## Troubleshooting

- If the page is blank, check the browser console and the terminal for Next.js errors.
- If API calls fail, ensure the backend is running and `NEXT_PUBLIC_API_URL` (or the helper) points to the correct host.

---

If you'd like, I can also:

- add a sample `.env.local` example file,
- update the frontend to use a configurable `NEXT_PUBLIC_API_URL`, or
- add a short setup script to start both backend and frontend concurrently.
