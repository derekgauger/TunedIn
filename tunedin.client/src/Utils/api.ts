import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5180/api', // Replace with your API's base URL
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;