// src/stores/useAuthStore.js
import { create } from 'zustand';
import { apiSignIn, apiSignUp, apiSignOut, apiCheckAuth } from '../services/authServices.js';
import axios from "axios"


const API_URL= process.env.REACT_APP_API_URL || "https://nexus-chatbot-ai.onrender.com/api/v1" || "http://localhost:5000/api/v1"
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  
  clearError: () => set({ error: null }),
  
  signin: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await apiSignIn(credentials);
      set({ 
        user: response.user,
        isAuthenticated: true, 
        loading: false 
      });
      return response;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to sign in', 
        loading: false 
      });
      throw error;
    }
  },
  
  signup: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await apiSignUp(userData);
      set({ 
        user: response.user,
        isAuthenticated: true, 
        loading: false 
      });
      return response;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to sign up', 
        loading: false 
      });
      throw error;
    }
  },
  
  // Email verification
  verifyEmail: async (code) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(
        `${API_URL}/verify-email`, 
        { code },
        { withCredentials: true }
      );
      set({ 
        user: response.data.user,
        isLoading: false 
      });
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Verification failed';
      set({ error: errorMsg, isLoading: false });
      throw new Error(errorMsg);
    }
  },
  signout: async () => {
    set({ loading: true, error: null });
    try {
      await apiSignOut();
      set({ 
        user: null,
        isAuthenticated: false, 
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error.message || 'Failed to sign out', 
        loading: false 
      });
      throw error;
    }
  },
  
  checkAuth: async () => {
    set({ loading: true });
    try {
      const response = await apiCheckAuth();
      set({ 
        user: response.user,
        isAuthenticated: true, 
        loading: false 
      });
      return response;
    } catch (error) {
      set({ 
        user: null,
        isAuthenticated: false, 
        loading: false,
        error: null // Don't set error on auth check failures
      });
    }
  },
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const res = await axios.post(
        `${API_URL}/forgot-password`,
        { email },
        { withCredentials: true }
      );
      set({
        message: res.data.message,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        message: null,
        error: error.response?.data?.message || "Something went wrong",
      });
    }
  },
  resetPassword: async (token, password, confirmPassword) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const res = await axios.post(
        `${API_URL}/reset-password/${token}`,
        { password, confirmPassword },
        { withCredentials: true }
      );
      set({
        isLoading: false,
        message: res.data.message,
        error: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        message: null,
        error: error.response?.data?.message || "Reset failed",
      });
    }
  },
}));