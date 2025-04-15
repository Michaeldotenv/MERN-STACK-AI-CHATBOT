import useChatStore from '../stores/useChatStore.js';
import { useRef, useEffect, useState } from 'react';
import { 
  Box, TextField, IconButton, Paper, Typography, Drawer, 
  List, ListItem, ListItemText, ListItemIcon, Divider, 
  ThemeProvider, createTheme, CssBaseline, CircularProgress,
  Button, Avatar, Tooltip
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPaperPlane, FaPlus, FaHistory, FaSignOutAlt, 
  FaTrash, FaEllipsisV, FaUser
} from 'react-icons/fa';
import { BsEmojiSmile, BsMoonFill, BsSunFill, BsChatLeftText } from 'react-icons/bs';
import EmojiPicker from 'emoji-picker-react';
import { useAuthStore } from '../stores/useAuthStore.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = "https://nexus-chatbot-ai.onrender.com/api/chat" || 'http://localhost:5000/api/chat'; // Your backend endpoint
const Chat = () => {
const {user} = useAuthStore()
const {signout} = useAuthStore()

const handleSignout = async ()=> {
 try {
   await signout();
       // No need for navigate here since signout function handles redirection
     } catch (error) {
       console.error('Signout error:', error);
       setIsSigningOut(false); // Reset state if error occurs
     }
}
  const {
    messages,
    isLoading,
    darkMode,
    sidebarOpen,
    inputValue,
    showEmojiPicker,
    chatHistory = [], // Default to empty array if undefined
    currentChatId,
    addMessage,
    setIsLoading,
    toggleDarkMode,
    setSidebarOpen,
    setInputValue,
    setShowEmojiPicker,
    clearMessages,
    startNewChat,
    selectChat,
    deleteChat,
  } = useChatStore();

  const messagesEndRef = useRef(null);

  // Theme
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#10a37f' }, // ChatGPT green
      secondary: { main: '#8e8ea0' },
      background: {
        default: '#343541',
        paper: '#444654',
        sidebar: '#202123',
      },
      text: {
        primary: '#ffffff',
        secondary: '#c5c5d2',
      },
    },
    typography: {
      fontFamily: "'Söhne', 'Helvetica Neue', sans-serif",
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '4px',
          },
        },
      },
    },
  });

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Start new chat if none exists
  useEffect(() => {
    if (chatHistory.length === 0 && !currentChatId) {
      startNewChat();
    }
  }, [chatHistory, currentChatId, startNewChat]);

  // Message Handling
  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      createdAt: new Date().toISOString()
    };
    
    addMessage(userMessage);
    setIsLoading(true);
    setInputValue('');
    setShowEmojiPicker(false);

    try {
      const response = await axios.post(API_URL, {
        messages: [...messages, userMessage].map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      });

      addMessage({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.response,
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      addMessage({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        createdAt: new Date().toISOString()
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiClick = (emojiData) => {
    setInputValue(inputValue + emojiData.emoji);
  };

  // Format timestamp for chat history
  const formatChatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get chat title from first message or use default
  const getChatTitle = (chat) => {
    if (!chat) return 'New conversation';
    
    if (chat.messages && chat.messages.length > 0) {
      const firstUserMsg = chat.messages.find(m => m.role === 'user');
      if (firstUserMsg) {
        const title = firstUserMsg.content.substring(0, 28);
        return title.length < firstUserMsg.content.length 
          ? `${title}...` 
          : title;
      }
    }
    return 'New conversation';
  };

  // Find current chat from history
  const currentChat = chatHistory.find(chat => chat.id === currentChatId);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        height: '100vh',
        backgroundColor: '#343541',
      }}>
        {/* Sidebar (fixed position) */}
        <Box
          sx={{
            width: 260,
            height: '100%',
            bgcolor: ' #05101c',
            display: { xs: sidebarOpen ? 'flex' : 'none', md: 'flex' },
            flexDirection: 'column',
            borderRight: '1px solid rgba(255,255,255,0.1)',
            zIndex: 10,
            position: { xs: 'fixed', md: 'relative' },
          }}
        >
          {/* New Chat Button */}
          <Box sx={{ p: 2 }}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<FaPlus />}
              onClick={() => startNewChat()}
              sx={{
                justifyContent: 'flex-start',
                color: 'text.primary',
                borderColor: 'rgba(255,255,255,0.2)',
                borderRadius: '6px',
                py: 1,
                '&:hover': {
                  backgroundColor: ' #05101c',
                  borderColor: 'rgba(255,255,255,0.3)',
                }
              }}
            >
              New chat
            </Button>
          </Box>

          {/* Chat History */}
          <Box sx={{ flex: 1, overflowY: 'auto', px: 1 }}>
            <Typography 
              variant="overline" 
              sx={{ px: 2, py: 1, display: 'block', color: 'text.secondary', fontSize: '0.7rem' }}
            >
              Chat History
            </Typography>
            <List>
              {chatHistory.map((chat) => (
                <ListItem
                  key={chat.id}
                  button
                  selected={chat.id === currentChatId}
                  onClick={() => selectChat(chat.id)}
                  sx={{
                    borderRadius: '6px',
                    mb: 0.5,
                    '&.Mui-selected': {
                      backgroundColor: ' #05101c',
                    },
                    '&:hover': {
                      backgroundColor: ' #05101c',
                    },
                    '&:hover .chat-actions': {
                      opacity: 1,
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                    <BsChatLeftText />
                  </ListItemIcon>
                  <ListItemText 
                    primary={getChatTitle(chat)}
                    secondary={formatChatDate(chat.createdAt)}
                    primaryTypographyProps={{
                      noWrap: true,
                      fontSize: '0.875rem',
                    }}
                    secondaryTypographyProps={{
                      noWrap: true,
                      fontSize: '0.75rem',
                    }}
                  />
                  <Box 
                    className="chat-actions"
                    sx={{ 
                      opacity: 0, 
                      transition: 'opacity 0.2s',
                    }}
                  >
                    <IconButton 
                      size="small" 
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChat(chat.id);
                      }}
                      sx={{ color: 'text.secondary' }}
                    >
                      <FaTrash size={14} />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* User Section */}
          <Box 
            sx={{ 
              p: 2, 
              borderTop: '1px solid #05101c',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32, 
                bgcolor: 'primary.main' 
              }}
            >
           <FaUser size={16} />
            </Avatar>
        
           <>{user?.name}</>
            <Typography variant="body2" sx={{ flex: 1, fontWeight: 500 }}>
            </Typography>
            <Tooltip title="Toggle theme">
              <IconButton onClick={toggleDarkMode} size="small" sx={{ color: 'text.secondary' }}>
                {darkMode ? <BsSunFill /> : <BsMoonFill />}
             </IconButton>
            </Tooltip>
            <Tooltip title="Sign out">
              <IconButton 
              size="small" 
              sx={{ color: 'text.secondary' }}
              onClick={handleSignout}
              >
                <FaSignOutAlt />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Mobile Sidebar Drawer */}
        <Drawer
          anchor="left"
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          variant="temporary"
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: 260,
              backgroundColor: 'background.sidebar',
            }
          }}
        >
          {/* Same content as sidebar */}
          <Box sx={{ p: 2 }}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<FaPlus />}
              onClick={() => {
                startNewChat();
                setSidebarOpen(false);
              }}
              sx={{
                justifyContent: 'flex-start',
                color: 'text.primary',
                borderColor: 'rgba(255,255,255,0.2)',
                borderRadius: '6px',
                py: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(255,255,255,0.3)',
                }
              }}
            >
              New chat
            </Button>
          </Box>

          <Box sx={{ flex: 1, overflowY: 'auto', px: 1 }}>
            <Typography 
              variant="overline" 
              sx={{ px: 2, py: 1, display: 'block', color: 'text.secondary', fontSize: '0.7rem' }}
            >
              Chat History
            </Typography>
            <List>
              {chatHistory.map((chat) => (
                <ListItem
                  key={chat.id}
                  button
                  selected={chat.id === currentChatId}
                  onClick={() => {
                    selectChat(chat.id);
                    setSidebarOpen(false);
                  }}
                  sx={{
                    borderRadius: '6px',
                    mb: 0.5,
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.05)',
                    },
                    '&:hover .chat-actions': {
                      opacity: 1,
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                    <BsChatLeftText />
                  </ListItemIcon>
                  <ListItemText 
                    primary={getChatTitle(chat)}
                    secondary={formatChatDate(chat.createdAt)}
                    primaryTypographyProps={{
                      noWrap: true,
                      fontSize: '0.875rem',
                    }}
                    secondaryTypographyProps={{
                      noWrap: true,
                      fontSize: '0.75rem',
                    }}
                  />
                  <Box 
                    className="chat-actions"
                    sx={{ 
                      opacity: 0, 
                      transition: 'opacity 0.2s',
                    }}
                  >
                    <IconButton 
                      size="small" 
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChat(chat.id);
                      }}
                      sx={{ color: 'text.secondary' }}
                    >
                      <FaTrash size={14} />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box 
            sx={{ 
              p: 2, 
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32, 
                bgcolor: 'primary.main' 
              }}
            >
              <FaUser size={16} />
            </Avatar>
            <Typography variant="body2" sx={{ flex: 1, fontWeight: 500 }}>
              
            </Typography>
            <Tooltip title="Toggle theme">
              <IconButton onClick={toggleDarkMode} size="small" sx={{ color: 'text.secondary' }}>
                {darkMode ? <BsSunFill /> : <BsMoonFill />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Sign out">
              <IconButton size="small" sx={{ color: 'text.secondary' }}>
                <FaSignOutAlt />
              </IconButton>
            </Tooltip>
          </Box>
        </Drawer>

        {/* Main Chat Area */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Mobile App Bar (visible only on mobile) */}
          <Box 
            sx={{ 
              p: 2, 
              display: { xs: 'flex', md: 'none' }, 
              alignItems: 'center',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              backgroundColor: ' #05101c'
            }}
          >
            <IconButton onClick={() => setSidebarOpen(true)} sx={{ color: 'text.secondary' }}>
              <FaHistory />
            </IconButton>
            <Typography variant="subtitle1" sx={{ flex: 1, ml: 2 }}>
              {getChatTitle(currentChat)}
            </Typography>
            <IconButton onClick={() => startNewChat()} sx={{ color: 'text.secondary' }}>
              <FaPlus />
            </IconButton>
          </Box>

          {/* Messages Container */}
          <Box 
            sx={{ 
              flex: 1, 
              overflowY: 'auto', 
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              px: { xs: 2, sm: 4, md: 10, lg: 20 },
              py: 4,
            }}
          >
            {messages.length === 0 && (
              <Box sx={{ textAlign: 'center', mt: 10 }}>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
                    Nexus AI
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  How can I help you today?
                </Typography>
              </Box>
            )}
            
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    sx={{
                      py: 4,
                      px: { xs: 2, sm: 4 },
                      backgroundColor: message.role === 'user' ? 'transparent' : ' #05101c',
                      display: 'flex',
                      width: '100%',
                    }}
                  >
                    <Box sx={{ mr: 2, mt: 0.5 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: message.role === 'user' ? 'primary.main' : ' #05101c',
                          width: 36,
                          height: 36,
                        }}
                      >
                        {message.role === 'user' ? <FaUser size={16} /> : <BsChatLeftText size={16} />}
                      </Avatar>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          whiteSpace: 'pre-wrap',
                          lineHeight: 1.6,
                        }}
                      >
                        {message.content}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              ))}
              {isLoading && (
                <Box sx={{ py: 4, px: { xs: 2, sm: 4, md: 6 }, display: 'flex', backgroundColor: ' #05101c' }}>
                  <Box sx={{ mr: 2, mt: 0.5 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: 'background.default',
                        width: 36,
                        height: 36,
                      }}
                    >
                      <BsChatLeftText size={16} />
                    </Avatar>
                  </Box>
                  <CircularProgress size={20} sx={{ color: '#10a37f' }} />
                </Box>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </Box>

          {/* Input Area */}
          <Box 
            sx={{ 
              p: 2, 
              position: 'relative',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: 'column',
              px: { xs: 2, sm: 4, md: 10, lg: 20 },
              pb: { xs: 4, sm: 6 }
            }}
          >
            {showEmojiPicker && (
              <Box sx={{ position: 'absolute', bottom: '100%', left: { xs: 2, sm: 4, md: 10, lg: 20 } }}>
                <EmojiPicker 
                  onEmojiClick={handleEmojiClick} 
                  width={300} 
                  height={350}
                />
              </Box>
            )}
            <Paper
              elevation={3}
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                borderRadius: '8px',
                backgroundColor: ' #05101c',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <IconButton 
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                size="small"
                sx={{ color: 'text.secondary', mx: 0.5 }}
              >
                <BsEmojiSmile />
              </IconButton>
              
              <TextField
                fullWidth
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message the assistant..."
                multiline
                maxRows={8}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
                sx={{
                  mx: 1,
                  '& .MuiInputBase-root': {
                    fontSize: '0.9rem',
                    padding: 1,
                  }
                }}
              />
              
              <IconButton 
                onClick={handleSend} 
                disabled={!inputValue.trim() || isLoading}
                sx={{ 
                  color: inputValue.trim() && !isLoading ? 'primary.main' : 'text.secondary',
                  opacity: inputValue.trim() && !isLoading ? 1 : 0.5,
                  mx: 0.5
                }}
              >
                <FaPaperPlane />
              </IconButton>
            </Paper>
            
            <Typography 
              variant="caption" 
              align="center" 
              sx={{ mt: 2, color: 'text.secondary', fontSize: '0.7rem' }}
            >
              Nexus can make mistakes. Consider checking important information.
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Chat;