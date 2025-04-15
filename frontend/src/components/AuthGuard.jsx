import { useAuthStore } from '../stores/useAuthStore';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

export const AuthGuard = ({ children }) => {
  const { isAuthenticated, loading } = useAuthStore();
  const location = useLocation();

  if (loading) {
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
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export const GuestGuard = ({ children }) => {
  const { isAuthenticated, loading } = useAuthStore();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  if (loading) {
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
    return <Navigate to={from} replace />;
  }

  return children;
};
