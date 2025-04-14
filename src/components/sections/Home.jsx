import { RevealOnScroll } from "../RevealOnScroll";
import profileImage from "../../assets/profile.jpeg";
import { WordsOfWisdom } from "./WordsOfWisdom";

export const Home = ({ isDarkMode }) => {
  return (
    <section
      id="home"
      className={`pt-16 md:pt-20 pb-16 md:pb-20 ${isDarkMode ? 'bg-black text-gray-200' : 'bg-white text-gray-800'} px-4 relative overflow-hidden min-h-screen`}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 mb-8">
            <div className="flex-shrink-0">
              <div className="p-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500">
                <img
                  src={profileImage}
                  alt="Profile"
                  className={`w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover border-4 ${isDarkMode ? 'border-gray-800' : 'border-white'}`}
                />
              </div>
            </div>
            <div className="mt-4 md:mt-2 text-center md:text-left">
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-xl sm:text-2xl mb-1 font-medium">Hey, I am</p>
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-2 md:mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Deepak Reddy
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-semibold mb-1 md:mb-2">
                Java Full Stack Developer
              </h2>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-base sm:text-lg`}>
                Chicago, IL, USA
              </p>
            </div>
          </div>
        </RevealOnScroll>
        
        {/* Words of Wisdom Section */}
        <WordsOfWisdom isDarkMode={isDarkMode} />
      </div>
    </section>
  );
};
