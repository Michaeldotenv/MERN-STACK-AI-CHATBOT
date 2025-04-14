// src/components/AuthGuard.jsx
import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

// This component will check if the user is authenticated
// If not, it will redirect to the login page
export const AuthGuard = ({ children }) => {
  const { isAuthenticated, checkAuth, loading } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setIsChecking(false);
    };
    
    verifyAuth();
  }, [checkAuth]);

  if (isChecking || loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(135deg, #05101c 0%, #0a1a2f 100%)',
        }}
      >
        <CircularProgress sx={{ color: '#4fc3f7' }} />
      </Box>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login with the return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// This component will check if the user is NOT authenticated
// If they are authenticated, it will redirect to the home page
export const GuestGuard = ({ children }) => {
  const { isAuthenticated, checkAuth, loading } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);
  const location = useLocation();
  
  // Get the redirect path from location state or default to home
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setIsChecking(false);
    };
    
    verifyAuth();
  }, [checkAuth]);

  if (isChecking || loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(135deg, #05101c 0%, #0a1a2f 100%)',
        }}
      >
        <CircularProgress sx={{ color: '#4fc3f7' }} />
      </Box>
    );
  }

  if (isAuthenticated) {
    // Redirect to home if already authenticated
    return <Navigate to={from} replace />;
  }

  return children;
};