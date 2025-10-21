# URL Shortener — Full Project

This repository contains a URL shortener application with a backend API and a frontend UI.

Structure

- `backend/` — Express.js API that creates and resolves short URLs using MongoDB
- `frontend/` — Next.js application that provides the user interface

Prerequisites

- Node.js
- npm (or yarn/pnpm)
- MongoDB (for the backend)

Backend (location: `backend/`)

Install and run:

    cd backend
    npm install
    npm run dev

Environment (create `backend/.env`):

    PORT=
    APP_URL=http://localhost:
    MONGO_URI=mongodb://localhost:27017/

API endpoints (examples):

- POST /api/create — create a short URL; JSON body: { "originalUrl": "https://..." }
- GET /:id — redirect to stored original URL and increment click count

Frontend (location: `frontend/`)

Install and run:

    cd frontend
    npm install
    npm run dev

Environment (optional):

Create `frontend/.env.local` to set public variables such as `NEXT_PUBLIC_API_URL`.

Default ports

- Backend: `PORT` from `backend/.env` (example 3000)
- Frontend dev: port configured in `frontend/package.json` (example 3001)