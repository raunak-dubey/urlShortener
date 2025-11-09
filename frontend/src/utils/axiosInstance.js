import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    timeout: 10000,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // If server responded with a status outside 2xx
        if (error.response) {
            const message = error.response.data?.message || `Request failed with status ${error.response.status}`;
            const err = new Error(message);
            const { status, data } = error.response;
            err.status = status;
            err.data = data;
            return Promise.reject(err);
        }

        if (error.request) {
            return Promise.reject(
                new Error("No response from server. Is backend running?")
            );
        }

        return Promise.reject(new Error(error.message || 'Network error'));
    }
);

export default axiosInstance;
