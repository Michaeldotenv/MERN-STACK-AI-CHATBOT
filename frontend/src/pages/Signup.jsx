import { useState } from 'react';
import { Box, Container, TextField, Button, Typography, Alert } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaFingerprint, FaUserAstronaut, FaShieldAlt } from 'react-icons/fa';
import { GiArtificialIntelligence, GiSpinningBlades } from 'react-icons/gi';
import { useAuthStore } from '../stores/useAuthStore.js';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [activeStep, setActiveStep] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  const { signup, loading, error, clearError } = useAuthStore();

  const steps = [
    { icon: <FaUserAstronaut />, field: 'username', label: 'Your Full Name' },
    { icon: <FaFingerprint />, field: 'email', label: 'Your Email' },
    { icon: <FaShieldAlt />, field: 'password', label: 'Your Nexus Password' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeStep !== steps.length - 1) return handleNext();
    
    try {
      await signup(formData);
      navigate('/verify-email', { state: { email: formData.email } });
    } catch (err) {
      console.error('Signup error:', err);
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
              JOIN THE NEXUS NETWORK
            </motion.div>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Register and initialize your neural identity
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

          {/* Step Form with Laser Swipe */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ clipPath: 'inset(0% 0% 0% 100%)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              exit={{ clipPath: 'inset(0% 100% 0% 0%)' }}
              transition={{ duration: 0.5 }}
            >
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
                  {steps[activeStep].icon}
                </Box>
                <Typography variant="h6">{steps[activeStep].label}</Typography>
              </Box>

              <TextField
                fullWidth
                name={steps[activeStep].field}
                value={formData[steps[activeStep].field]}
                onChange={handleChange}
                type={activeStep === 2 ? 'password' : 'text'}
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
                      borderColor: '#4fc3f7',
                      boxShadow: '0 0 0 2px rgba(79, 195, 247, 0.2)'
                    }
                  },
                  '& .MuiInputBase-input': {
                    backgroundColor: 'rgba(5, 16, 28, 0.7)'
                  }
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={handleBack}
              disabled={activeStep === 0}
              sx={{
                color: '#4fc3f7',
                visibility: activeStep === 0 ? 'hidden' : 'visible'
              }}
            >
              Back
            </Button>

            {activeStep < steps.length - 1 ? (
              <Button
                type="button"
                onClick={handleNext}
                variant="outlined"
                sx={{
                  borderColor: '#4fc3f7',
                  color: '#4fc3f7',
                  '&:hover': {
                    background: 'rgba(79, 195, 247, 0.1)'
                  }
                }}
              >
                Next
              </Button>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
              >
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    background: 'linear-gradient(45deg, #4fc3f7, #00acc1)',
                    fontSize: '1.1rem',
                    px: 4
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
                        PROCESSING...
                      </motion.span>
                    ) : isHovering ? (
                      <motion.span
                        key="activate"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        INITIALIZE PROFILE
                      </motion.span>
                    ) : (
                      <motion.span
                        key="complete"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        COMPLETE REGISTRATION
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            )}
          </Box>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Already have an identity?{' '}
              <Link to="/login" style={{ color: '#4fc3f7', textDecoration: 'none' }}>
                Access the Nexus
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

export default Signup;