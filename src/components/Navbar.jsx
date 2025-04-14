import { useState, useEffect } from "react";

export const Navbar = ({ menuOpen, setMenuOpen, isDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldBeScrolled = scrollY > 50;
      
      if (shouldBeScrolled !== isScrolled) {
        setIsScrolled(shouldBeScrolled);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);
  
  return (
    <header 
      className={`fixed top-0 left-0 w-full z-20 transition-all duration-300 
        ${isScrolled 
          ? `${isDarkMode ? 'bg-black/90 shadow-lg backdrop-blur-md' : 'bg-white/90 shadow-md backdrop-blur-md'}` 
          : `${isDarkMode ? 'bg-transparent' : 'bg-transparent'}`
        }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-5 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex-shrink-0 w-28">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('toggle-terminal'))} 
              className="flex items-center cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" 
                   stroke={isDarkMode ? 'rgb(129, 140, 248)' : 'rgb(79, 70, 229)'}
                   strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className={`font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600`}>
                Terminal
              </span>
            </button>
          </div>
          
          <div className="hidden md:flex items-center justify-end space-x-6 flex-grow ml-20">
            <a 
              href="#home" 
              className={`text-sm font-bold ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}
            >
              Home
            </a>
            <a 
              href="#about-me" 
              className={`text-sm font-bold ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}
            >
              About Me
            </a>
            <a 
              href="#skills" 
              className={`text-sm font-bold ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}
            >
              Skills
            </a>
            <a 
              href="#experience" 
              className={`text-sm font-bold ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}
            >
              Experience
            </a>
            <a 
              href="#projects" 
              className={`text-sm font-bold ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}
            >
              Projects
            </a>
            <a 
              href="#contact" 
              className={`text-sm font-bold ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}
            >
              Contact
            </a>
            
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.open("https://drive.google.com/file/d/1IyTVLQiJhc2-Z3C78y2diijVFG5_LiVV/view?usp=drive_link", "_blank");
                return false;
              }}
              className="flex items-center space-x-1 text-sm font-medium px-4 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white transition-all hover:shadow-md"
            >
              <span>Resume</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
          
          <button
            className={`md:hidden p-2 rounded-md ${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-200'} transition-colors focus:outline-none flex-shrink-0`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
