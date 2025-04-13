import { RevealOnScroll } from "../RevealOnScroll";
import { useEffect, useRef } from "react";

export const Skills = () => {
  const skillsRef = useRef(null);

  const mainSkills = [
    { name: "JavaScript", color: "bg-gray-800" },
    { name: "React", color: "bg-gray-800" },
    { name: "Node.js", color: "bg-gray-800" },
    { name: "Three.js", color: "bg-gray-800" }
  ];

  return (
    <section id="skills" className="py-12 md:py-20 bg-black px-4 relative">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <RevealOnScroll>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 md:mb-20 text-white">Skills</h2>
          
          {/* 3D/VR Headset Image */}
          <div className="w-full flex justify-center mb-16 md:mb-20">
            <div className="relative w-72 h-72">
              <svg viewBox="0 0 512 512" className="w-full h-full fill-gray-700">
                <path d="M234.3,172.8c-1.2-0.8-2.7-0.8-3.9,0l-64,40c-1.2,0.8-2,2.1-2,3.5v80c0,1.4,0.8,2.8,2,3.5l64,40c0.6,0.4,1.3,0.6,2,0.6
                  s1.4-0.2,2-0.6l64-40c1.2-0.8,2-2.1,2-3.5v-80c0-1.4-0.8-2.8-2-3.5L234.3,172.8z M280.4,288l-48,30l-48-30v-60l48-30l48,30V288z"
                />
                <path d="M462.4,170.8l-58.3-36.5c-1.9-1.2-4.4-0.6-5.6,1.3c-1.2,1.9-0.6,4.4,1.3,5.6l58.3,36.5c14.3,8.9,22.9,24.4,22.9,41.3
                  s-8.6,32.4-22.9,41.3l-183.4,114.6c-14.3,8.9-32.1,8.9-46.4,0L44.9,260.4c-14.3-8.9-22.9-24.4-22.9-41.3s8.6-32.4,22.9-41.3
                  l183.4-114.6c14.3-8.9,32.1-8.9,46.4,0l33,20.6c1.9,1.2,4.4,0.6,5.6-1.3c1.2-1.9,0.6-4.4-1.3-5.6l-33-20.6
                  c-17.4-10.9-39.2-10.9-56.7,0L38.9,170.8C21.5,181.7,10,201.3,10,219.1s11.5,37.4,28.9,48.3l183.4,114.6c8.7,5.4,18.6,8.2,28.3,8.2
                  c9.7,0,19.6-2.7,28.3-8.2l183.4-114.6c17.4-10.9,28.9-30.5,28.9-48.3S479.8,181.7,462.4,170.8z"
                />
                <path d="M462.4,170.8l-58.3-36.5c-1.9-1.2-4.4-0.6-5.6,1.3c-1.2,1.9-0.6,4.4,1.3,5.6l58.3,36.5c14.3,8.9,22.9,24.4,22.9,41.3
                  s-8.6,32.4-22.9,41.3l-183.4,114.6c-14.3,8.9-32.1,8.9-46.4,0L44.9,260.4c-14.3-8.9-22.9-24.4-22.9-41.3s8.6-32.4,22.9-41.3
                  l183.4-114.6c14.3-8.9,32.1-8.9,46.4,0l33,20.6c1.9,1.2,4.4,0.6,5.6-1.3c1.2-1.9,0.6-4.4-1.3-5.6l-33-20.6
                  c-17.4-10.9-39.2-10.9-56.7,0L38.9,170.8C21.5,181.7,10,201.3,10,219.1s11.5,37.4,28.9,48.3l183.4,114.6c8.7,5.4,18.6,8.2,28.3,8.2
                  c9.7,0,19.6-2.7,28.3-8.2l183.4-114.6c17.4-10.9,28.9-30.5,28.9-48.3S479.8,181.7,462.4,170.8z"
                />
                <path d="M371.2,220.8c-1.2-1.9-3.7-2.5-5.6-1.3c-1.9,1.2-2.5,3.7-1.3,5.6c0.6,0.9,0.9,2,0.9,3.1c0,3.1-2.5,5.6-5.6,5.6h-13.3
                  c-3.1,0-5.6-2.5-5.6-5.6v-6.6c0-3.1,2.5-5.6,5.6-5.6h18.9c2.3,0,4.1-1.8,4.1-4.1s-1.8-4.1-4.1-4.1h-18.9c-7.6,0-13.8,6.2-13.8,13.8
                  v6.6c0,7.6,6.2,13.8,13.8,13.8h13.3c7.6,0,13.8-6.2,13.8-13.8C372.4,225.3,372,222.9,371.2,220.8z"
                />
                <path d="M305.8,220.8c-1.2-1.9-3.7-2.5-5.6-1.3c-1.9,1.2-2.5,3.7-1.3,5.6c0.6,0.9,0.9,2,0.9,3.1c0,3.1-2.5,5.6-5.6,5.6h-13.3
                  c-3.1,0-5.6-2.5-5.6-5.6v-6.6c0-3.1,2.5-5.6,5.6-5.6h18.9c2.3,0,4.1-1.8,4.1-4.1s-1.8-4.1-4.1-4.1h-18.9c-7.6,0-13.8,6.2-13.8,13.8
                  v6.6c0,7.6,6.2,13.8,13.8,13.8h13.3c7.6,0,13.8-6.2,13.8-13.8C307,225.3,306.6,222.9,305.8,220.8z"
                />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-transparent opacity-40 rounded-full"></div>
            </div>
          </div>
          
          {/* Main Skills Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {mainSkills.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-6 md:p-8 text-center text-white font-bold text-2xl md:text-3xl hover:-translate-y-2 transition-transform duration-300 shadow-lg"
              >
                {skill.name}
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}; 