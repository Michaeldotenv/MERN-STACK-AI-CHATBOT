// src/services/authService.js
import axios from 'axios';

// Set base URL based on environment
const BASE_URL = process.env.REACT_APP_API_URL || "https://nexus-chatbot-ai.onrender.com/api/v1" || 'http://localhost:5000/api/v1';

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // For cookies (ensure backend CORS allows credentials)
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Global response/error interceptor
API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Custom error handling
    const status = error.response?.status;
    let message = 'Something went wrong';

    if (error.response?.data?.message) {
      message = error.response.data.message;
    } else if (status === 401) {
      message = 'Unauthorized - Please login again';
    } else if (status === 500) {
      message = 'Server error - Try again later';
    }

    // You can add automatic token refresh logic here if needed
    return Promise.reject(new Error(message));
  }
);

// Auth methods
export const apiSignIn = async (credentials) => {
  return API.post('/signin', credentials);
};

export const apiSignUp = async (userData) => {
  return API.post('/signup', {
    name: userData.username,
    email: userData.email,
    password: userData.password
  });
};

export const apiSignOut = async () => {
  return API.post('/signout');
};

export const apiCheckAuth = async () => {
  return API.get('/check-auth');
};

// Optional: Add request interceptor for JWT
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});