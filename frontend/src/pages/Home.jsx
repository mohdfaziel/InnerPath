import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to <span className="text-indigo-600">InnerPath</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Create your own path to inner peace. Share wellness sessions, meditation guides, 
            and yoga practices with a community focused on mindfulness and well-being.
          </p>
          
          <div className="mt-8 flex justify-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors"
                >
                  View Dashboard
                </Link>
                <Link
                  to="/session-editor"
                  className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-3 rounded-md text-lg font-medium transition-colors"
                >
                  Create Session
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  to="/dashboard"
                  className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-3 rounded-md text-lg font-medium transition-colors"
                >
                  Browse Sessions
                </Link>
              </>
            )}
          </div>
        </div>
        
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-center">
                <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-indigo-600 text-2xl">🧘</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Meditation Sessions</h3>
                <p className="text-gray-600">
                  Discover guided meditation sessions created by the community to help you find peace and mindfulness.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-center">
                <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-indigo-600 text-2xl">🕉️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Yoga Practices</h3>
                <p className="text-gray-600">
                  Access yoga routines and practices shared by experienced practitioners and instructors.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-center">
                <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-indigo-600 text-2xl">✨</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Create & Share</h3>
                <p className="text-gray-600">
                  Create your own wellness sessions and share them with the community to help others on their journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
