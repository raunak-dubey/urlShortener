import { getShortUrlEntry } from "../dao/urlShortner.js";
import { createShortUrlWithoutUser } from "../services/urlShortner.service.js";
import catchAsync from "../utils/catchAsync.utils.js";

export const createShortUrl = catchAsync(async (req, res, next) => {
    const { url } = req.body;
    const shortUrl = await createShortUrlWithoutUser(url);
    res.send(process.env.APP_URL + shortUrl);
});

export const redirectFromShortUrl = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const urlEntry = await getShortUrlEntry(id);
    res.redirect(urlEntry.originalUrl);
});