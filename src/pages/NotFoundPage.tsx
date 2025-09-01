// src/pages/NotFoundPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl font-extrabold text-blue-600 mb-6">404</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            
            <Link
              to="/properties"
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Search className="h-5 w-5 mr-2" />
              Browse Properties
            </Link>
          </div>
          
          <div className="mt-12">
            <img 
              src="https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="House illustration"
              className="mx-auto h-48 object-contain"
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFoundPage;