import { useEffect, useState } from "react";

export const LoadingScreen = ({ onComplete }) => {
  const fullText = "Hey, I'm Deepak. I turn coffee into code and ideas into production-ready apps.";
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 60);

      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        setShowLoader(false);
        setTimeout(() => onComplete(), 1500);
      }, 1000);
    }
  }, [index, onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="text-2xl md:text-3xl font-bold text-white font-['Fira_Code'] mb-4 max-w-2xl text-center px-4">
        {text}
        <span className="animate-pulse">|</span>
      </div>

      <div className="mt-4">
        <div className="w-[200px] h-[2px] bg-gray-800 rounded relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${(index / fullText.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
