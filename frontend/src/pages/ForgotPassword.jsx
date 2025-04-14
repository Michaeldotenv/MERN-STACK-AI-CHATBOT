import { useState } from 'react';
import { 
  Box, Typography, Button, Paper, Container,
  TextField, CircularProgress
} from '@mui/material';
import { motion } from 'framer-motion';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';

const ForgotPassword = () => {
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError('');
      await forgotPassword(userEmail);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Password reset failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #05101c 0%, #0a1a2f 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            component="form"
            onSubmit={handleSubmit}
            elevation={0}
            sx={{
              background: 'rgba(5, 16, 28, 0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(79, 195, 247, 0.3)',
              borderRadius: '16px',
              p: 4,
              textAlign: 'center'
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #4fc3f7, #00acc1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3
            }}>
              Reset Password
            </Typography>
            
            {success ? (
              <>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <FaEnvelope size={60} color="#4fc3f7" style={{ marginBottom: 20 }} />
                </motion.div>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  We've sent a password reset link to <strong>{userEmail}</strong>. Please check your email.
                </Typography>
                <Button
                  onClick={() => navigate('/login')}
                  variant="outlined"
                  sx={{
                    borderColor: '#4fc3f7',
                    color: '#4fc3f7',
                    '&:hover': {
                      background: 'rgba(79, 195, 247, 0.1)'
                    }
                  }}
                >
                  Back to Sign In
                </Button>
              </>
            ) : (
              <>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  Enter your email address and we'll send you a link to reset your password.
                </Typography>
                
                <TextField
                  fullWidth
                  type="email"
                  label="Email Address"
                  variant="outlined"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      color: '#e0f7fa',
                      '& fieldset': {
                        borderColor: 'rgba(79, 195, 247, 0.5)'
                      },
                      '&:hover fieldset': {
                        borderColor: '#4fc3f7'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#4fc3f7'
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(79, 195, 247, 0.7)'
                    }
                  }}
                />
                
                {error && (
                  <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                  </Typography>
                )}
                
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  fullWidth
                  sx={{
                    background: 'linear-gradient(45deg, #4fc3f7, #00acc1)',
                    color: '#05101c',
                    fontWeight: 'bold',
                    py: 1.5,
                    borderRadius: '8px',
                    mb: 2,
                    '&:hover': {
                      background: 'linear-gradient(45deg, #00acc1, #4fc3f7)'
                    }
                  }}
                >
                  {isLoading ? <CircularProgress size={24} sx={{ color: '#05101c' }} /> : 'Send Reset Link'}
                </Button>
                
                <Button
                  onClick={() => navigate('/signin')}
                  startIcon={<FaArrowLeft />}
                  sx={{ color: '#4fc3f7' }}
                >
                  Remember your password? Sign In
                </Button>
              </>
            )}
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ForgotPassword;
