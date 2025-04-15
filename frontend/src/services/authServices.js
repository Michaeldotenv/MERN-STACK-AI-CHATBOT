// src/services/authService.js
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://nexus-chatbot-ai.onrender.com/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Response interceptor
API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;
    let message = error.response?.data?.message || 'Something went wrong';

    if (status === 401) {
      message = 'Session expired, please login again';
      // Optionally trigger logout here
    }

    return Promise.reject(new Error(message));
  }
);

// Request interceptor for JWT
API.interceptors.request.use((config) => {
  // If token exists in localStorage, use it
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth methods
export const apiSignIn = (credentials) => API.post('/signin', credentials);

export const apiSignUp = (userData) => 
  API.post('/signup', {
    name: userData.username,
    email: userData.email,
    password: userData.password
  });

export const apiSignOut = () => API.post('/signout');

export const apiCheckAuth = () => API.get('/check-auth');

export const apiVerifyEmail = (code) => API.post('/verify-email', { code });

export const apiForgotPassword = (email) => 
  API.post('/forgot-password', { email });

export const apiResetPassword = (token, passwords) => 
  API.post(`/reset-password/${token}`, passwords);