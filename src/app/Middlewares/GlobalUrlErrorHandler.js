'use client';
import axios from "axios";

const BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://api.your-production-domain.com'
    : 'http://localhost:5000';
const AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
})

export const LocalUrl = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 10000
})

AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => Promise.reject(error)
)

AxiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (process.env.NODE_ENV === 'development') {
            console.log('[DEV] Axios Error:', {
                config: error.config || 'No config',
                response: error.response || 'No response',
                message: error.message || 'No message',
                stack: error.stack || 'No stack trace',
            });
        }
        const errorResponse = {
            status: error.response?.status || 500,
            message: '',
            data: error.response?.data || error.message.message || error.message,
        };

        if (error.code === 'ECONNABORTED') {
            console.error('Request timed out');
            errorResponse.message = 'Request timed out. Please try again later.';
        }

        switch (errorResponse.status) {
            case 400:
                errorResponse.message = 'Bad request';
                break;
            case 401:
                errorResponse.message = 'Unauthorized - Please login again';
                break;
            case 403:
                errorResponse.message = 'Forbidden - You lack necessary permissions';
                break;
            case 404:
                errorResponse.message = 'Resource not found';
                break;
            case 500:
                errorResponse.message = 'Server error - Please try again later';
                break;
            default:
                errorResponse.message = error.message || 'An unexpected error occurred';
        }

        return Promise.reject(errorResponse);
    }
);


export { AxiosInstance }