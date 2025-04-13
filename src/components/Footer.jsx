import React from 'react';

export const Footer = ({ isDarkMode }) => {
  const year = new Date().getFullYear();
  
  return (
    <footer className={`${isDarkMode ? 'bg-black text-gray-300' : 'bg-white text-gray-700'} p-6 text-center`}>
      <div className="max-w-4xl mx-auto">
        <div>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>&copy; {year} Deepak Reddy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}; 