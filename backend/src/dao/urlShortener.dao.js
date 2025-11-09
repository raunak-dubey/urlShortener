import urlShortener from "../models/urlShortener.model.js";
import AppError from "../utils/appError.utils.js";

export const saveShortUrl = async (shortUrl, originalUrl, userId) => {
    try {
        const existing = await urlShortener.findOne({ originalUrl });
        if (existing) return existing;
        const newUrl = new urlShortener({
            originalUrl,
            shortUrl,
        });
        if (userId) {
            newUrl.user = userId;
        }
        const saved = await newUrl.save();
        return saved;
    } catch (err) {
        if (err.code === 11000) throw AppError.conflict('Duplicate key error');
        if (err instanceof AppError) throw err;
        throw AppError.internal(err.message || 'Database error');
    }
}

export const getShortUrlEntry = async (shortUrl) => {
    return await urlShortener.findOneAndUpdate(
        { shortUrl },
        { $inc: { clicks: 1 } },
        { new: true }
    );
}

export const getCustomUrl = async (slug) => {
    try {
        const customUrl = await urlShortener.findOne({ shortUrl: slug });
        return customUrl;
    } catch (err) {
        throw AppError.internal(err.message || "Database error while fetching custom URL");
    }
}