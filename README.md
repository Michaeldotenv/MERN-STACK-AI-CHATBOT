
# 🤖 MERN AI Chatbot with OpenAI & Hugging Face

[![Deployed on Render]

A full-stack AI-powered chatbot featuring **dual-model integration** (OpenAI GPT + Hugging Face), JWT authentication, and real-time conversation history. Built with the MERN stack and modern tooling.


## 🌟 Features

- **Dual AI Engine** - Switch between OpenAI GPT-3.5 and Hugging Face models
- **Secure Auth** - JWT authentication with cookie sessions
- **Real-Time Chat** - WebSocket or REST API messaging
- **Material UI** - Beautiful, responsive interface with dark mode
- **Zustand** - Lightweight global state management
- **Conversation History** - MongoDB-backed chat persistence

## 🛠 Tech Stack

| Layer          | Technologies                          |
|----------------|---------------------------------------|
| **Frontend**   | React, Material UI, Zustand, Axios    |
| **Backend**    | Node.js, Express, MongoDB             |
| **AI**         | OpenAI API, Hugging Face Inference    |
| **Auth**       | JWT, bcrypt, cookie-session           |
| **DevOps**     | Render (Backend), Vercel (Frontend)   |

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- MongoDB Atlas URI
- [OpenAI API Key](https://platform.openai.com/api-keys)
- [Hugging Face Token](https://huggingface.co/settings/tokens)

### Local Development
```bash
# 1. Clone repo
git clone https://github.com/Michaeldotenv/MERN-STACK-AI-CHATBOT.git
cd mern-ai-chatbot

# 2. Setup backend
cd backend
cp .env.example .env  # Add your keys
npm install
npm start  # Runs on http://localhost:5000

# 3. Setup frontend (new terminal)
cd ../frontend
cp .env.example .env  # Set REACT_APP_API_URL
npm install
npm start  # Opens http://localhost:3000
```

## 🌐 Deployment

### Backend (Render)
1. Create new **Web Service** on [Render](https://render.com)
2. Set environment variables:
   ```env
   MONGO_URI=your_mongodb_uri
   OPENAI_API_KEY=sk-your-key
   JWT_SECRET=your_secret
   ```
3. Deploy!

### Frontend (Vercel)
1. Import Git repo to [Vercel](https://vercel.com)
2. Set `REACT_APP_API_URL` to your Render backend URL
3. Deploy!

## 📂 Project Structure

```
mern-ai-chatbot/
├── backend/
│   ├── controllers/    # Route handlers
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API endpoints
│   └── server.js       # Express setup
├── frontend/
│   ├── src/
│   │   ├── components/ # React UI
│   │   ├── stores/     # Zustand state
│   │   └── App.js      # Main component
└── .env.example        # Environment template
```

## 🔍 Learn More

- [Architecture Decision Record](docs/ARCHITECTURE.md)
- [API Documentation](docs/API.md)
- [Contributing Guide](CONTRIBUTING.md)

## 📜 License

MIT © [Tubokeyi Micheal] - See [LICENSE](LICENSE) for details.
```
Key Features:
1. **Visual Appeal** - Badges, emojis, and clear section headers
2. **Complete Onboarding** - From local setup to production deployment
3. **Modular Structure** - Easy to navigate project layout
4. **Future-Proof** - Includes docs links for scaling

