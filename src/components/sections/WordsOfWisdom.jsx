import { useState, useEffect } from "react";
import { RevealOnScroll } from "../RevealOnScroll";

export const WordsOfWisdom = ({ isDarkMode }) => {
  const quotes = [
    {
      text: "Simplicity is the soul of efficiency.",
      author: "Austin Freeman"
    },
    {
      text: "The best way to predict the future is to implement it.",
      author: "David Heinemeier Hansson"
    },
    {
      text: "Code is like humor. When you have to explain it, it's bad.",
      author: "Cory House"
    },
    {
      text: "Make it work, make it right, make it fast.",
      author: "Kent Beck"
    },
    {
      text: "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.",
      author: "Patrick McKenzie"
    },
    {
      text: "Programming isn't about what you know; it's about what you can figure out.",
      author: "Chris Pine"
    }
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Start fade out animation
      setFadeIn(false);
      
      // After animation completes, change quote and fade in
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        setFadeIn(true);
      }, 500); // This should match the CSS transition duration
      
    }, 3500); // Change quote every 3.5 seconds
    
    return () => clearInterval(intervalId);
  }, [quotes.length]);

  return (
    <section className={`py-6 ${isDarkMode ? 'bg-black' : 'bg-gray-50'} px-4 w-full`}>
      <div className="max-w-4xl mx-auto w-full">
        <RevealOnScroll>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Words of Wisdom</span>
          </h2>
          
          <div 
            className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-8 md:p-10 shadow-lg border relative overflow-hidden min-h-[200px] flex items-center justify-center w-full`}
          >
            <div 
              className={`transition-opacity duration-500 ease-in-out ${fadeIn ? 'opacity-100' : 'opacity-0'} text-center max-w-3xl mx-auto w-full`}
            >
              <p className={`text-xl md:text-2xl italic mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                "{quotes[currentQuoteIndex].text}"
              </p>
              <p className={`text-right text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                — {quotes[currentQuoteIndex].author}
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}; 