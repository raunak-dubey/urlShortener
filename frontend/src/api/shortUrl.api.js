import axiosInstance from "@/utils/axiosInstance";

export const createShortUrl = async (originalUrl, slug) => {
    if (!originalUrl) throw new Error('originalUrl is required');
  const {data} = await axiosInstance.post('/api/create', {originalUrl, slug});
  return data.shortUrl;
}