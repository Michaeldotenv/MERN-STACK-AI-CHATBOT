// src/services/authService.js
import axios from 'axios';

// Update the baseURL to match your actual backend domain
const API = axios.create({
  baseURL: 'https://nexus-ai-chatbotv1.onrender.com/api/v1',
  withCredentials: true, // Critical for sending/receiving cookies
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
      // We don't need to trigger logout here, as the auth guard will handle it
    }

    return Promise.reject(new Error(message));
  }
);

// Request interceptor - No need for localStorage token with HTTP-only cookies
// But we'll keep it as a fallback mechanism
API.interceptors.request.use((config) => {
  // No need to set Authorization header as we're using cookies
  // But we'll leave it as a fallback
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

export const apiForgotPassword = (email) => 
  API.post('/forgot-password', { email });

export const apiResetPassword = (token, passwords) => 
  API.post(`/reset-password/${token}`, passwords);