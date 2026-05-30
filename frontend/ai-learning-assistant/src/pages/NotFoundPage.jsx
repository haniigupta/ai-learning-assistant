import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

      <div className="max-w-xl w-full text-center">

        <div className="mb-6">
          <h1 className="text-8xl font-extrabold text-[#00d492]">
            404
          </h1>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 text-lg mb-10">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#00d492] text-white rounded-2xl font-semibold hover:opacity-90 transition"
          >
            <Home size={18} />
            Go to Dashboard
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 bg-white rounded-2xl font-semibold hover:bg-gray-50 transition"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

        </div>

      </div>

    </div>
  );
};

export default NotFoundPage;