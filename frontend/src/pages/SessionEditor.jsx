import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { sessionsAPI } from '../utils/api';
import { debounce, isValidUrl, parseTags, tagsToString } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';

const SessionEditor = () => {
  const [formData, setFormData] = useState({
    title: '',
    tags: '',
    json_file_url: ''
  });
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState('');

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Load existing session if editing
  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setSessionId(id);
      loadSession(id);
    }
  }, [searchParams]);

  const loadSession = async (id) => {
    try {
      setLoading(true);
      const response = await sessionsAPI.getMySession(id);
      const session = response.data.session;
      setFormData({
        title: session.title,
        tags: tagsToString(session.tags),
        json_file_url: session.json_file_url
      });
    } catch (error) {
      console.error('Error loading session:', error);
      setToast({ 
        message: 'Failed to load session. Please try again.', 
        type: 'error' 
      });
      navigate('/my-sessions');
    } finally {
      setLoading(false);
    }
  };

  // Auto-save functionality with debounce
  const autoSave = useCallback(
    debounce(async (data, currentSessionId) => {
      if (!data.title.trim() || !data.json_file_url.trim()) return;

      try {
        setAutoSaveStatus('Saving...');
        const response = await sessionsAPI.saveDraft({
          ...data,
          tags: parseTags(data.tags),
          sessionId: currentSessionId
        });
        
        // If this was a new session, set the session ID
        if (!currentSessionId) {
          setSessionId(response.data.session.id);
        }
        
        setAutoSaveStatus('Saved');
        
        // Show success toast for auto-save
        setToast({ 
          message: 'Draft auto-saved successfully!', 
          type: 'success' 
        });
        
        setTimeout(() => setAutoSaveStatus(''), 2000);
      } catch (error) {
        console.error('Auto-save error:', error);
        setAutoSaveStatus('Save failed');
        
        // Show error toast for auto-save failure
        setToast({ 
          message: 'Auto-save failed. Please save manually.', 
          type: 'error' 
        });
        
        setTimeout(() => setAutoSaveStatus(''), 2000);
      }
    }, 5000),
    []
  );

  // Trigger auto-save when form data changes
  useEffect(() => {
    if (formData.title || formData.json_file_url) {
      autoSave(formData, sessionId);
    }
  }, [formData, sessionId, autoSave]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setToast({ message: 'Title is required', type: 'error' });
      return false;
    }
    if (!formData.json_file_url.trim()) {
      setToast({ message: 'JSON file URL is required', type: 'error' });
      return false;
    }
    if (!isValidUrl(formData.json_file_url)) {
      setToast({ message: 'Please enter a valid URL', type: 'error' });
      return false;
    }
    return true;
  };

  const handleSaveDraft = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setSaveLoading(true);
      const response = await sessionsAPI.saveDraft({
        ...formData,
        tags: parseTags(formData.tags),
        sessionId
      });
      
      if (!sessionId) {
        setSessionId(response.data.session.id);
      }
      
      setToast({ message: 'Draft saved successfully!', type: 'success' });
    } catch (error) {
      console.error('Error saving draft:', error);
      setToast({ 
        message: 'Failed to save draft. Please try again.', 
        type: 'error' 
      });
    } finally {
      setSaveLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!validateForm()) return;

    if (!sessionId) {
      setToast({ message: 'Please save as draft first', type: 'error' });
      return;
    }

    try {
      setPublishLoading(true);
      await sessionsAPI.publishSession(sessionId);
      setToast({ message: 'Session published successfully!', type: 'success' });
      
      setTimeout(() => {
        navigate('/my-sessions');
      }, 1500);
    } catch (error) {
      console.error('Error publishing session:', error);
      setToast({ 
        message: 'Failed to publish session. Please try again.', 
        type: 'error' 
      });
    } finally {
      setPublishLoading(false);
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
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {sessionId ? 'Edit Session' : 'Create New Session'}
            </h1>
            <p className="mt-2 text-gray-600">
              Create a wellness session to share with the community
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {autoSaveStatus && (
              <span className={`text-sm ${
                autoSaveStatus === 'Saved' ? 'text-green-600' : 
                autoSaveStatus === 'Saving...' ? 'text-blue-600' : 'text-red-600'
              }`}>
                {autoSaveStatus}
              </span>
            )}
            <button
              onClick={() => navigate('/my-sessions')}
              className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSaveDraft} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Session Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter a descriptive title for your session"
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="meditation, yoga, mindfulness (comma-separated)"
              />
              <p className="mt-1 text-xs text-gray-500">
                Add tags separated by commas to help others discover your session
              </p>
            </div>

            <div>
              <label htmlFor="json_file_url" className="block text-sm font-medium text-gray-700 mb-2">
                JSON File URL *
              </label>
              <input
                id="json_file_url"
                name="json_file_url"
                type="url"
                required
                value={formData.json_file_url}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://example.com/path/to/session.json"
              />
              <p className="mt-1 text-xs text-gray-500">
                Provide a URL to your session configuration JSON file
              </p>
            </div>

            <div className="flex space-x-4 pt-6">
              <button
                type="submit"
                disabled={saveLoading}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {saveLoading ? <LoadingSpinner size="sm" color="white" /> : 'Save Draft'}
              </button>
              
              <button
                type="button"
                onClick={handlePublish}
                disabled={publishLoading || !sessionId}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {publishLoading ? <LoadingSpinner size="sm" color="white" /> : 'Publish Session'}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Auto-save Feature</h3>
          <p className="text-sm text-blue-700">
            Your session will be automatically saved as a draft after 5 seconds of inactivity. 
            Make sure to publish when you're ready to share with the community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SessionEditor;
