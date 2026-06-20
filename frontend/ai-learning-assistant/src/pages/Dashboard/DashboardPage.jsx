
import React, { useState, useEffect } from 'react';
import Spinner from '../../components/common/Spinner';
import progressService from '../../services/progressService'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import {
  FileText,
  BookOpen,
  BrainCircuit,
  TrendingUp,
  Clock,
  MessageSquare,
  Upload,
  ClipboardList
} from 'lucide-react';

const DashboardPage = () => {

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchDashboardData = async () => {

      try {

        const data = await progressService.getDashboardData();

        console.log("Data____getDashbaordData", data);

        setDashboardData(data.data);

      } catch (error) {

        toast.error('Failed to fetch dashboard data.')
        console.error(error);

      } finally {

        setLoading(false);

      }
    };

    fetchDashboardData();

  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!dashboardData || !dashboardData.overview) {

    return (
      <div className='flex items-center justify-center min-h-[60vh]'>

        <div className='bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center'>

          <TrendingUp className='w-12 h-12 mx-auto text-emerald-500 mb-4' />

          <p className='text-gray-700 font-medium'>
            No dashboard data available.
          </p>

        </div>

      </div>
    );
  }

  const Stats = [
    {
      label: 'Total Documents',
      value: dashboardData.overview.totalDocuments,
      icon: FileText,
      bgColor: 'bg-sky-500'
    },
    {
      label: 'Total Flashcards',
      value: dashboardData.overview.totalFlashcards,
      icon: BookOpen,
      bgColor: 'bg-pink-500'
    },
    {
      label: 'Total Quizzes',
      value: dashboardData.overview.totalQuizzes,
      icon: BrainCircuit,
      bgColor: 'bg-emerald-500'
    },
   
  ];

  return (

    <div className='space-y-6'>

      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 p-8 text-white shadow-xl">

        <div className="relative z-10">

          <p className="text-emerald-100 font-medium">
            Welcome Back 👋
          </p>

          <h1 className="text-4xl font-bold mt-2">
            AI Learning Assistant
          </h1>

          <p className="mt-3 text-emerald-50 max-w-xl">
            Upload documents, generate flashcards,
            take quizzes, and learn faster with AI.
          </p>

        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-5">

        <button
          onClick={() => navigate('/documents')}
          className="group bg-white border border-slate-200 rounded-3xl p-6 text-left hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
        >
          <div className="text-3xl mb-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-4">
              <Upload className="w-7 h-7 text-emerald-600" />
            </div>
          </div>

          <h3 className="font-bold text-lg">
            Upload Document
          </h3>

          <p className="text-gray-500 mt-2">
            Add new study material
          </p>

        </button>

        <button
          onClick={() => navigate('/documents')}
          className="group bg-white border border-slate-200 rounded-3xl p-6 text-left hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
        >
          <div className="text-3xl mb-3">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-4">
              <MessageSquare className="w-7 h-7 text-blue-600" />
            </div>
          </div>

          <h3 className="font-bold text-lg">
            Start Chat
          </h3>

          <p className="text-gray-500 mt-2">
            Ask questions from documents
          </p>

        </button>

        <button
          onClick={() => navigate('/documents')}
          className="group bg-white border border-slate-200 rounded-3xl p-6 text-left hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
        >

          <div className="text-3xl mb-3">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-4">
              <ClipboardList className="w-7 h-7 text-purple-600" />
            </div>
          </div>

          <h3 className="font-bold text-lg">
            Generate Quiz
          </h3>

          <p className="text-gray-500 mt-2">
            Test your understanding
          </p>

        </button>

      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>

        {Stats.map((item, index) => {

          const Icon = item.icon;

          return (

            <div
              key={index}
              className='bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200'
            >

              <div className='flex items-start justify-between'>

                <div>

                  <p className='text-xs font-semibold uppercase tracking-wide text-gray-500'>
                    {item.label}
                  </p>

                  <h2 className='text-4xl font-bold text-gray-900 mt-4'>
                    {item.value}
                  </h2>

                </div>

                <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center shadow-lg`}>

                  <Icon className='w-6 h-6 text-white' />

                </div>

              </div>

            </div>
          )
        })}

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">

          <p className="text-sm text-slate-500">
            Most Active Resource
          </p>

          <h3 className="text-xl font-bold mt-3">
            {dashboardData.recentActivity.documents?.[0]?.title || 'No Data'}
          </h3>

        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Average Quiz Score
          </p>

          <h3 className="text-4xl font-bold mt-3 text-emerald-600">
            {dashboardData.overview.averageScore}%
          </h3>

        </div>
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">

          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Recent Quiz Performance
          </p>

          <div className="space-y-3">

            {dashboardData.recentActivity.quizzes?.slice(0, 3).map((quiz) => (

              <div
                key={quiz._id}
                className="flex items-center justify-between"
              >

                <span className="font-medium text-slate-800 dark:text-white truncate">
                  {quiz.title}
                </span>

                <span className="font-bold text-emerald-600">
                  {quiz.score}%
                </span>

              </div>

            ))}

            {dashboardData.recentActivity.quizzes?.length === 0 && (
              <p className="text-slate-500 dark:text-slate-400">
                No completed quizzes yet
              </p>
            )}

          </div>

        </div>

      </div>



      {/* Recent Activity */}
      <div className='bg-white rounded-3xl p-6 border border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>

        <div className='flex items-center gap-3 mb-6'>

          <div className='w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center'>

            <Clock className='w-5 h-5 text-gray-600' />

          </div>

          <h2 className='text-2xl font-semibold text-gray-900'>
            Recent Activity
          </h2>

        </div>

        <div className='space-y-4'>

          {dashboardData.recentActivity.documents?.map((doc) => (
            <div
              key={doc._id}
              className='flex items-center justify-between p-4 bg-gray-50 rounded-xl'
            >
              <div>
                <p className='font-medium text-gray-900'>
                  📄 {doc.title}
                </p>

                <p className='text-sm text-gray-500'>
                  Document Activity
                </p>
              </div>
            </div>
          ))}

          {dashboardData.recentActivity.quizzes?.map((quiz) => (
            <div
              key={quiz._id}
              className='flex items-center justify-between p-4 bg-gray-50 rounded-xl'
            >
              <div>
                <p className='font-medium text-gray-900'>
                  🧠 {quiz.title}
                </p>

                <p className='text-sm text-gray-500'>
                  Score: {quiz.score}/{quiz.totalQuestions}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>

    </div>
  )
}

export default DashboardPage

