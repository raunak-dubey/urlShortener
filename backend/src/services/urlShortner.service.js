import { saveShortUrl } from "../dao/urlShortner.js";
import AppError  from "../utils/appError.utils.js";
import { generateNanoId } from "../utils/helper.utils.js";

export const createShortUrlWithoutUser = async (url) => {
    const shortUrl = await generateNanoId(7);
    if (!shortUrl) throw AppError.internal('Failed to generate short URL');
    await saveShortUrl(shortUrl, url);
    return shortUrl;
}

export const createShortUrlWithUser = async (url, userId) => {
    const shortUrl = await generateNanoId(7);
    await saveShortUrl(shortUrl, url, userId);
    return shortUrl;
}
