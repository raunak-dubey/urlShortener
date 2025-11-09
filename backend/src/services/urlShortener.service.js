import { getCustomUrl, saveShortUrl } from "../dao/urlShortener.dao.js";
import AppError from "../utils/appError.utils.js";
import { generateNanoId } from "../utils/helper.utils.js";

export const createShortUrlWithoutUser = async (url) => {
    const shortUrl = generateNanoId(7);
    if (!shortUrl) throw AppError.internal('Failed to generate short URL');
    const saved = await saveShortUrl(shortUrl, url);
    if (saved && saved.shortUrl) return saved.shortUrl;
    return shortUrl;
}

export const createShortUrlWithUser = async (url, userId, slug = null) => {
    const shortUrl = slug || generateNanoId(7);
    const exist = await getCustomUrl(slug);
    if (slug && exist) throw AppError.conflict('Custom URL slug already exists');

    const saved = await saveShortUrl(shortUrl, url, userId);
    if (saved && saved.shortUrl) return saved.shortUrl;
    return shortUrl;
}
