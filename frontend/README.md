
# URL Shortener — Frontend

This frontend is a Next.js application that provides a user interface to create and use shortened URLs.

Technology

- Next.js
- React
- Tailwind CSS
- axios for HTTP requests

Prerequisites

- Node.js
- npm (or yarn/pnpm)

Install and run (from `frontend/`)

	npm install
	npm run dev

Scripts (in `package.json`)

- dev — start the development server
- build — build the app for production
- start — start the production server
- lint — run ESLint

Environment

Use `frontend/.env.local` to set public environment variables (for example `NEXT_PUBLIC_API_URL` to point to the backend API).

Project structure (key folders)

- `src/app` — application entry (pages and layout)
- `src/components` — React components
- `src/api` — client-side API helpers
- `src/utils` — shared utilities (axios instance)
- `public` — static assets

API integration

The frontend sends requests to the backend API (example endpoint used: `/api/create`) to create short URLs and uses returned tokens or URLs to present shortened links to the user.

