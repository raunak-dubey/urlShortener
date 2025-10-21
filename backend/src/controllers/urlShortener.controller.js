import { getShortUrlEntry } from "../dao/urlShortener.js";
import { createShortUrlWithoutUser } from "../services/urlShortener.service.js";
import AppError from "../utils/appError.utils.js";
import catchAsync from "../utils/catchAsync.utils.js";

export const createShortUrl = catchAsync(async (req, res, next) => {
    
    const { url, originalUrl } = req.body || {};
    const incomingUrl = originalUrl || url;
    if (!incomingUrl) return next(AppError.badRequest('originalUrl is required'));
    const shortUrl = await createShortUrlWithoutUser(incomingUrl);
    const baseUrl = process.env.APP_URL || `http://localhost:${process.env.PORT || 3000}`;
    res.status(201).json({ shortUrl: `${baseUrl}${shortUrl}` });
});

export const redirectFromShortUrl = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const urlEntry = await getShortUrlEntry(id);
    if (!urlEntry) {
        return res.status(404).send('Not found');
    }
    return res.redirect(urlEntry.originalUrl);
});