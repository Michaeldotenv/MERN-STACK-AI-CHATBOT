import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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
import VerifyEmail from './pages/VerifyEmail';
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
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router> {/* ✅ Now wrapping the router */}
        <Routes>
          <Route path="/" element={<AuthGuard><Home /></AuthGuard>} />
          <Route path="/login" element={<GuestGuard><Login /></GuestGuard>} />
          <Route path="/signup" element={<GuestGuard><Signup /></GuestGuard>} />
          <Route path="/chats" element={<AuthGuard><Chat /></AuthGuard>} />
          <Route path="/demo" element={<GuestGuard><AuthDemoPage /></GuestGuard>} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgotpassword" element={<GuestGuard><ForgotPassword /></GuestGuard>} />
          <Route path="/reset-password/:token" element={<GuestGuard><ResetPassword /></GuestGuard>} />
          <Route path="*" element={<GuestGuard><NotFound /></GuestGuard>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
