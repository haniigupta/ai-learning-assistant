import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import {
  FileText,
  BrainCircuit,
  BookOpen,
  ClipboardList,
  ArrowLeft,
  Loader2,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

import Spinner from '../../components/common/Spinner';

import documentService from '../../services/documentService';
import aiService from '../../services/aiService';
import ChatWindow from '../../components/chat/ChatWindow';
import ChatInput from '../../components/chat/ChatInput';
import ChatMessage from '../../components/chat/ChatMessage';

const DocumentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);

  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const [summary, setSummary] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);

  const [flashcardLoading, setFlashcardLoading] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);

  const fetchDocument = async () => {
    try {
      const response = await documentService.getDocumentById(id);

      setDocument(response.data);
    } catch (error) {
      toast.error('Failed to load document');
      navigate('/documents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocument();

    const loadChatHistory = async () => {

      try {

        const history =
          await aiService.getChatHistory(id);

        setMessages(history?.data || []);

      } catch (error) {

        console.error(error);

      }
    };

    loadChatHistory();

  }, [id]);

  const handleGenerateSummary = async () => {
    try {
      setSummaryLoading(true);

      const result = await aiService.generateSummary(id);

      setSummary(result.summary || result);

      toast.success('Summary generated');
    } catch (error) {
      toast.error(error.message || 'Failed to generate summary');
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleGenerateFlashcards = async () => {
    try {
      setFlashcardLoading(true);

      await aiService.generateFlashcards(id, {
        count: 10
      });

      toast.success('Flashcards generated');

      navigate('/flashcards');
    } catch (error) {
      toast.error(error.message || 'Failed to generate flashcards');
    } finally {
      setFlashcardLoading(false);
    }
  };

  const handleGenerateQuiz = async () => {
    try {
      setQuizLoading(true);

      await aiService.generateQuiz(id, {
        numQuestions: 10
      });

      toast.success('Quiz generated');
    } catch (error) {
      toast.error(error.message || 'Failed to generate quiz');
    } finally {
      setQuizLoading(false);
    }
  };

  const handleSendMessage = async () => {

    if (!question.trim()) return;

    const currentQuestion = question.trim();

    const userMessage = {
      role: 'user',
      content: currentQuestion
    };

    setMessages(prev => [...prev, userMessage]);

    setQuestion('');

    try {

      setChatLoading(true);

      const response = await aiService.chat(
        id,
        currentQuestion
      );

      const aiMessage = {
        role: 'assistant',
        content:
          response?.data?.response ||
          'No response received'
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {

      console.error(error);

      toast.error(
        error?.message ||
        'Failed to send message'
      );

    } finally {

      setChatLoading(false);

    }
  };



  if (loading) {
    return (

      <Spinner />

    );
  }

  if (!document) {
    return (

      <div className="text-center py-10">
        Document not found
      </div>

    );
  }

  const statusConfig = {
    ready: {
      color: 'text-green-600',
      bg: 'bg-green-100',
      icon: CheckCircle
    },
    processing: {
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
      icon: Clock
    },
    failed: {
      color: 'text-red-600',
      bg: 'bg-red-100',
      icon: AlertCircle
    }
  };

  const currentStatus =
    statusConfig[document.status] ||
    statusConfig.processing;

  const StatusIcon = currentStatus.icon;

  return (

    <div className="max-w-7xl mx-auto space-y-8">

      {/* Back Button */}

      <button
        onClick={() => navigate('/documents')}
        className="flex items-center gap-2 text-gray-600 hover:text-black transition"
      >
        <ArrowLeft size={18} />
        Back to Documents
      </button>

      {/* Header */}

      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>

            <div className="flex items-center gap-4 mb-4">

              <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center">

                <FileText className="text-white" />

              </div>

              <div>

                <h1 className="text-3xl font-bold text-gray-900">

                  {document.title}

                </h1>

                <p className="text-gray-500 mt-1">
                  {document.fileName}
                </p>

              </div>

            </div>

            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${currentStatus.bg}`}
            >
              <StatusIcon
                size={16}
                className={currentStatus.color}
              />

              <span
                className={`font-medium capitalize ${currentStatus.color}`}
              >
                {document.status}
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <p className="text-gray-500 text-sm">
            File Size
          </p>
          <h2 className="text-2xl font-bold mt-2">
            {(document.fileSize / 1024).toFixed(1)} KB
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <p className="text-gray-500 text-sm">
            Flashcards
          </p>
          <h2 className="text-2xl font-bold mt-2">
            {document.flashcardCount || 0}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <p className="text-gray-500 text-sm">
            Quizzes
          </p>
          <h2 className="text-2xl font-bold mt-2">
            {document.quizCount || 0}
          </h2>
        </div>

      </div>

      {/* Actions */}

      <div className="grid md:grid-cols-3 gap-6">

        <button
          onClick={handleGenerateSummary}
          disabled={summaryLoading}
          className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-emerald-400 hover:shadow-md transition"
        >
          <BrainCircuit className="mx-auto mb-4 text-emerald-500" />

          <h3 className="font-semibold">
            Generate Summary
          </h3>

          {summaryLoading && (
            <Loader2 className="animate-spin mx-auto mt-3" />
          )}
        </button>

        <button
          onClick={handleGenerateFlashcards}
          disabled={flashcardLoading}
          className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-400 hover:shadow-md transition"
        >
          <BookOpen className="mx-auto mb-4 text-blue-500" />

          <h3 className="font-semibold">
            Generate Flashcards
          </h3>

          {flashcardLoading && (
            <Loader2 className="animate-spin mx-auto mt-3" />
          )}
        </button>

        <button
          onClick={handleGenerateQuiz}
          disabled={quizLoading}
          className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-purple-400 hover:shadow-md transition"
        >
          <ClipboardList className="mx-auto mb-4 text-purple-500" />

          <h3 className="font-semibold">
            Generate Quiz
          </h3>

          {quizLoading && (
            <Loader2 className="animate-spin mx-auto mt-3" />
          )}
        </button>

      </div>

      {/* Summary */}

      <div className="bg-white border border-gray-200 rounded-3xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          AI Summary
        </h2>

        {!summary ? (
          <div className="text-gray-500">
            No summary generated yet.
          </div>
        ) : (
          <div className="leading-8 text-gray-700 whitespace-pre-wrap">
            {summary}
          </div>
        )}

      </div>
      <div className="bg-white border border-gray-200 rounded-3xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          AI Chat
        </h2>

        <ChatWindow
          messages={messages}
          loading={chatLoading}
        />

        <div className="mt-4">
          <ChatInput
            value={question}
            onChange={setQuestion}
            onSend={handleSendMessage}
            loading={chatLoading}
          />
        </div>

      </div>

    </div>

  );
};

export default DocumentDetailPage;