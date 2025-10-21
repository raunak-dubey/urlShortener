# URL Shortener — Backend

This document describes how to run and use the backend API for the URL shortener project.

## Features
- Create short URLs for long original URLs
- Redirect short URLs to original URLs
- Click counting for redirects (incremented on each redirect)
- Reuses an existing short URL when the same original URL is submitted

## Requirements
- Node.js 18+ (project uses ES modules)
- npm
- MongoDB (local or remote)

## Environment variables
Create a `.env` file in the `backend/` folder. The important variables:

```
PORT=
APP_URL=http://localhost:
MONGO_URI=mongodb://localhost:27017/
```

- `APP_URL` is used to construct the full short URL returned by the API (e.g. `http://localhost:3000/abc123`).
- `PORT` is the port the backend listens on.
- `MONGO_URI` is the MongoDB connection string.

## Install & start
From the `backend/` folder:

```powershell
npm install
npm run dev
```

`npm run dev` uses `nodemon app.js` (see `package.json`).

## API
### Create short URL
- Endpoint: `POST /api/create`
- Content-Type: `application/json`
- Body (JSON):
  - preferred: `{ "originalUrl": "https://example.com/long/path" }`
  - alias: `{ "url": "https://example.com/long/path" }`

Example (PowerShell / curl):
```powershell
curl -Method POST -Uri http://localhost:3000/api/create -ContentType 'application/json' -Body '{"originalUrl":"https://example.com/long/path"}'
```
Successful response (201):

```json
{ "shortUrl": "http://localhost:3000/abc1234" }
```
Notes:
- The backend will return the existing short URL if the original URL was already shortened (no duplicate entries created).
- If the backend is configured with `APP_URL`, that base is used to construct the returned URL.

### Redirect short URL
- Endpoint: `GET /:id`
- Example: `GET http://localhost:3000/abc1234` will redirect to the original URL.
- Each redirect increments the `clicks` counter for the entry.

## Behavior for duplicates
- The current implementation checks for an existing document with the same `originalUrl` and returns it instead of creating a duplicate.
- If you instead want the database to enforce uniqueness and return a 409 Conflict on duplicate inserts, update the schema to add a unique index on `originalUrl` and handle `11000` duplicate-key errors.

## Troubleshooting
- If you see `originalUrl: Path `originalUrl` is required.` that means the request body didn't include `originalUrl` or `url`. Ensure your client sends JSON and the `Content-Type` header.
- If the server does not start, confirm `MONGO_URI` is correct and MongoDB is reachable.

## Testing
- Manual test: use the curl/PowerShell example above to create a short URL, then visit the returned short URL in a browser.
- Integration test (suggestion): add a small `supertest` test suite to POST `/api/create` and then `GET` the returned token and assert redirection and click increment.

## Next improvements
- Add validation and normalization (e.g., ensure `http(s)://` is present).
- Add tests for duplicate handling, redirects, and click-counting.
- Consider returning structured JSON with more metadata (e.g., createdAt, clicks) on creation.