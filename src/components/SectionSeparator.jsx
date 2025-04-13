import React from 'react';

export const SectionSeparator = ({ variant = 'wave1', flip = false, isDarkMode }) => {
  // Different wave patterns
  const wavePaths = {
    wave1: "M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,96C672,96,768,128,864,138.7C960,149,1056,139,1152,122.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
    wave2: "M0,128L48,149.3C96,171,192,213,288,229.3C384,245,480,235,576,202.7C672,171,768,117,864,117.3C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
    wave3: "M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,106.7C672,117,768,171,864,176C960,181,1056,139,1152,144C1248,149,1344,203,1392,229.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
  };

  const selectedPath = wavePaths[variant] || wavePaths.wave1;
  
  // In dark mode, return a simple black div instead of the wave
  if (isDarkMode) {
    return <div className="bg-black w-full h-8"></div>;
  }
  
  return (
    <div className="w-full overflow-hidden">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 320"
        className={`w-full ${flip ? 'transform rotate-180' : ''}`}
        preserveAspectRatio="none"
        style={{ height: '70px' }}
      >
        <path 
          className="fill-white"
          fillOpacity="1" 
          d={selectedPath}
        ></path>
      </svg>
    </div>
  );
}; 