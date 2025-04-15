import axios from 'axios';

const API = axios.create({
  baseURL: 'https://nexus-chatbot-ai.onrender.com/api/v1',
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
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(new Error(message));
  }
);

// Request interceptor
API.interceptors.request.use((config) => {
  const token = document.cookie.split('; ').find(row => row.startsWith('token='));
  if (token) {
    config.headers['Authorization'] = `Bearer ${token.split('=')[1]}`;
  }
  return config;
});

// Auth methods
export const apiSignIn = (credentials) => API.post('/signin', credentials);
export const apiSignUp = (userData) => API.post('/signup', userData);
export const apiSignOut = () => API.post('/signout');
export const apiCheckAuth = () => API.get('/check-auth');
export const apiForgotPassword = (email) => API.post('/forgot-password', { email });
export const apiResetPassword = (token, passwords) => API.post(`/reset-password/${token}`, passwords);