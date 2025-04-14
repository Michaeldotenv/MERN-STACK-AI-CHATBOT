import { useState } from 'react';
import { Box, Container, Typography, Button, Paper, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { FaSignOutAlt, FaRobot } from 'react-icons/fa';
import { useAuthStore } from '../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user, signout } = useAuthStore();
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  const handleSignout = async () => {
    try {
      await signout();
      navigate('/signin');
    } catch (error) {
      console.error('Signout error:', error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #05101c 0%, #0a1a2f 100%)',
        color: '#e0f7fa',
        padding: 4
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 4
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <motion.div
              animate={{ rotate: [0, 10, 0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <FaRobot size={40} style={{ color: '#4fc3f7' }} />
            </motion.div>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #4fc3f7, #00acc1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              NEXUS DASHBOARD
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar 
                sx={{ 
                  background: 'linear-gradient(45deg, #4fc3f7, #00acc1)',
                  border: '2px solid rgba(255,255,255,0.2)'
                }}
              >
                {user?.name?.charAt(0) || 'U'}
              </Avatar>
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  {user?.name || 'User'}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  {user?.email || 'user@example.com'}
                </Typography>
              </Box>
            </Box>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
            >
              <Button
                onClick={handleSignout}
                variant="outlined"
                startIcon={<FaSignOutAlt />}
                sx={{
                  borderColor: '#4fc3f7',
                  color: '#4fc3f7',
                  '&:hover': {
                    background: 'rgba(79, 195, 247, 0.1)',
                    borderColor: '#4fc3f7'
                  }
                }}
              >
                {isHovering ? 'Disconnect' : 'Sign Out'}
              </Button>
            </motion.div>
          </Box>
        </Box>
        
        {/* Main Content */}
        <Paper
          elevation={0}
          sx={{
            background: 'rgba(5, 16, 28, 0.7)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(79, 195, 247, 0.3)',
            borderRadius: '16px',
            p: 4,
            mb: 4,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Plasma Ring */}
          <Box
            sx={{
              position: 'absolute',
              width: '200%',
              height: '200%',
              borderRadius: '50%',
              border: '2px solid rgba(79,195,247,0.05)',
              top: '-50%',
              left: '-50%',
              zIndex: 0
            }}
          />
          
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#4fc3f7' }}>
              Welcome to the Nexus Network
            </Typography>
            <Typography variant="body1" paragraph>
              You have successfully authenticated. This is a secure area of the application where you can access your personal data and services.
            </Typography>
            <Typography variant="body1">
              Your neural identity is now synchronized with the Nexus core systems. 
              Advanced AI assistance and personalized recommendations will be available soon.
            </Typography>

            {/* Start Your Journey Button */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mt: 4
            }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  onClick={() => navigate('/chats')}
                  variant="contained"
                  size="large"
                  sx={{
                    background: 'linear-gradient(45deg, #4fc3f7, #00acc1)',
                    color: '#05101c',
                    fontWeight: 'bold',
                    px: 4,
                    py: 1.5,
                    borderRadius: '8px',
                    fontSize: '1rem',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #00acc1, #4fc3f7)',
                      boxShadow: '0 0 15px rgba(79, 195, 247, 0.5)'
                    }
                  }}
                >
                  Start Your Journey
                </Button>
              </motion.div>
            </Box>
          </Box>
        </Paper>
        
        {/* Status Grid */}
        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3
          }}
        >
          {['System Status', 'Neural Synchronization', 'Security Level'].map((item, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                background: 'rgba(5, 16, 28, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(79, 195, 247, 0.3)',
                borderRadius: '16px',
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: '#4fc3f7' }}>
                {item}
              </Typography>
              <Typography variant="body1" align="center" sx={{ opacity: 0.8 }}>
                {index === 0 ? 'All systems operational' : 
                 index === 1 ? '100% synchronized' : 
                 'Maximum clearance granted'}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;