
import React, { useState, useEffect } from 'react';
import Spinner from '../../components/common/Spinner';
import progressService from '../../services/progressService'
import toast from 'react-hot-toast';

import {
  FileText,
  BookOpen,
  BrainCircuit,
  TrendingUp,
  Clock
} from 'lucide-react';

const DashboardPage = () => {

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
    }
  ];

  return (

    <div className='space-y-6'>

      {/* Header */}
      <div>

        <h1 className='text-4xl font-semibold text-gray-900'>
          Dashboard
        </h1>

        <p className='mt-2 text-gray-500'>
          Track your learning progress and activity
        </p>

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

      {/* Recent Activity */}
      <div className='bg-white border border-gray-200 rounded-2xl p-6 shadow-sm'>

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

