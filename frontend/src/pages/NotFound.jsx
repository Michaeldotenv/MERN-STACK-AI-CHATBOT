// src/components/NotFound.jsx
import { Box, Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaRocket } from 'react-icons/fa';
import { GiSpinningBlades, GiArtificialIntelligence } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

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

      <Container maxWidth="sm" sx={{ zIndex: 2, textAlign: 'center' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              background: 'rgba(5, 16, 28, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 0, 0, 0.3)',
              borderRadius: '16px',
              p: 4,
              boxShadow: '0 0 30px rgba(255, 0, 0, 0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Error Plasma Ring */}
            <motion.div
              style={{
                position: 'absolute',
                width: '200%',
                height: '200%',
                borderRadius: '50%',
                border: '2px solid rgba(255,0,0,0.15)',
                top: '-50%',
                left: '-50%',
                zIndex: 0
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            />

            {/* Header */}
            <Box sx={{ mb: 4, zIndex: 2, position: 'relative' }}>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <FaExclamationTriangle size={80} style={{ color: '#ff4d4d' }} />
              </motion.div>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(45deg, #ff4d4d, #ff1a1a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mt: 2
                }}
              >
                ERROR 404
              </Typography>
              <Typography variant="h5" sx={{ mt: 2, color: '#ff9999' }}>
                Quantum Link Disrupted
              </Typography>
            </Box>

            {/* Content */}
            <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
              The neural pathway you requested cannot be accessed. The destination may have been 
              moved, deleted, or never existed in this reality.
            </Typography>

            <Typography variant="body2" sx={{ mb: 4, opacity: 0.7 }}>
              "Not all those who wander are lost, but you definitely are."
            </Typography>

            {/* Navigation Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => navigate('/')}
                variant="contained"
                startIcon={<FaRocket />}
                sx={{
                  background: 'linear-gradient(45deg, #4fc3f7, #00acc1)',
                  fontSize: '1.1rem',
                  py: 2,
                  px: 4,
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(79, 195, 247, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #4fc3f7, #00acc1)',
                    boxShadow: '0 6px 24px rgba(79, 195, 247, 0.4)'
                  }
                }}
              >
                Return to Nexus Core
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Container>

      {/* Floating Error Particles */}
      {[...Array(12)].map((_, i) => {
        const size = Math.random() * 8 + 2;
        return (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              background:
                'radial-gradient(circle, rgba(255,77,77,1) 0%, rgba(255,77,77,0) 70%)',
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

export default NotFound;