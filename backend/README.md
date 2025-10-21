# URL Shortener — Backend

This backend provides a REST API to create and resolve short URLs backed by MongoDB.

Features

- Create short URLs from long original URLs
- Redirect short URLs to the original URL
- Increment a click counter on each redirect
- Reuse an existing short URL when the same original URL is submitted

Requirements

- Node.js 18+ (ES modules)
- npm
- MongoDB (local or remote)

Environment

Create a `.env` file in the `backend/` folder with:

PORT=
APP_URL=http://localhost:
MONGO_URI=mongodb://localhost:27017/

```
`PORT` — port the server listens on
`APP_URL` — base URL used when returning full short URLs
`MONGO_URI` — MongoDB connection string
```

Install and run

From the `backend/` folder:
```
npm install
npm run dev
```

API
1) Create short URL

- Endpoint: POST /api/create
- Content-Type: application/json
- Body (JSON): { "originalUrl": "https://example.com/long/path" }
- Success: returns a JSON object containing the created short URL (example: { "shortUrl": "http://localhost:3000/abc1234" })

2) Redirect short URL

- Endpoint: GET /:id
- Visiting the short URL (example: http://localhost:3000/abc1234) redirects to the stored original URL and increments the click counter.

Notes

- When a submitted original URL already exists in the database, the existing short URL is returned instead of creating a duplicate.
