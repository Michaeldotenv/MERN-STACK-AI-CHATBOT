import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaBrain, FaLightbulb, FaRocket } from 'react-icons/fa';
import { GiArtificialIntelligence } from 'react-icons/gi';

const AuthDemoPage = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    {
      icon: <FaBrain size={48} />,
      title: "Deep Learning",
      description: "Our neural networks process information with human-like intuition"
    },
    {
      icon: <FaLightbulb size={48} />,
      title: "Creative Genius",
      description: "Generate ideas, stories, and solutions beyond human imagination"
    },
    {
      icon: <FaRocket size={48} />,
      title: "Lightning Fast",
      description: "Get responses in milliseconds without compromising quality"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #05101c 0%, #0a1a2f 100%)',
      color: '#e0f7fa',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Floating AI Particles Background */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            background: 'rgba(79, 195, 247, 0.3)',
            borderRadius: '50%',
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5
          }}
          initial={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 100],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
      ))}

      <Container maxWidth="lg" sx={{ py: 8, position: 'relative', zIndex: 1 }}>
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { md: '1fr 1fr', xs: '1fr' },
          gap: 6,
          alignItems: 'center',
          minHeight: '80vh'
        }}>
          {/* Left Column - Robot Showcase */}
          <Box sx={{ 
            position: 'relative',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Box sx={{
              width: { xs: 250, md: 350 },
              height: { xs: 250, md: 350 },
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(79,195,247,0.2) 0%, rgba(79,195,247,0) 70%)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}>
              {/* Replace with your robot image */}
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'mirror'
                }}
              >
                <FaRobot size={200} style={{ color: '#4fc3f7' }} />
              </motion.div>

              {/* Floating orbiting elements */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 450,
                  height: 450,
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                {[...Array(3)].map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: 80,
                      height: 80,
                      transform: `rotate(${i * 120}deg) translateX(200px) rotate(${i * -120}deg)`,
                      background: 'rgba(79, 195, 247, 0.1)',
                      borderRadius: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: 32
                    }}
                  >
                    <GiArtificialIntelligence />
                  </Box>
                ))}
              </motion.div>
            </Box>
          </Box>

          {/* Right Column - Feature Showcase */}
          <Box sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <Typography variant="h2" sx={{ 
              fontWeight: 800,
              mb: 2,
              background: 'linear-gradient(45deg, #4fc3f7, #00acc1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Meet NexusAI
            </Typography>
            
            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
              The most advanced conversational AI ever created
            </Typography>

            <AnimatePresence mode='wait'>
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Box sx={{ 
                  p: 4,
                  mb: 3,
                  background: 'rgba(10, 25, 41, 0.7)',
                  borderRadius: 4,
                  border: '1px solid rgba(79, 195, 247, 0.2)'
                }}>
                  <Box sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                    color: '#4fc3f7'
                  }}>
                    {features[activeFeature].icon}
                    <Typography variant="h5" sx={{ ml: 2 }}>
                      {features[activeFeature].title}
                    </Typography>
                  </Box>
                  <Typography>
                    {features[activeFeature].description}
                  </Typography>
                </Box>
              </motion.div>
            </AnimatePresence>

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              {features.map((_, index) => (
                <Button
                  key={index}
                  variant={activeFeature === index ? 'contained' : 'outlined'}
                  onClick={() => setActiveFeature(index)}
                  sx={{
                    minWidth: 0,
                    width: 12,
                    height: 12,
                    p: 0,
                    borderRadius: '50%',
                    borderColor: '#4fc3f7'
                  }}
                />
              ))}
            </Box>

            <a href='/signup'><Button
              variant="contained"
              size="large"
              endIcon={<FaRocket />}
              sx={{
                mt: 4,
                py: 2,
                px: 4,
                background: 'linear-gradient(45deg, #4fc3f7, #00acc1)',
                fontSize: '1.1rem',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 20px rgba(79, 195, 247, 0.3)'
                }
              }}
            >
              Launch Experience
            </Button></a>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AuthDemoPage;