// Debounce utility for auto-save functionality
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// Format date for display
export const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Validate URL format
export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

// Extract tags from string (comma-separated)
export const parseTags = (tagsString) => {
  if (!tagsString) return [];
  return tagsString
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);
};

// Convert tags array to string
export const tagsToString = (tagsArray) => {
  if (!Array.isArray(tagsArray)) return '';
  return tagsArray.join(', ');
};

// Extract display name from email
export const getDisplayName = (email) => {
  if (!email) return 'Unknown User';
  
  // Split email and get the part before @
  const username = email.split('@')[0];
  
  // Replace common separators with spaces and capitalize
  const name = username
    .replace(/[._-]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
    
  return name || 'User';
};
