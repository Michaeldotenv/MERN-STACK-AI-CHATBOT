import { AppBar, Toolbar, Typography, IconButton, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { FiMessageSquare, FiMenu, FiSettings } from 'react-icons/fi';
import { FaRobot, FaBolt } from 'react-icons/fa';

const Header = () => {
  const theme = useTheme();

  // Framer Motion animations
  const fadeIn = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const pulse = {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity },
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: 'transparent', 
        boxShadow: 'none',
        backgroundImage: 'linear-gradient(to right, #05101c, #0a1a2f, #05101c)',
        padding: '0.5rem 0',
      }}
    >
      <Toolbar>
        {/* Left: Logo/Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <IconButton edge="start" color="inherit">
              <FaRobot style={{ fontSize: '2rem', color: '#4fc3f7' }} />
            </IconButton>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Typography 
              variant="h6" 
              sx={{ 
                ml: 2, 
                fontWeight: 700, 
                background: 'linear-gradient(45deg, #4fc3f7, #00acc1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              NexusAI
            </Typography>
          </motion.div>
        </Box>

        {/* Middle: Navigation (optional) */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
          <motion.div whileHover={{ scale: 1.1 }} variants={fadeIn}>
            <IconButton color="inherit">
              <FiMessageSquare style={{ color: '#e0f7fa', fontSize: '1.5rem' }} />
            </IconButton>
          </motion.div>
        </Box>

        {/* Right: Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <motion.div variants={fadeIn}>
            <IconButton color="inherit">
              <FaBolt style={{ color: '#ffeb3b', fontSize: '1.5rem' }} />
            </IconButton>
          </motion.div>

          <motion.div animate={pulse} variants={fadeIn}>
            <IconButton color="inherit">
              <FiSettings style={{ color: '#b3e5fc', fontSize: '1.5rem' }} />
            </IconButton>
          </motion.div>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;