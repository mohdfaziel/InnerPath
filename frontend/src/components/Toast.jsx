import { useState, useEffect } from 'react';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 150); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 
                  type === 'error' ? 'bg-red-500' : 
                  type === 'info' ? 'bg-blue-500' : 'bg-gray-500';

  return (
    <div 
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[9999] transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
      style={{ zIndex: 9999 }}
    >
      <div className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-xl flex items-center space-x-2 min-w-[250px]`}>
        <span className="flex-1">{message}</span>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 150);
          }}
          className="text-white hover:text-gray-200 ml-2 text-lg font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
