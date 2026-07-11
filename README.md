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

```
AI-LearningAssistant
├─ backend
│  ├─ .env
│  ├─ config
│  │  ├─ db.js
│  │  └─ multer.js
│  ├─ controllers
│  │  ├─ aiController.js
│  │  ├─ authController.js
│  │  ├─ documentController.js
│  │  ├─ flashcardController.js
│  │  ├─ progressController.js
│  │  └─ quizController.js
│  ├─ middleware
│  │  ├─ auth.js
│  │  └─ errorHandler.js
│  ├─ models
│  │  ├─ ChatHistory.js
│  │  ├─ Document.js
│  │  ├─ Flashcard.js
│  │  ├─ Quiz.js
│  │  └─ User.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ prompts
│  │  ├─ chatPrompt.js
│  │  ├─ conceptPrompt.js
│  │  ├─ flashcardPrompt.js
│  │  ├─ quizPrompt.js
│  │  └─ summaryPrompt.js
│  ├─ routes
│  │  ├─ aiRoutes.js
│  │  ├─ authRoutes.js
│  │  ├─ documentRoutes.js
│  │  ├─ flashcardRoutes.js
│  │  ├─ progressRoutes.js
│  │  └─ quizRoutes.js
│  ├─ server.js
│  ├─ services
│  │  ├─ ai
│  │  │  ├─ aiService.js
│  │  │  ├─ llmRouter.js
│  │  │  ├─ promptBuilder.js
│  │  │  └─ streamService.js
│  │  ├─ chat
│  │  │  └─ chatHistory.js
│  │  ├─ parsers
│  │  │  ├─ flashcardParser.js
│  │  │  ├─ markdownParser.js
│  │  │  └─ quizParser.js
│  │  └─ rag
│  │     ├─ citationService.js
│  │     ├─ embeddingService.js
│  │     └─ retrievalService.js
│  ├─ uploads
│  │  └─ documents
│  │     ├─ 1779807966628-835362187-Generative AI for Business.pdf
│  │     ├─ 1779808946785-840170557-Generative AI for Business.pdf
│  │     ├─ 1779875163355-911259212-Generative AI for Business.pdf
│  │     ├─ 1779876143842-695311515-DMnotes10thMay.pdf
│  │     ├─ 1779888452854-738310398-DMnotes10thMay.pdf
│  │     ├─ 1780066799410-717304442-scholar.pdf
│  │     ├─ 1780131027212-134764773-Cell Cycle and cell division .pdf
│  │     ├─ 1780140681299-226012040-file-sample_150kB.pdf
│  │     ├─ 1780217108394-166458867-CSL-3207 Assignment.pdf
│  │     ├─ 1780219015975-284580112-CSL-3207 Assignment.pdf
│  │     ├─ 1780219329996-933209925-CSL-3207 Assignment.pdf
│  │     ├─ 1780219792233-673288072-DMnotes10thMay.pdf
│  │     ├─ 1780226789326-489837589-DMnotes10thMay.pdf
│  │     └─ 1780227010321-419443635-DMnotes10thMay.pdf
│  └─ utils
│     ├─ embeddingService.js
│     ├─ geminiService.js
│     ├─ pdfParser.js
│     ├─ textChunker.js
│     └─ vectorSearch.js
├─ backend-tree.txt
├─ frontend
│  ├─ ai-learning-assistant
│  │  ├─ .vite
│  │  │  └─ deps
│  │  │     ├─ package.json
│  │  │     └─ _metadata.json
│  │  ├─ dist
│  │  │  ├─ assets
│  │  │  │  ├─ brain-circuit-W6UeXbxu.png
│  │  │  │  ├─ index-CMpUwJFT.js
│  │  │  │  └─ index-PfzOy9tX.css
│  │  │  ├─ brain-circuit.png
│  │  │  ├─ brain-circuit.svg
│  │  │  └─ index.html
│  │  ├─ eslint.config.js
│  │  ├─ frontend-tree.txt
│  │  ├─ index.html
│  │  ├─ package-lock.json
│  │  ├─ package.json
│  │  ├─ public
│  │  │  ├─ brain-circuit.png
│  │  │  └─ brain-circuit.svg
│  │  ├─ README.md
│  │  ├─ src
│  │  │  ├─ App.jsx
│  │  │  ├─ assets
│  │  │  │  └─ react.svg
│  │  │  ├─ components
│  │  │  │  ├─ auth
│  │  │  │  │  └─ ProtectedRoute.jsx
│  │  │  │  ├─ chat
│  │  │  │  │  ├─ ChatInput.jsx
│  │  │  │  │  ├─ ChatMessage.jsx
│  │  │  │  │  └─ ChatWindow.jsx
│  │  │  │  ├─ common
│  │  │  │  │  ├─ Button.jsx
│  │  │  │  │  └─ Spinner.jsx
│  │  │  │  ├─ documents
│  │  │  │  │  └─ DocumentCard.jsx
│  │  │  │  ├─ landing
│  │  │  │  │  ├─ FAQ.jsx
│  │  │  │  │  ├─ Feature.jsx
│  │  │  │  │  ├─ Footer.jsx
│  │  │  │  │  ├─ Hero.jsx
│  │  │  │  │  ├─ HowItWork.jsx
│  │  │  │  │  └─ Navbar.jsx
│  │  │  │  ├─ layout
│  │  │  │  │  ├─ AppLayout.jsx
│  │  │  │  │  ├─ Header.jsx
│  │  │  │  │  └─ Sidebar.jsx
│  │  │  │  └─ quizzes
│  │  │  ├─ context
│  │  │  │  ├─ AuthContext.jsx
│  │  │  │  └─ ThemeContext.jsx
│  │  │  ├─ index.css
│  │  │  ├─ main.jsx
│  │  │  ├─ pages
│  │  │  │  ├─ Auth
│  │  │  │  │  ├─ LoginPage.jsx
│  │  │  │  │  └─ RegisterPage.jsx
│  │  │  │  ├─ Dashboard
│  │  │  │  │  └─ DashboardPage.jsx
│  │  │  │  ├─ Documents
│  │  │  │  │  ├─ DocumentDetailPage.jsx
│  │  │  │  │  └─ DocumentListPage.jsx
│  │  │  │  ├─ Flashcards
│  │  │  │  │  ├─ FlashcardListPage.jsx
│  │  │  │  │  └─ FlashcardPage.jsx
│  │  │  │  ├─ Landing
│  │  │  │  │  └─ LandingPage.jsx
│  │  │  │  ├─ NotFoundPage.jsx
│  │  │  │  ├─ Profile
│  │  │  │  │  └─ ProfilePage.jsx
│  │  │  │  └─ Quizzes
│  │  │  │     ├─ QuizListPage.jsx
│  │  │  │     ├─ QuizResultPage.jsx
│  │  │  │     └─ QuizTakePage.jsx
│  │  │  ├─ services
│  │  │  │  ├─ aiService.js
│  │  │  │  ├─ authService.js
│  │  │  │  ├─ documentService.js
│  │  │  │  ├─ flashcardService.js
│  │  │  │  ├─ progressService.js
│  │  │  │  └─ quizService.js
│  │  │  └─ utils
│  │  │     ├─ apiPath.js
│  │  │     └─ axiosInstance.js
│  │  ├─ src-tree.txt
│  │  ├─ vercel.json
│  │  └─ vite.config.js
│  ├─ extra
│  └─ package-lock.json
├─ frontend-tree.txt
└─ README.md

```