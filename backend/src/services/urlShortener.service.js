import { saveShortUrl } from "../dao/urlShortener.js";
import AppError  from "../utils/appError.utils.js";
import { generateNanoId } from "../utils/helper.utils.js";

export const createShortUrlWithoutUser = async (url) => {
    const shortUrl = await generateNanoId(7);
    if (!shortUrl) throw AppError.internal('Failed to generate short URL');
    const saved = await saveShortUrl(shortUrl, url);
    
    if (saved && saved.shortUrl) return saved.shortUrl;
    return shortUrl;
}

export const createShortUrlWithUser = async (url, userId) => {
    const shortUrl = await generateNanoId(7);
    const saved = await saveShortUrl(shortUrl, url, userId);
    if (saved && saved.shortUrl) return saved.shortUrl;
    return shortUrl;
}
