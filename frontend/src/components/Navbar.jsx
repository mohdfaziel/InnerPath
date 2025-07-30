import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo from './Logo';
import Toast from './Toast';
import { getDisplayName } from '../utils/helpers';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Show logout toast
    setToast({ message: 'Logged out successfully!', type: 'success' });
    
    // Logout user
    logout();
    setIsMobileMenuOpen(false);
    
    // Navigate to home after a delay to show toast
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <nav className="bg-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2" onClick={closeMobileMenu}>
              <Logo size="md" />
              <h1 className="text-white text-lg sm:text-xl font-bold">InnerPath</h1>
            </Link>
            {isAuthenticated && (
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <Link
                  to="/dashboard"
                  className="text-indigo-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/my-sessions"
                  className="text-indigo-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  My Sessions
                </Link>
                <Link
                  to="/session-editor"
                  className="text-indigo-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Create Session
                </Link>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            {isAuthenticated ? (
              <>
                <span className="hidden sm:block text-indigo-100 text-xs sm:text-sm">
                  Welcome, {getDisplayName(user?.email)}
                </span>
                <button
                  onClick={handleLogout}
                  className="hidden sm:block bg-indigo-500 hover:bg-indigo-400 text-white px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors"
                >
                  Logout
                </button>
                {/* Mobile menu button */}
                <button
                  onClick={toggleMobileMenu}
                  className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-indigo-100 hover:text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {/* Hamburger icon */}
                  {!isMobileMenuOpen ? (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  ) : (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </button>
              </>
            ) : (
              <div className="flex space-x-2 sm:space-x-4">
                <Link
                  to="/login"
                  className="text-indigo-100 hover:text-white px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-500 hover:bg-indigo-400 text-white px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isAuthenticated && isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-indigo-700">
              <div className="text-indigo-100 px-3 py-2 text-sm">
                Welcome, {getDisplayName(user?.email)}
              </div>
              <Link
                to="/dashboard"
                className="text-indigo-100 hover:text-white hover:bg-indigo-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={closeMobileMenu}
              >
                Dashboard
              </Link>
              <Link
                to="/my-sessions"
                className="text-indigo-100 hover:text-white hover:bg-indigo-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={closeMobileMenu}
              >
                My Sessions
              </Link>
              <Link
                to="/session-editor"
                className="text-indigo-100 hover:text-white hover:bg-indigo-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={closeMobileMenu}
              >
                Create Session
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left text-indigo-100 hover:text-white hover:bg-indigo-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
    </>
  );
};

export default Navbar;
