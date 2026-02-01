import React from 'react';

const AppIcons = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 249 144" className="w-full max-w-md mx-auto">
      <defs>
        <linearGradient id="instagram_gradient" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bc1888" />
          <stop offset="25%" stopColor="#cc2366" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="75%" stopColor="#e6683c" />
          <stop offset="100%" stopColor="#f09433" />
        </linearGradient>
        <linearGradient id="gitlab_gradient" gradientUnits="objectBoundingBox" x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0%" stopColor="#e24329" />
          <stop offset="50%" stopColor="#fc6d26" />
          <stop offset="100%" stopColor="#fca326" />
        </linearGradient>
        {/* Include all other gradients and clipPaths from your document */}
      </defs>
      {/* Include all 6 icon groups from your document */}
    </svg>
  );
};

export default AppIcons;