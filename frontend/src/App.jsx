import { Routes, Route, useLocation } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Chat from './pages/Chat';
import AuthDemoPage from './components/autoDemoPage';
import { AuthGuard, GuestGuard } from './components/AuthGuard';
import { useAuthStore } from './stores/useAuthStore';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/resetPassword';

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
  const { checkAuth, isAuthenticated } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    // Only check auth if not already authenticated
    if (!isAuthenticated) {
      checkAuth();
    }
  }, [checkAuth, isAuthenticated]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes location={location} key={location.pathname}>
        {/* Protected routes */}
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<AuthGuard><Chat /></AuthGuard>} />
        
        {/* Auth routes */}
        <Route path="/login" element={<GuestGuard><Login /></GuestGuard>} />
        <Route path="/signup" element={<GuestGuard><Signup /></GuestGuard>} />
        <Route path="/demo" element={<GuestGuard><AuthDemoPage /></GuestGuard>} />
        
        {/* Password recovery (should be accessible without auth) */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        
        {/* 404 - No guard needed */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;