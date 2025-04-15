// src/components/AuthGuard.jsx
import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

/**
 * AuthGuard - Protects routes that require authentication
 * Redirects to login if not authenticated
 */
export const AuthGuard = ({ children }) => {
  const { isAuthenticated, checkAuth, loading } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      try {
        const authValid = await checkAuth();
        
        // If checkAuth fails but we have a token, force logout
        if (!authValid && document.cookie.includes('token')) {
          await useAuthStore.getState().signout();
          navigate('/login', { 
            state: { from: location },
            replace: true
          });
          return;
        }

        if (isMounted) {
          setIsChecking(false);
        }
      } catch (error) {
        console.error('Auth verification error:', error);
        if (isMounted) {
          setIsChecking(false);
        }
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, [checkAuth, location, navigate]);

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
    // Preserve the intended location for post-login redirect
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }

  return children;
};

/**
 * GuestGuard - Protects auth routes (login/signup)
 * Redirects to home if already authenticated
 */
export const GuestGuard = ({ children }) => {
  const { isAuthenticated, checkAuth, loading } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      try {
        await checkAuth();
        if (isMounted) {
          setIsChecking(false);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        if (isMounted) {
          setIsChecking(false);
        }
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
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
    // Redirect to intended page or home
    return <Navigate to={from} replace />;
  }

  return children;
};