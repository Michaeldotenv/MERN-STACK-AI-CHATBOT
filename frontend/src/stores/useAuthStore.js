import { create } from 'zustand';
import { apiSignIn, apiSignUp, apiSignOut, apiCheckAuth, apiForgotPassword, apiResetPassword } from '../services/authServices.js';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  message: null,
  
  clearError: () => set({ error: null }),
  
  signin: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiSignIn(credentials);
      set({ 
        user: response.user,
        isAuthenticated: true, 
        isLoading: false 
      });
      return response;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to sign in', 
        isLoading: false 
      });
      throw error;
    }
  },
  
  signup: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiSignUp(userData);
      set({ 
        user: response.user,
        isAuthenticated: true, 
        isLoading: false 
      });
      return response;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to sign up', 
        isLoading: false 
      });
      throw error;
    }
  },
  
  signout: async () => {
    set({ isLoading: true, error: null });
    try {
      await apiSignOut();
      set({ 
        user: null,
        isAuthenticated: false, 
        isLoading: false 
      });
      window.location.href = '/login';
    } catch (error) {
      set({ 
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error.message || 'Failed to sign out'
      });
      window.location.href = '/login';
    }
  },
  
  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const response = await apiCheckAuth();
      set({ 
        user: response.user,
        isAuthenticated: true, 
        isLoading: false 
      });
      return true;
    } catch (error) {
      set({ 
        user: null,
        isAuthenticated: false, 
        isLoading: false,
        error: null
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