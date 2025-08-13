import { useState, useEffect } from "react";
import "./App.css";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { Home } from "./components/sections/Home";
import { AboutMe } from "./components/sections/AboutMe";
import { Experience } from "./components/sections/Experience";
import { Companies } from "./components/sections/Companies";
import { Projects } from "./components/sections/Projects";
import { Testimonials } from "./components/sections/Testimonials";
import { Skills } from "./components/sections/Skills";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/Footer";
import { SocialSidebar } from "./components/SocialSidebar";
import { SectionSeparator } from "./components/SectionSeparator";
import { ThemeToggle } from "./components/ThemeToggle";
import { AIChatBubble } from "./components/AIChatBubble";
import { Quotes } from "./components/sections/Quotes";
import { Terminal } from "./components/Terminal";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    // Initialize dark mode from localStorage or user preference on page load
    const darkModePreference = localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setIsDarkMode(darkModePreference);
    
    if (darkModePreference) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      <div
        className={`min-h-screen transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${isDarkMode ? 'bg-black text-gray-200' : 'bg-white text-gray-800'}`}
      >
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} isDarkMode={isDarkMode} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} isDarkMode={isDarkMode} />
        <SocialSidebar isDarkMode={isDarkMode} />
        <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <AIChatBubble isDarkMode={isDarkMode} />
        <Terminal isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        
        {/* Home Section */}
        <Home isDarkMode={isDarkMode} />
        <SectionSeparator variant="wave1" isDarkMode={isDarkMode} />
        
        {/* About Me Section */}
        <AboutMe isDarkMode={isDarkMode} />
        <SectionSeparator variant="wave2" isDarkMode={isDarkMode} />
        
        {/* Testimonials Section (Skills) */}
        <Testimonials isDarkMode={isDarkMode} />
        <SectionSeparator variant="wave3" isDarkMode={isDarkMode} />
        
        {/* Experience Section */}
        <Experience isDarkMode={isDarkMode} />
        <SectionSeparator variant="wave1" flip={true} isDarkMode={isDarkMode} />
        
        {/* Companies Section */}
        <Companies isDarkMode={isDarkMode} />
        <SectionSeparator variant="wave2" isDarkMode={isDarkMode} />
        
        {/* Projects Section */}
        <Projects isDarkMode={isDarkMode} />
        <SectionSeparator variant="wave2" flip={true} isDarkMode={isDarkMode} />
        
        {/* Contact Section */}
        <Contact isDarkMode={isDarkMode} />
        <Footer isDarkMode={isDarkMode} />
      </div>
    </>
  );
}

export default App;
