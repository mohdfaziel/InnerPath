import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sessionsAPI } from '../utils/api';
import SessionCard from '../components/SessionCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import ConfirmationModal from '../components/ConfirmationModal';

const MySessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMySessions();
  }, []);

  const fetchMySessions = async () => {
    try {
      setLoading(true);
      const response = await sessionsAPI.getMySessions();
      setSessions(response.data.sessions);
    } catch (error) {
      console.error('Error fetching my sessions:', error);
      setToast({ 
        message: 'Failed to load your sessions. Please try again.', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditSession = (session) => {
    navigate(`/session-editor?id=${session.id}`);
  };

  const handlePublishSession = async (sessionId) => {
    try {
      await sessionsAPI.publishSession(sessionId);
      setToast({ message: 'Session published successfully!', type: 'success' });
      fetchMySessions(); // Refresh the list
    } catch (error) {
      console.error('Error publishing session:', error);
      setToast({ 
        message: 'Failed to publish session. Please try again.', 
        type: 'error' 
      });
    }
  };

  const handleDeleteSession = async (session) => {
    setSessionToDelete(session);
    setShowDeleteModal(true);
  };

  const confirmDeleteSession = async () => {
    if (sessionToDelete) {
      try {
        await sessionsAPI.deleteSession(sessionToDelete.id);
        setToast({ message: 'Session deleted successfully!', type: 'success' });
        fetchMySessions(); // Refresh the list
      } catch (error) {
        console.error('Error deleting session:', error);
        setToast({ 
          message: 'Failed to delete session. Please try again.', 
          type: 'error' 
        });
      } finally {
        setShowDeleteModal(false);
        setSessionToDelete(null);
      }
    }
  };

  const cancelDeleteSession = () => {
    setShowDeleteModal(false);
    setSessionToDelete(null);
  };

  const draftSessions = sessions.filter(session => session.status === 'draft');
  const publishedSessions = sessions.filter(session => session.status === 'published');

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

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={cancelDeleteSession}
        onConfirm={confirmDeleteSession}
        title="Delete Session"
        message="Are you sure you want to delete this session?"
        confirmText="Delete"
        cancelText="Cancel"
        sessionTitle={sessionToDelete?.title}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Sessions</h1>
            <p className="mt-2 text-gray-600">
              Manage your wellness sessions and track their status
            </p>
          </div>
          <button
            onClick={() => navigate('/session-editor')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            Create New Session
          </button>
        </div>

        {sessions.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions yet</h3>
              <p className="text-gray-600 mb-4">
                Start creating your first wellness session to share with the community.
              </p>
              <button
                onClick={() => navigate('/session-editor')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                Create Your First Session
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Draft Sessions */}
            {draftSessions.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm font-medium mr-3">
                    Drafts ({draftSessions.length})
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {draftSessions.map((session) => (
                    <div key={session.id} className="relative">
                      <SessionCard
                        session={session}
                        showAuthor={false}
                        onEdit={handleEditSession}
                        onDelete={handleDeleteSession}
                      />
                      <div className="mt-3 flex space-x-2">
                        <button
                          onClick={() => handlePublishSession(session.id)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                          Publish
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Published Sessions */}
            {publishedSessions.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium mr-3">
                    Published ({publishedSessions.length})
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {publishedSessions.map((session) => (
                    <SessionCard
                      key={session.id}
                      session={session}
                      showAuthor={false}
                      onEdit={handleEditSession}
                      onDelete={handleDeleteSession}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MySessions;
