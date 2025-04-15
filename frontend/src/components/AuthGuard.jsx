import { useAuthStore } from '../stores/useAuthStore.js';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

export const AuthGuard = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
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

  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export const GuestGuard = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  if (isLoading) {
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

  return isAuthenticated ? <Navigate to={from} replace /> : children;
};