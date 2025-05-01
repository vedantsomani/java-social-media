import React from 'react';
import { Link } from 'react-router-dom';
import { School, Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center px-4">
      <div className="text-blue-600 dark:text-blue-400 mb-4">
        <School size={64} />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8">
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <Link 
        to="/" 
        className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
      >
        <Home size={18} className="mr-2" />
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;