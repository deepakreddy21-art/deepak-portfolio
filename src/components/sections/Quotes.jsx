import React, { useState, useEffect } from 'react';
import { RevealOnScroll } from "../RevealOnScroll";

export const Quotes = ({ isDarkMode }) => {
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);

  const quotes = [
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt"
    },
    {
      text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      author: "Winston Churchill"
    },
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs"
    },
    {
      text: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt"
    },
    {
      text: "It does not matter how slowly you go as long as you do not stop.",
      author: "Confucius"
    },
    {
      text: "Your time is limited, don't waste it living someone else's life.",
      author: "Steve Jobs"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000); // Change quote every 5 seconds

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <section className={`py-16 md:py-24 px-4 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600">
              Words of Wisdom
            </span>
          </h2>

          <div className="relative h-56 md:h-44 flex items-center justify-center overflow-hidden">
            {quotes.map((quote, index) => (
              <div
                key={index}
                className={`absolute w-full transition-all duration-1000 ease-in-out ${
                  index === activeQuoteIndex 
                    ? 'opacity-100 transform translate-x-0' 
                    : index < activeQuoteIndex || (activeQuoteIndex === 0 && index === quotes.length - 1)
                      ? 'opacity-0 transform -translate-x-full' 
                      : 'opacity-0 transform translate-x-full'
                }`}
              >
                <div className={`mx-auto max-w-4xl ${
                  isDarkMode ? 'bg-gray-900/60' : 'bg-gray-50/60'
                } rounded-xl p-8 md:p-10 border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                  <blockquote className={`text-xl md:text-2xl font-light mb-6 ${
                    isDarkMode ? 'text-cyan-400' : 'text-cyan-700'
                  }`}>
                    "{quote.text}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className={`w-12 h-0.5 ${
                      isDarkMode ? 'bg-purple-500' : 'bg-purple-600'
                    } mr-4`}></div>
                    <cite className={`text-md font-bold ${
                      isDarkMode ? 'text-purple-400' : 'text-purple-600'
                    }`}>
                      {quote.author}
                    </cite>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quote navigation dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveQuoteIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeQuoteIndex === index 
                    ? isDarkMode ? 'bg-cyan-500' : 'bg-cyan-600' 
                    : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                }`}
                aria-label={`Go to quote ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}; 