import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import Spinner from '../../components/common/Spinner';
import quizService from '../../services/quizService';

const QuizTakePage = () => {

  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {

    const fetchQuiz = async () => {

      try {

        const response =
          await quizService.getQuizById(quizId);

        setQuiz(response.data);

      } catch (error) {

        toast.error('Failed to load quiz');

      } finally {

        setLoading(false);

      }
    };

    fetchQuiz();

  }, [quizId]);

  const handleSelectAnswer = (
    questionIndex,
    answer
  ) => {

    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleSubmitQuiz = async () => {

    try {

      const formattedAnswers =
        Object.entries(answers).map(
          ([questionIndex, selectedAnswer]) => ({
            questionIndex: Number(questionIndex),
            selectedAnswer
          })
        );

      await quizService.submitQuiz(
        quizId,
        formattedAnswers
      );

      toast.success('Quiz submitted');

      navigate(`/quiz-results/${quizId}`);

    } catch (error) {

      toast.error(
        error?.message ||
        'Failed to submit quiz'
      );

    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!quiz) {
    return (
      <div className="text-center py-20">
        Quiz not found
      </div>
    );
  }

  const question =
    quiz.questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto">

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          {quiz.titles}
        </h1>

        <p className="text-gray-500 mt-2">
          Question {currentQuestion + 1} of{' '}
          {quiz.questions.length}
        </p>

      </div>

      <div className="bg-white border rounded-3xl p-8">

        <h2 className="text-2xl font-semibold mb-8">
          {question.question}
        </h2>

        <div className="space-y-4">

          {question.options.map(
            (option, index) => (

              <button
                key={index}
                onClick={() =>
                  handleSelectAnswer(
                    currentQuestion,
                    option
                  )
                }
                className={`w-full text-left p-4 rounded-xl border transition ${
                  answers[currentQuestion] ===
                  option
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200'
                }`}
              >
                {option}
              </button>

            )
          )}

        </div>

      </div>

      <div className="flex justify-between mt-8">

        <button
          disabled={currentQuestion === 0}
          onClick={() =>
            setCurrentQuestion(prev => prev - 1)
          }
          className="px-5 py-3 border rounded-xl disabled:opacity-40"
        >
          Previous
        </button>

        {currentQuestion ===
        quiz.questions.length - 1 ? (

          <button
            onClick={handleSubmitQuiz}
            className="bg-emerald-500 text-white px-6 py-3 rounded-xl"
          >
            Submit Quiz
          </button>

        ) : (

          <button
            onClick={() =>
              setCurrentQuestion(prev => prev + 1)
            }
            className="bg-emerald-500 text-white px-6 py-3 rounded-xl"
          >
            Next
          </button>

        )}

      </div>

    </div>
  );
};

export default QuizTakePage;