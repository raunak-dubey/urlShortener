# URL Shortener — Full Project

This repository contains a full-stack URL shortener application, featuring a React/Next.js frontend and an Express.js backend with JWT-based authentication.

## Features
- **User Authentication**: Secure user registration and login using JWT.
- **URL Shortening**: Create short, unique URLs for any long URL (protected endpoint).
- **Redirection**: Seamlessly redirect short URLs to their original destination.
- **Click Tracking**: Counts the number of times a shortened link is visited.
- **Modern Frontend**: A clean, responsive UI built with Next.js and Tailwind CSS.

## Technology Stack
- **Frontend**: Next.js, SCSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT), bcrypt

## Project Structure

- `backend/` — Express.js API that creates and resolves short URLs using MongoDB
- `frontend/` — Next.js application that provides the user interface

## Prerequisites

- Node.js
- npm (or yarn/pnpm)
- MongoDB (for the backend)

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd urlShortener
   ```

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Create an environment file:** Create a `.env` file in the `backend` directory and add the following variables:
    ```env
    PORT=
    APP_URL=http://localhost:
    MONGO_URI=mongodb://localhost:27017/
    JWT_SECRET=your-super-secret-jwt-key
    CLIENT_URL=http://localhost:
    ```
3.  **Install dependencies and run:**
    ```bash
    npm install
    npm run dev
    ```
    The backend will be running on the `PORT` specified in your `.env` file (e.g., `http://localhost:3000`).

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```
2.  **Create an environment file:** Create a `.env.local` file and set the URL for the backend API:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:3001
    ```
3.  **Install dependencies and run:**
    ```bash
    npm install
    npm run dev
    ```
    The frontend development server will start, usually on `http://localhost:3001`.

## API Endpoints

### Authentication
- `POST /api/register`: Register a new user.
  - Body: `{ "username": "your_username", "password": "your_password" }`
- `POST /api/login`: Log in a user and receive a JWT.
  - Body: `{ "username": "your_username", "password": "your_password" }`

### URL Management
- `POST /api/create`: Create a short URL (Protected).
  - Body: `{ "originalUrl": "https://example.com/very/long/url" }`
- `GET /:id`: Redirect a short URL to its original destination and track the click.

---
For more detailed information, please see the `README.md` files inside the `frontend` and `backend` directories.