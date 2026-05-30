import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ClipboardList, Trash2, ArrowRight } from 'lucide-react';

import Spinner from '../../components/common/Spinner';
import quizService from '../../services/quizService';

const QuizListPage = () => {
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuizzes = async () => {
    try {
      // Temporary endpoint call workaround
      // We will improve this later if backend lacks a getAllQuizzes route

      const documentsMap = new Map();

     
        const response =
    await quizService.getAllQuizzes();

setQuizzes(response.data || []);
    

    } catch (error) {
      toast.error('Failed to fetch quizzes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-7xl mx-auto">

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Quizzes
        </h1>

        <p className="text-gray-500 mt-2">
          Review and attempt generated quizzes
        </p>
      </div>

      {quizzes.length === 0 ? (

        <div className="bg-white border rounded-3xl p-12 text-center">

          <ClipboardList
            className="mx-auto text-gray-400 mb-4"
            size={48}
          />

          <h2 className="text-2xl font-semibold mb-2">
            No Quizzes Yet
          </h2>

          <p className="text-gray-500">
            Generate a quiz from a document first.
          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {quizzes.map((quiz) => (

            <div
              key={quiz._id}
              className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm"
            >

              <h2 className="text-xl font-semibold mb-2">
                {quiz.title}
              </h2>

              <p className="text-gray-500 mb-2">
                {quiz.questions?.length || 0} Questions
              </p>

              <p className="text-gray-500 mb-6">
                Score: {quiz.score || 0}
              </p>

              <div className="flex gap-3">

                <button
                  onClick={() =>
                    navigate(`/quiz/${quiz._id}`)
                  }
                  className="flex-1 bg-emerald-500 text-white py-2 rounded-xl flex items-center justify-center gap-2"
                >
                  Start
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={async () => {
                    try {
                      await quizService.deleteQuiz(
                        quiz._id
                      );

                      setQuizzes(prev =>
                        prev.filter(
                          q => q._id !== quiz._id
                        )
                      );

                      toast.success(
                        'Quiz deleted'
                      );

                    } catch (error) {
                      toast.error(
                        'Failed to delete quiz'
                      );
                    }
                  }}
                  className="p-2 border rounded-xl hover:bg-red-50"
                >
                  <Trash2
                    size={18}
                    className="text-red-500"
                  />
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default QuizListPage;