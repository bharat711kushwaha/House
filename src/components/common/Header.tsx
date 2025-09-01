// src/components/common/Header.tsx

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Menu, X } from 'lucide-react';
import logo from '/logo.png';
interface HeaderProps {
  isAuthenticated?: boolean;
  userRole?: 'user' | 'owner' | 'admin';
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated = false, userRole = 'user' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
         <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="FindHouses Logo" className="h-15 w-20" /> 
           
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-sm font-medium ${isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Home
            </Link>
            <Link 
              to="/properties" 
              className={`text-sm font-medium ${isActive('/properties') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Properties
            </Link>
            <Link 
              to="/agents" 
              className={`text-sm font-medium ${isActive('/agents') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Agents
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm font-medium ${isActive('/contact') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Contact
            </Link>
            
            {/* Owner Dashboard - Visible to everyone */}
            <Link 
              to="/owner/dashboard" 
              className={`text-sm font-medium ${isActive('/owner/dashboard') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Owner Dashboard
            </Link>
            
            {/* Admin Dashboard link */}
            {isAuthenticated && userRole === 'admin' && (
              <Link 
                to="/admin/dashboard" 
                className={`text-sm font-medium ${isActive('/admin/dashboard') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Admin Dashboard
              </Link>
            )}
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {(userRole === 'owner' || userRole === 'admin') && (
                  <Link 
                    to="/properties/add" 
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
                  >
                    Add Listing
                  </Link>
                )}
                <Link 
                  to="/dashboard" 
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <User size={20} className="mr-1" />
                  <span className="text-sm font-medium">Dashboard</span>
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-sm font-medium text-gray-600 hover:text-blue-600"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`text-sm font-medium ${isActive('/') ? 'text-blue-600' : 'text-gray-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/properties" 
                className={`text-sm font-medium ${isActive('/properties') ? 'text-blue-600' : 'text-gray-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </Link>
              <Link 
                to="/agents" 
                className={`text-sm font-medium ${isActive('/agents') ? 'text-blue-600' : 'text-gray-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Agents
              </Link>
              <Link 
                to="/contact" 
                className={`text-sm font-medium ${isActive('/contact') ? 'text-blue-600' : 'text-gray-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {/* Owner Dashboard - Mobile - Visible to everyone */}
              <Link 
                to="/owner/dashboard" 
                className={`text-sm font-medium ${isActive('/owner/dashboard') ? 'text-blue-600' : 'text-gray-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Owner Dashboard
              </Link>
              
              {/* Admin Dashboard - Mobile */}
              {isAuthenticated && userRole === 'admin' && (
                <Link 
                  to="/admin/dashboard" 
                  className={`text-sm font-medium ${isActive('/admin/dashboard') ? 'text-blue-600' : 'text-gray-600'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
              )}
              
              {/* User Actions for Mobile */}
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className={`text-sm font-medium ${isActive('/dashboard') ? 'text-blue-600' : 'text-gray-600'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  {(userRole === 'owner' || userRole === 'admin') && (
                    <Link 
                      to="/properties/add" 
                      className="text-sm font-medium text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Add Listing
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-sm font-medium text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="text-sm font-medium text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;