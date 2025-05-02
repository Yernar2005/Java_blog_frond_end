import axios from "axios";


export const API_URL = 'http://localhost:8080/api';

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token && !config.url?.includes('/auth/registration') && !config.url?.includes('/auth')) {
        config.headers.Authorization = `Bearer ${token}`;
    } else if (config.headers.Authorization) {
        delete config.headers.Authorization;
    }
    return config;
})


export default api;