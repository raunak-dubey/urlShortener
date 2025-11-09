import axiosInstance from "@/utils/axiosInstance";

export const createShortUrl = async (url, slug) => {
    if (!url) throw new Error('url is required');
  const {data} = await axiosInstance.post('/create', {url, slug});
  return data.shortUrl;
}