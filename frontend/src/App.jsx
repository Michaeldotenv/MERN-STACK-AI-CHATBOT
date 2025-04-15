import { Routes, Route, useLocation } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme, CircularProgress, Box } from '@mui/material';
import { useEffect, useState } from 'react';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Chat from './pages/Chat';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/resetPassword';
import AuthDemoPage from './components/autoDemoPage';
import { AuthGuard, GuestGuard } from './components/AuthGuard';
import { useAuthStore } from './stores/useAuthStore.js';

// Theme config
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#4fc3f7' },
    secondary: { main: '#00acc1' },
    background: { default: '#05101c', paper: '#0a1a2f' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});

function App() {
  const { checkAuth } = useAuthStore();
  const [authChecked, setAuthChecked] = useState(false);
  const location = useLocation();

  // Perform auth check on first mount
  useEffect(() => {
    const verify = async () => {
      try {
        await checkAuth();
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setAuthChecked(true);
      }
    };
    verify();
  }, [checkAuth]);

  // Initial loading screen
  if (!authChecked) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#05101c',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress sx={{ color: '#4fc3f7' }} />
      </Box>
    );
  }

  // Main App content
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes location={location} key={location.pathname}>
        {/* Protected routes */}
        <Route path="/" element={<AuthGuard><Home /></AuthGuard>} />
        <Route path="/chats" element={<AuthGuard><Chat /></AuthGuard>} />

        {/* Public routes */}
        <Route path="/login" element={<GuestGuard><Login /></GuestGuard>} />
        <Route path="/signup" element={<GuestGuard><Signup /></GuestGuard>} />
        <Route path="/demo" element={<GuestGuard><AuthDemoPage /></GuestGuard>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Fallback 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
