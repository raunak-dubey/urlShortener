import urlShortner from "../model/urlShortner.model.js";
import AppError from "../utils/appError.utils.js";

export const saveShortUrl = async (shortUrl, originalUrl, userId) => {
    try {
        const newUrl = new urlShortner({
            originalUrl,
            shortUrl,
        });
        if (userId) {
            newUrl.userId = userId;
        }
        await newUrl.save();
    } catch (err) {
        if (err.code === 11000) throw AppError.conflict(err);
        throw new AppError(err)
    }
}

export const getShortUrlEntry = async (shortUrl) => {
    return await urlShortner.findOneAndUpdate({ shortUrl }, { $inc: { clicks: 1 } });
}