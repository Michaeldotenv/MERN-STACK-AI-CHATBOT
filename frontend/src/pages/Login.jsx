// src/components/Login.jsx
import { useState } from 'react';
import { Box, Container, TextField, Button, Typography, Link, Alert } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaFingerprint, FaUserShield, FaSignInAlt } from 'react-icons/fa';
import { GiArtificialIntelligence, GiSpinningBlades } from 'react-icons/gi';
import { useAuthStore } from '../stores/useAuthStore.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  const { signin, loading, error, clearError } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
const handleForgotPassword = ()=>{
  navigate("/forgotpassword")
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signin(formData);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      // Error is already set in the store
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #05101c 0%, #0a1a2f 100%)',
        color: '#e0f7fa',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Neon Scanlines */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.02), rgba(255,255,255,0.02) 1px, transparent 1px, transparent 2px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Robotic Spinners */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          left: '5%',
          fontSize: '8rem',
          opacity: 0.1,
          color: '#4fc3f7'
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <GiSpinningBlades />
      </motion.div>

      <motion.div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          fontSize: '12rem',
          opacity: 0.05
        }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <GiArtificialIntelligence />
      </motion.div>

      <Container maxWidth="sm" sx={{ zIndex: 2 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            background: 'rgba(5, 16, 28, 0.85)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(79, 195, 247, 0.3)',
            borderRadius: '16px',
            p: 4,
            boxShadow: '0 0 30px rgba(79, 195, 247, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Plasma Ring */}
          <motion.div
            style={{
              position: 'absolute',
              width: '200%',
              height: '200%',
              borderRadius: '50%',
              border: '2px solid rgba(79,195,247,0.15)',
              top: '-50%',
              left: '-50%',
              zIndex: 0
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />

          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4, zIndex: 2, position: 'relative' }}>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <FaRobot size={80} style={{ color: '#4fc3f7' }} />
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              style={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                fontSize: '2rem',
                fontWeight: 800,
                background: 'linear-gradient(45deg, #4fc3f7, #00acc1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              NEXUS ACCESS PORTAL
            </motion.div>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Authenticate your neural identity
            </Typography>
          </Box>

          {/* Error Alert */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ marginBottom: '1rem' }}
              >
                <Alert 
                  severity="error" 
                  onClose={clearError}
                  sx={{ 
                    background: 'rgba(255, 0, 0, 0.1)', 
                    border: '1px solid rgba(255, 0, 0, 0.3)',
                    color: '#ff6b6b'
                  }}
                >
                  {error}
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email Field */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                background: 'rgba(79, 195, 247, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
                fontSize: '1.5rem',
                color: '#4fc3f7'
              }}
            >
              <FaFingerprint />
            </Box>
            <Typography variant="h6">Neural ID</Typography>
          </Box>

          <TextField
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your registered email"
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
              '& .MuiInputBase-input': {
                backgroundColor: 'rgba(5, 16, 28, 0.7)'
              }
            }}
          />

          {/* Password Field */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                background: 'rgba(79, 195, 247, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
                fontSize: '1.5rem',
                color: '#4fc3f7'
              }}
            >
              <FaUserShield />
            </Box>
            <Typography variant="h6">Encryption Key</Typography>
          </Box>

          <TextField
            fullWidth
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your encryption key"
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
              '& .MuiInputBase-input': {
                backgroundColor: 'rgba(5, 16, 28, 0.7)'
              }
            }}
          />

<Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              forgot your encryption key?{' '}
              <Link to="/forgotpassword" sx={{ color: '#4fc3f7', textDecoration: 'none' }}>
               reconfigure your key
              </Link>
            </Typography>
          </Box>

          {/* Submit Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
          >
            <Button
              type="submit"
              fullWidth
              disabled={loading}
              variant="contained"
              sx={{
                background: 'linear-gradient(45deg, #4fc3f7, #00acc1)',
                fontSize: '1.1rem',
                py: 2,
                mt: 2
              }}
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    SCANNING...
                  </motion.span>
                ) : isHovering ? (
                  <motion.span
                    key="authenticate"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    INITIATE NEURAL SCAN <FaSignInAlt />
                  </motion.span>
                ) : (
                  <motion.span
                    key="login"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    ACCESS NEXUS <FaSignInAlt />
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Not part of the network?{' '}
              <Link to="/signup" sx={{ color: '#4fc3f7', textDecoration: 'none' }}>
                Initialize your identity
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* Floating Plasma Particles */}
      {[...Array(18)].map((_, i) => {
        const size = Math.random() * 8 + 2;
        return (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              background:
                'radial-gradient(circle, rgba(79,195,247,1) 0%, rgba(79,195,247,0) 70%)',
              borderRadius: '50%',
              width: size,
              height: size,
              filter: 'blur(1px)'
            }}
            initial={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 80],
              x: [0, (Math.random() - 0.5) * 80],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 12 + 8,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
        );
      })}
    </Box>
  );
};

export default Login;