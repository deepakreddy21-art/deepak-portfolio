import { useEffect } from "react";

export const MobileMenu = ({ menuOpen, setMenuOpen, isDarkMode }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-30 ${isDarkMode ? 'bg-black' : 'bg-white'} transform transition-transform duration-300 ease-in-out ${
        menuOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col items-center pt-24 space-y-7 text-lg font-['Fira_Code'] relative z-10">
        <a
          href="#home"
          className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </a>
        <a
          href="#about-me"
          className={`font-bold ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-colors`}
          onClick={() => setMenuOpen(false)}
        >
          About Me
        </a>
        <a
          href="#skills"
          className={`font-bold ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-colors`}
          onClick={() => setMenuOpen(false)}
        >
          Skills
        </a>
        <a
          href="#experience"
          className={`font-bold ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-colors`}
          onClick={() => setMenuOpen(false)}
        >
          Experience
        </a>
        <a
          href="#projects"
          className={`font-bold ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-colors`}
          onClick={() => setMenuOpen(false)}
        >
          Projects
        </a>
        <a
          href="#contact"
          className={`font-bold ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-colors`}
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            const link = document.createElement('a');
            link.href = '/Deepak_JFS_Dev_5Years.pdf';
            link.download = 'Deepak_JFS_Dev_5Years.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            return false;
          }}
          className="px-4 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:shadow-lg transition-all font-bold"
        >
          Resume
        </a>
      </div>
    </div>
  );
};
