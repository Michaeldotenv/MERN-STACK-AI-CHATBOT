import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useChatStore = create(
  persist(
    (set, get) => ({
      // UI State
      inputValue: '',
      isLoading: false,
      darkMode: true,
      sidebarOpen: false,
      showEmojiPicker: false,

      // Chat Data
      messages: [],
      chatHistory: [],
      currentChatId: null,

      // Actions
      setInputValue: (val) => set({ inputValue: val }),
      setIsLoading: (val) => set({ isLoading: val }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setSidebarOpen: (val) => set({ sidebarOpen: val }),
      setShowEmojiPicker: (val) => set({ showEmojiPicker: val }),

      // Message Handling
      addMessage: (message) => {
        set((state) => {
          const newMessages = [...state.messages, message];
          let updatedHistory = [...state.chatHistory];
          
          // Update or create chat
          if (state.currentChatId) {
            updatedHistory = updatedHistory.map(chat => 
              chat.id === state.currentChatId 
                ? { ...chat, messages: newMessages, updatedAt: new Date().toISOString() }
                : chat
            );
          } else {
            const newChatId = Date.now().toString();
            updatedHistory = [
              {
                id: newChatId,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                messages: newMessages
              },
              ...updatedHistory
            ];
            set({ currentChatId: newChatId });
          }

          return { messages: newMessages, chatHistory: updatedHistory };
        });
      },

      // Chat Management
      startNewChat: () => {
        const newChatId = Date.now().toString();
        set({
          currentChatId: newChatId,
          messages: [],
          chatHistory: [
            {
              id: newChatId,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              messages: []
            },
            ...get().chatHistory
          ]
        });
      },

      selectChat: (chatId) => {
        const chat = get().chatHistory.find(c => c.id === chatId);
        if (chat) {
          set({
            currentChatId: chatId,
            messages: chat.messages
          });
        }
      },

      deleteChat: (chatId) => {
        set(state => {
          const updatedHistory = state.chatHistory.filter(c => c.id !== chatId);
          let newCurrentId = state.currentChatId;
          let newMessages = state.messages;

          if (state.currentChatId === chatId) {
            newCurrentId = updatedHistory[0]?.id || null;
            newMessages = updatedHistory[0]?.messages || [];
          }

          return {
            chatHistory: updatedHistory,
            currentChatId: newCurrentId,
            messages: newMessages
          };
        });
      },

      clearMessages: () => {
        set(state => ({
          messages: [],
          chatHistory: state.chatHistory.map(chat => 
            chat.id === state.currentChatId 
              ? { ...chat, messages: [] } 
              : chat
          )
        }));
      }
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({
        chatHistory: state.chatHistory,
        currentChatId: state.currentChatId,
        darkMode: state.darkMode
      })
    }
  )
);

export default useChatStore;