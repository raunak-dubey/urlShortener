import { getShortUrlEntry } from "../dao/urlShortener.dao.js";
import { createShortUrlWithoutUser, createShortUrlWithUser} from "../services/urlShortener.service.js";
import AppError from "../utils/appError.utils.js";
import catchAsync from "../utils/catchAsync.utils.js";

export const createShortUrl = catchAsync(async (req, res, next) => {
    const { url, slug } = req.body;
    if (!url) return next(AppError.badRequest("originalUrl is required"));
    let shortUrl;
    if (req.user) {
        shortUrl = await createShortUrlWithUser(url, req.user.id, slug);
    } else {
        shortUrl = await createShortUrlWithoutUser(url);
    }
    const baseUrl = process.env.APP_URL || `http://localhost:${process.env.PORT || 3000}`;
    res.status(201).json({ shortUrl: `${baseUrl}/${shortUrl}` });
});

export const redirectFromShortUrl = catchAsync(async (req, res) => {
    const { id } = req.params;
    const urlEntry = await getShortUrlEntry(id);
    if (!urlEntry) {
        return res.status(404).send("Not found");
    }
    return res.redirect(urlEntry.originalUrl);
});