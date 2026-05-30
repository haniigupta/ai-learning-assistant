import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import Spinner from '../../components/common/Spinner';
import quizService from '../../services/quizService';

const QuizResultPage = () => {

  const { quizId } = useParams();

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchResults = async () => {

      try {

        const response =
          await quizService.getQuizResults(
            quizId
          );

        setResults(response.data);

      } catch (error) {

        toast.error(
          'Failed to fetch quiz results'
        );

      } finally {

        setLoading(false);

      }
    };

    fetchResults();

  }, [quizId]);

  if (loading) {
    return <Spinner />;
  }

  if (!results) {

    return (
      <div className="text-center py-20">
        No results available
      </div>
    );
  }

  const percentage =
    results.totalQuestion > 0
      ? Math.round(
          (results.score /
            results.totalQuestion) *
            100
        )
      : 0;

  return (
    <div className="max-w-5xl mx-auto">

      <div className="bg-white border rounded-3xl p-10 mb-8">

        <h1 className="text-4xl font-bold mb-6">
          Quiz Results
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="p-6 rounded-2xl bg-gray-50">

            <p className="text-gray-500">
              Score
            </p>

            <h2 className="text-4xl font-bold">
              {results.score}
            </h2>

          </div>

          <div className="p-6 rounded-2xl bg-gray-50">

            <p className="text-gray-500">
              Total Questions
            </p>

            <h2 className="text-4xl font-bold">
              {results.totalQuestion}
            </h2>

          </div>

          <div className="p-6 rounded-2xl bg-gray-50">

            <p className="text-gray-500">
              Percentage
            </p>

            <h2 className="text-4xl font-bold">
              {percentage}%
            </h2>

          </div>

        </div>

      </div>

      <div className="space-y-6">

        {results.questions?.map(
          (question, index) => (

            <div
              key={index}
              className="bg-white border rounded-2xl p-6"
            >

              <h3 className="font-semibold mb-4">
                {question.question}
              </h3>

              <p className="mb-2">
                <span className="font-medium">
                  Correct Answer:
                </span>{' '}
                {question.correctAnswer}
              </p>

              {question.explanation && (
                <p className="text-gray-600">
                  {question.explanation}
                </p>
              )}

            </div>

          )
        )}

      </div>

    </div>
  );
};

export default QuizResultPage;