// * Imports 
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/mongo.config.js';
import urlShortenerRoutes from './src/routes/urlShortener.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import { redirectFromShortUrl } from './src/controllers/urlShortener.controller.js';
import { errorHandler } from './src/middlewares/errorHandler.middleware.js';
import { attachUser } from './src/utils/attachUser.utils.js';

// * Configurations & App Initialization
dotenv.config("./.env");

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3001",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// * Routes
app.use(attachUser);
app.use('/api/auth', authRoutes);
app.use('/api/create', urlShortenerRoutes);
app.get('/:id', redirectFromShortUrl);

app.use(errorHandler);

// * Server & Database Initialization
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;