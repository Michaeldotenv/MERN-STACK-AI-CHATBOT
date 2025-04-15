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
  const { isLoading, checkAuth } = useAuthStore();
  const [authChecked, setAuthChecked] = useState(false);
  const location = useLocation();

  useEffect(() => {
    checkAuth().finally(() => setAuthChecked(true));
  }, [checkAuth]);

  if (!authChecked || isLoading) {
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

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AuthGuard><Home /></AuthGuard>} />
        <Route path="/chats" element={<AuthGuard><Chat /></AuthGuard>} />
        <Route path="/login" element={<GuestGuard><Login /></GuestGuard>} />
        <Route path="/signup" element={<GuestGuard><Signup /></GuestGuard>} />
        <Route path="/demo" element={<GuestGuard><AuthDemoPage /></GuestGuard>} />
        <Route path="/forgot-password" element={<GuestGuard><ForgotPassword /></GuestGuard>} />
        <Route path="/reset-password/:token" element={<GuestGuard><ResetPassword /></GuestGuard>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;