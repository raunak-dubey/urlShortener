
# URL Shortener — Full Project (Backend + Frontend)

This repository contains a simple URL shortener service split into two folders:

- `backend/` — Express + MongoDB API that creates and redirects short URLs
- `frontend/` — Next.js frontend (React) that consumes the API

This README gives a quick start to run each part locally and tips for development.

## Prerequisites

- Node.js (18+ recommended)
- npm (or yarn/pnpm)
- MongoDB (local or remote)

All terminal commands below use Windows PowerShell examples. Adjust for other shells as needed.

## Backend

Location: `backend/`

1. Install dependencies

    cd backend
    npm install

2. Create a `.env` file in `backend/` with at least:

    PORT=
    APP_URL=http://localhost:
    MONGO_URI=mongodb://localhost:27017/

3. Start in development (uses nodemon):

    npm run dev

API highlights

- POST /api/create — create a short URL (JSON body: `{ "originalUrl": "https://..." }`)
- GET /:id — redirect to original URL and increment click count

See `backend/README.md` for more detailed API examples and troubleshooting.

## Frontend

Location: `frontend/`

1. Install dependencies

    cd frontend
    npm install

2. (Optional) Create `.env.local` in `frontend/` if you want to set an API base URL, e.g.:

    NEXT_PUBLIC_API_URL=http://localhost:3000/api

3. Start the dev server (configured to use port 3001):

    npm run dev

Open http://localhost:3001 in your browser.

## Running both services locally

You can run the backend and frontend in separate terminals:

Terminal 1 (backend):

    cd backend; npm run dev

Terminal 2 (frontend):

    cd frontend; npm run dev

If you'd like a single-command workflow, I can add a root `package.json` that uses `concurrently` to start both.

## Ports and Defaults

- Backend: default example uses port 3000 (configurable via `backend/.env`)
- Frontend dev: configured to port 3001 in `frontend/package.json` (`next dev -p 3001`)

## Testing and Linting

- Backend: no automated tests included by default; see suggestions in `backend/README.md`.
- Frontend: run `npm run lint` in `frontend/` to run ESLint.

## Next improvements (suggestions)

- Add a root-level `package.json` with a `dev` script to run both services concurrently.
- Add a sample `.env.local.example` and `.env.example` files for frontend/backend respectively.
- Add automated tests for backend endpoints (using `supertest`) and simple component tests for the frontend.

---

If you want, I can implement any of the improvements above (create example env files, add a root `package.json` to start both, or wire a simple Docker Compose file). Tell me which and I'll add it.
