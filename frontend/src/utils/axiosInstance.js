import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Centralized response/error handler
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

        // Request made but no response received
        if (error.request) {
            const err = new Error('No response from server. Is the backend running?');
            err.request = error.request;
            return Promise.reject(err);
        }

        // Something happened in setting up the request
        return Promise.reject(new Error(error.message || 'Network error'));
    }
);

export default axiosInstance;
