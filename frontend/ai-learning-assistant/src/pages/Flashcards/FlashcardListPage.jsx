import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BookOpen, Trash2, ArrowRight } from 'lucide-react';

import Spinner from '../../components/common/Spinner';
import flashcardService from '../../services/flashcardService';

const FlashcardListPage = () => {

  const navigate = useNavigate();

  const [flashcardSets, setFlashcardSets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFlashcards = async () => {

    try {

      const response =
        await flashcardService.getAllFlashcardSets();
        console.log(response);

      setFlashcardSets(response.data || []);

    } catch (error) {

      toast.error('Failed to fetch flashcards');

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const handleDelete = async (id) => {

    try {

      await flashcardService.deleteFlashcardSet(id);

      setFlashcardSets(prev =>
        prev.filter(set => set._id !== id)
      );

      toast.success('Flashcard set deleted');

    } catch (error) {

      toast.error('Failed to delete flashcards');

    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-7xl mx-auto">

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Flashcards
        </h1>

        <p className="text-gray-500 mt-2">
          Review and study your generated flashcards
        </p>

      </div>

      {flashcardSets.length === 0 ? (

        <div className="bg-white border rounded-3xl p-12 text-center">

          <BookOpen
            className="mx-auto text-gray-400 mb-4"
            size={48}
          />

          <h2 className="text-2xl font-semibold mb-2">
            No Flashcards Yet
          </h2>

          <p className="text-gray-500">
            Generate flashcards from a document first.
          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {flashcardSets.map(set => (

            <div
              key={set._id}
              className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm"
            >

              <h2 className="text-xl font-semibold mb-2">

                {set.documentId?.title ||
                  'Untitled Document'}

              </h2>

              <p className="text-gray-500 mb-6">

                {set.cards?.length || 0} cards

              </p>

              <div className="flex gap-3">

                <button
                  onClick={() =>
                    navigate(`/flashcards/${set.documentId?._id}`)
                  }
                  className="flex-1 bg-emerald-500 text-white py-2 rounded-xl flex items-center justify-center gap-2"
                >
                  Study
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => handleDelete(set._id)}
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

export default FlashcardListPage;