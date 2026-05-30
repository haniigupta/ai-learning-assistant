import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Star,
  RotateCcw,
  BookOpen
} from 'lucide-react';

import Spinner from '../../components/common/Spinner';
import flashcardService from '../../services/flashcardService';

const FlashcardPage = () => {

  const { documentId } = useParams();
  const navigate = useNavigate();

  const [flashcardSet, setFlashcardSet] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const fetchFlashcards = async () => {

    try {

      const response =
        await flashcardService.getFlashcardsForDocument(
          documentId
        );

      const flashcards =
        response?.data?.[0] || null;

      setFlashcardSet(flashcards);

    } catch (error) {

      console.error(error);

      toast.error(
        error?.message ||
        'Failed to fetch flashcards'
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchFlashcards();
  }, [documentId]);

  const handleNext = () => {

    if (
      currentIndex <
      flashcardSet.cards.length - 1
    ) {

      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);

    }
  };

  const handlePrevious = () => {

    if (currentIndex > 0) {

      setCurrentIndex(prev => prev - 1);
      setShowAnswer(false);

    }
  };

  const handleReview = async () => {

    try {

      const currentCard =
        flashcardSet.cards[currentIndex];

      await flashcardService.reviewFlashcard(
        currentCard._id
      );

      toast.success('Review recorded');

    } catch (error) {

      console.error(error);

    }
  };

  const handleToggleStar = async () => {

    try {

      const currentCard =
        flashcardSet.cards[currentIndex];

      await flashcardService.toggleStar(
        currentCard._id
      );

      const updatedCards = [
        ...flashcardSet.cards
      ];

      updatedCards[currentIndex] = {
        ...updatedCards[currentIndex],
        isStarred:
          !updatedCards[currentIndex].isStarred
      };

      setFlashcardSet({
        ...flashcardSet,
        cards: updatedCards
      });

    } catch (error) {

      toast.error(
        error?.message ||
        'Failed to update star'
      );

    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (
    !flashcardSet ||
    !flashcardSet.cards ||
    flashcardSet.cards.length === 0
  ) {

    return (
      <div className="max-w-4xl mx-auto text-center py-20">

        <BookOpen
          size={60}
          className="mx-auto text-gray-400 mb-4"
        />

        <h2 className="text-3xl font-bold mb-3">
          No Flashcards Found
        </h2>

        <p className="text-gray-500">
          Generate flashcards from a document first.
        </p>

      </div>
    );
  }

  const currentCard =
    flashcardSet.cards[currentIndex];

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      <button
        onClick={() => navigate('/flashcards')}
        className="flex items-center gap-2 text-gray-600 hover:text-black"
      >
        <ArrowLeft size={18} />
        Back to Flashcards
      </button>

      <div>

        <h1 className="text-4xl font-bold">
          Flashcard Study
        </h1>

        <p className="text-gray-500 mt-2">
          Card {currentIndex + 1} of{' '}
          {flashcardSet.cards.length}
        </p>

      </div>

      <div className="bg-white border border-gray-200 rounded-3xl p-10 min-h-[350px] shadow-sm">

        <div className="flex justify-between items-center mb-8">

          <span className="px-3 py-1 rounded-full bg-gray-100 text-sm capitalize">
            {currentCard.difficulty}
          </span>

          <button
            onClick={handleToggleStar}
          >
            <Star
              size={24}
              className={
                currentCard.isStarred
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-400'
              }
            />
          </button>

        </div>

        <div
          className="cursor-pointer text-center"
          onClick={() =>
            setShowAnswer(prev => !prev)
          }
        >

          <div className="text-sm text-gray-400 mb-6">

            {showAnswer
              ? 'ANSWER'
              : 'QUESTION'}

          </div>

          <div className="text-2xl font-semibold leading-relaxed">

            {showAnswer
              ? currentCard.answer
              : currentCard.question}

          </div>

          <p className="mt-10 text-gray-400 text-sm">

            Click card to flip

          </p>

        </div>

      </div>

      <div className="flex justify-between">

        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 border rounded-xl px-5 py-3 disabled:opacity-40"
        >
          <ChevronLeft size={18} />
          Previous
        </button>

        <div className="flex gap-3">

          <button
            onClick={handleReview}
            className="flex items-center gap-2 bg-emerald-500 text-white px-5 py-3 rounded-xl"
          >
            <RotateCcw size={18} />
            Mark Reviewed
          </button>

        </div>

        <button
          onClick={handleNext}
          disabled={
            currentIndex ===
            flashcardSet.cards.length - 1
          }
          className="flex items-center gap-2 border rounded-xl px-5 py-3 disabled:opacity-40"
        >
          Next
          <ChevronRight size={18} />
        </button>

      </div>

    </div>
  );
};

export default FlashcardPage;