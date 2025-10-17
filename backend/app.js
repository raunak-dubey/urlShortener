// * Imports 
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/mongo.config.js';
import urlShortnerRoutes from './src/routes/urlShortner.routes.js';
import { redirectFromShortUrl } from './src/controllers/urlShortner.controller.js';
import { errorHandler } from './src/middlewares/errorHandler.middleware.js';

// * Configurations & App Initialization
dotenv.config("./.env");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * Routes
app.use('/api/create', urlShortnerRoutes);

app.get('/:id', redirectFromShortUrl);

app.use(errorHandler);

// * Start Server & Connect to DB
app.listen(process.env.PORT, () => {    
    connectDB();
    console.log(`Server is running on ${process.env.APP_URL}`);
});

export default app;