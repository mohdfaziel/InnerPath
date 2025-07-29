import { useState, useEffect } from 'react';
import { sessionsAPI } from '../utils/api';
import SessionCard from '../components/SessionCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchPublicSessions();
  }, []);

  const fetchPublicSessions = async () => {
    try {
      setLoading(true);
      const response = await sessionsAPI.getPublicSessions();
      setSessions(response.data.sessions);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      setToast({ 
        message: 'Failed to load sessions. Please try again.', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Wellness Sessions</h1>
          <p className="mt-2 text-gray-600">
            Discover meditation, yoga, and wellness sessions shared by our community
          </p>
        </div>

        {sessions.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions available</h3>
              <p className="text-gray-600 mb-4">
                Be the first to share a wellness session with the community!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                showAuthor={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
