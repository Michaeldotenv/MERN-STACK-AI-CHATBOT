// src/stores/useAuthStore.js
import { create } from 'zustand';
import { apiSignIn, apiSignUp, apiSignOut, apiCheckAuth, apiForgotPassword, apiResetPassword } from '../services/authServices.js';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  isLoading: false,
  error: null,
  message: null,
  
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
  
  signout: async () => {
    set({ loading: true, error: null });
    try {
      await apiSignOut();
      set({ 
        user: null,
        isAuthenticated: false, 
        loading: false 
      });
      
      // No need to reload the page, but we'll do it to ensure
      // all state is cleared, including cookies
      window.location.href = '/login';
    } catch (error) {
      // Even if logout fails on the server, clear local state
      set({ 
        user: null,
        isAuthenticated: false,
        loading: false,
        error: error.message || 'Failed to sign out'
      });
      
      // Still redirect to login even if there was an error
      window.location.href = '/login';
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
      return true;
    } catch (error) {
      set({ 
        user: null,
        isAuthenticated: false, 
        loading: false,
        error: null // Don't show error for auth checks
      });
      return false;
    }
  },
  
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await apiForgotPassword(email);
      set({
        message: response.message,
        isLoading: false
      });
      return response;
    } catch (error) {
      set({
        error: error.message || "Something went wrong",
        isLoading: false
      });
      throw error;
    }
  },
  
  resetPassword: async (token, passwords) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await apiResetPassword(token, passwords);
      set({
        message: response.message,
        isLoading: false
      });
      return response;
    } catch (error) {
      set({
        error: error.message || "Reset failed",
        isLoading: false
      });
      throw error;
    }
  }
}));