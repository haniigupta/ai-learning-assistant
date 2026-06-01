![React](https://img.shields.io/badge/React-19-blue)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![Groq](https://img.shields.io/badge/Groq-LLM-orange)
![RAG](https://img.shields.io/badge/RAG-Enabled-purple)
![License](https://img.shields.io/badge/License-MIT-yellow)

# AI Learning Assistant

An AI-powered learning platform that helps students learn from their study materials by generating summaries, flashcards, quizzes, and document-based answers using Retrieval-Augmented Generation (RAG).

## Live Demo

Frontend: https://ai-learning-assistant-kohl-iota.vercel.app

## Features

### Authentication

* Secure user registration and login
* JWT-based authentication
* Protected routes

### Document Management

* Upload PDF documents
* Automatic text extraction
* Intelligent document chunking
* Document history and management

### AI-Powered Learning

* Generate concise document summaries
* Create educational flashcards automatically
* Generate multiple-choice quizzes
* Explain concepts from uploaded documents
* Ask questions and chat with documents

### Retrieval-Augmented Generation (RAG)

* Document chunking pipeline
* Vector embeddings for semantic search
* Context-aware document retrieval
* AI responses grounded in uploaded content

### Progress Tracking

* Track generated learning resources
* Monitor study activity
* Manage learning sessions efficiently

---

## Tech Stack

### Frontend

* React.js
* React Router
* Axios
* Tailwind CSS
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

### AI & RAG

* Groq API (LLM Generation)
* Google Gemini Embeddings
* Vector Similarity Search
* Retrieval-Augmented Generation (RAG)

### Deployment

* Vercel (Frontend)
* Render (Backend)
* MongoDB Atlas

---

## System Architecture

User Uploads Document
↓
PDF Text Extraction
↓
Text Chunking
↓
Generate Embeddings
↓
Store Chunks + Vectors
↓
Semantic Retrieval
↓
Relevant Context Selection
↓
Groq LLM
↓
Summary / Flashcards / Quiz / Chat Response

---

## Installation

### Clone Repository

```bash
git clone https://github.com/haniigupta/ai-learning-assistant.git
cd ai-learning-assistant
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=8000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GROQ_API_KEY=your_groq_api_key

GEMINI_API_KEY=your_gemini_api_key
```

Start Backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8000/api
```

Start Frontend:

```bash
npm run dev
```

---

## Key Features Implemented

### AI Summary Generation

Generate concise summaries from uploaded study materials.

### Flashcard Generation

Automatically create question-answer flashcards for revision.

### Quiz Generation

Generate multiple-choice quizzes from document content.

### Document Q&A

Ask questions about uploaded documents and receive context-aware answers.

### Concept Explanation

Get simplified explanations of concepts extracted from study materials.

---

## Future Improvements

* Multi-document search
* Cloud storage integration (AWS S3 / Cloudinary)
* Study analytics dashboard
* Spaced repetition flashcards
* OCR support for scanned PDFs
* Voice-based learning assistant

---

## Author

Hani Gupta

GitHub: https://github.com/haniigupta

LinkedIn: https://www.linkedin.com/in/hani-gupta-3916b931b/

---

## License

This project is licensed under the MIT License.
