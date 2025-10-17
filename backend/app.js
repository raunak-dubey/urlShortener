// * Imports 
import express from 'express';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
import connectDB from './src/config/mongo.config.js';
import urlShortner from './src/model/urlShortner.model.js';

// * Configurations & App Initialization
dotenv.config("./.env");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * Routes
app.post('/api/create', (req, res) => {
    const { url } = req.body;
    const shortUrl = nanoid(7);
    const newUrl = new urlShortner({
        originalUrl: url,
        shortUrl,
    });
    newUrl.save();
    res.json({ shortUrl });
});

app.get('/:id', async (req, res) => {
    const { id } = req.params;
    const urlEntry = await urlShortner.findOne({ shortUrl: id });
    if (urlEntry) {
        urlEntry.clicks += 1;
        await urlEntry.save();
        return res.redirect(urlEntry.originalUrl);
    }
    return res.status(404).json({ message: 'URL not found' });
});

// * Start Server & Connect to DB
app.listen(3000, () => {    
    connectDB();
    console.log('Server is running on http://localhost:3000');
});

export default app;