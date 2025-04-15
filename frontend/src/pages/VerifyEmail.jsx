/*import { useState, useRef, useEffect } from 'react';
import { 
  Box, Typography, Button, Paper, Container,
  CircularProgress, Stack
} from '@mui/material';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';

const VerifyEmail = () => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { verifyEmail } = useAuthStore();

  // Handle paste from clipboard
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').trim();
    
    if (/^\d{6}$/.test(pasteData)) {
      const pastedCode = pasteData.split('');
      const newCode = [...verificationCode];
      
      pastedCode.forEach((char, index) => {
        if (index < 6) {
          newCode[index] = char;
        }
      });
      
      setVerificationCode(newCode);
      
      // Focus the last input
      if (pastedCode.length >= 6) {
        inputRefs.current[5].focus();
      } else {
        inputRefs.current[pastedCode.length].focus();
      }
    }
  };

  const handleChange = (index, value) => {
    if (/^[0-9]$/.test(value) || value === '') {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      
      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const code = verificationCode.join('');
      await verifyEmail(code);
      
      setSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed. Please try again.');
      setVerificationCode(['', '', '', '', '', '']);
      inputRefs.current[0].focus();
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
            {success ? (
              <Box>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <FaCheckCircle size={60} color="#4fc3f7" style={{ marginBottom: 20 }} />
                </motion.div>
                <Typography variant="h5" gutterBottom sx={{ color: '#4fc3f7' }}>
                  Email Verified!
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Your email has been successfully verified. Redirecting you to the dashboard...
                </Typography>
                <CircularProgress size={24} sx={{ color: '#4fc3f7' }} />
              </Box>
            ) : (
              <>
                <Typography variant="h4" gutterBottom sx={{ 
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #4fc3f7, #00acc1)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 3
                }}>
                  Verify Your Email
                </Typography>
                
                <Typography variant="body1" sx={{ mb: 4 }}>
                  We've sent a 6-digit verification code to your email address. Please enter it below.
                </Typography>
                
                <Stack 
                  direction="row" 
                  spacing={2} 
                  justifyContent="center" 
                  sx={{ mb: 4 }}
                  onPaste={handlePaste}
                >
                  {verificationCode.map((digit, index) => (
                    <Paper
                      key={index}
                      elevation={0}
                      component="input"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      inputRef={(el) => (inputRefs.current[index] = el)}
                      sx={{
                        width: 50,
                        height: 60,
                        fontSize: 24,
                        textAlign: 'center',
                        background: 'rgba(79, 195, 247, 0.1)',
                        border: '1px solid rgba(79, 195, 247, 0.3)',
                        borderRadius: '8px',
                        color: '#e0f7fa',
                        '&:focus': {
                          outline: 'none',
                          borderColor: '#4fc3f7',
                          boxShadow: '0 0 0 2px rgba(79, 195, 247, 0.3)'
                        }
                      }}
                    />
                  ))}
                </Stack>
                
                {error && (
                  <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                  </Typography>
                )}
                
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  disabled={isLoading || verificationCode.some(d => d === '')}
                  sx={{
                    background: 'linear-gradient(45deg, #4fc3f7, #00acc1)',
                    color: '#05101c',
                    fontWeight: 'bold',
                    px: 4,
                    py: 1.5,
                    borderRadius: '8px',
                    mb: 2,
                    '&:hover': {
                      background: 'linear-gradient(45deg, #00acc1, #4fc3f7)'
                    }
                  }}
                >
                  {isLoading ? <CircularProgress size={24} sx={{ color: '#05101c' }} /> : 'Verify Email'}
                </Button>
                
                <Button
                  onClick={() => navigate(-1)}
                  startIcon={<FaArrowLeft />}
                  sx={{ color: '#4fc3f7' }}
                >
                  Back to Sign Up
                </Button>
              </>
            )}
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default VerifyEmail;*/