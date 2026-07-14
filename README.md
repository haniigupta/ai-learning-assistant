![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)
![Groq](https://img.shields.io/badge/Groq-LLM-orange)
![RAG](https://img.shields.io/badge/RAG-Enabled-purple)
![License](https://img.shields.io/badge/License-MIT-blue)

# 🧠 AI Learning Assistant

AI Learning Assistant is a full-stack MERN application that helps students learn from PDF documents using Retrieval-Augmented Generation (RAG).

The platform allows users to upload study materials and automatically generate AI-powered summaries, flashcards, quizzes, concept explanations, and document-based chat using semantic search and LLMs.

---

## ✨ Features

- 🔐 JWT Authentication
- 📄 PDF Upload & Processing
- 🧠 AI Summary Generation
- 🎴 Flashcard Generation
- ❓ Quiz Generation
- 💬 Document Chat
- 📚 Concept Explanation
- 🔍 Retrieval-Augmented Generation (RAG)
- 📈 Learning Progress Dashboard

---

## 🏗️ System Architecture

<p align="center">
  <img src="../AI-LearningAssistant/frontend/ai-learning-assistant/src/assets/architecture.svg" alt="System Architecture" width="1000"/>
</p>

---

## 🛠️ Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication

### AI Stack

- Groq LLM
- Google Gemini Embeddings
- Retrieval-Augmented Generation (RAG)
- Semantic Search

### Deployment

- Vercel
- Render
- MongoDB Atlas

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/haniigupta/ai-learning-assistant.git
cd ai-learning-assistant
```

## Backend

```bash
cd backend
npm install
npm run dev
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

### Backend

```env
PORT=8000

MONGODB_URI=

JWT_SECRET=

GROQ_API_KEY=

GEMINI_API_KEY=
```

### Frontend

```env
VITE_API_URL=http://localhost:8000/api
```

---

## 📄 License

MIT License