const Logo = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg 
        viewBox="0 0 32 32" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:"#6366f1", stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:"#8b5cf6", stopOpacity:1}} />
          </linearGradient>
        </defs>
        
        {/* Lotus petals */}
        <path 
          d="M16 4c-3 0-5 2-5 5 0 2 1 3 2 4-1-1-3-2-5-2-3 0-5 2-5 5s2 5 5 5c2 0 4-1 5-2-1 1-2 2-2 4 0 3 2 5 5 5s5-2 5-5c0-2-1-3-2-4 1 1 3 2 5 2 3 0 5-2 5-5s-2-5-5-5c-2 0-4 1-5 2 1-1 2-2 2-4 0-3-2-5-5-5z" 
          fill="url(#logoGradient)" 
          opacity="0.8"
        />
        
        {/* Center circle */}
        <circle cx="16" cy="16" r="3" fill="url(#logoGradient)"/>
        
        {/* Inner peace symbol */}
        <circle cx="16" cy="16" r="1.5" fill="white" opacity="0.9"/>
      </svg>
    </div>
  );
};

export default Logo;
