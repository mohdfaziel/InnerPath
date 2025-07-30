import axios from 'axios';

const API_BASE_URL = 'https://inner-path-backend.vercel.app/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('innerpath_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect on 401/403 if user has a token (meaning they were logged in but token expired)
    // Don't redirect on login/register endpoints as those should handle their own errors
    const isAuthEndpoint = error.config?.url?.includes('/auth/');
    const hasToken = localStorage.getItem('innerpath_token');
    
    if ((error.response?.status === 401 || error.response?.status === 403) && !isAuthEndpoint && hasToken) {
      // Token expired or invalid - only redirect if user was previously logged in
      localStorage.removeItem('innerpath_token');
      localStorage.removeItem('innerpath_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (email, password) => 
    api.post('/auth/register', { email, password }),
  
  login: (email, password) => 
    api.post('/auth/login', { email, password }),
};

// Sessions API calls
export const sessionsAPI = {
  getPublicSessions: () => 
    api.get('/sessions'),
  
  getMySessions: () => 
    api.get('/my-sessions'),
  
  getMySession: (id) => 
    api.get(`/my-sessions/${id}`),
  
  saveDraft: (sessionData) => 
    api.post('/my-sessions/save-draft', sessionData),
  
  publishSession: (sessionId) => 
    api.post('/my-sessions/publish', { sessionId }),
  
  deleteSession: (sessionId) => 
    api.delete(`/my-sessions/${sessionId}`),
};

export default api;
