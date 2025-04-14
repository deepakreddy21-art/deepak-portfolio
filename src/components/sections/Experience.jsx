import { RevealOnScroll } from "../RevealOnScroll";

export const Experience = ({ isDarkMode }) => {
  const experiences = [
    {
      company: "AbbVie",
      period: "Feb 2024 - Present",
      position: "Java Full Stack Developer",
      gradient: "from-purple-500 to-indigo-500",
      logo: "https://1000logos.net/wp-content/uploads/2021/08/AbbVie-Logo.png",
      details: [
        "Developing and maintaining enterprise Java applications with Spring Boot",
        "Building responsive front-end interfaces using modern JavaScript frameworks",
        "Led the migration of monolithic applications to microservices architecture, improving scalability and maintainability"
      ]
    },
    {
      company: "BMO Harris Bank",
      period: "May 2023 - Jan 2024",
      position: "Java Full Stack Developer",
      gradient: "from-cyan-500 to-blue-500",
      logo: "https://logos-world.net/wp-content/uploads/2021/02/BMO-Logo-700x394.png",
      details: [
        "Developed and maintained banking applications using Java, Spring, and Angular",
        "Implemented RESTful APIs for financial data processing and transaction management",
        "Collaborated with business stakeholders to translate requirements into technical solutions"
      ]
    },
    {
      company: "Airtel",
      period: "Sep 2021 - Dec 2022",
      position: "Java Full Stack Developer",
      gradient: "from-amber-500 to-orange-500",
      logo: "https://s.yimg.com/fz/api/res/1.2/mdwR.yOzGC7DpYT5WlRCzQ--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI0MDtxPTgwO3c9MjM4/https://s.yimg.com/zb/imgv1/4b6c4320-7846-39f4-8b72-13a3348db670/t_500x300",
      details: [
        "Built and maintained telecommunications applications using Java and related technologies",
        "Implemented front-end interfaces with React for customer-facing applications",
        "Optimized database queries and enhanced application performance for high-traffic services"
      ]
    },
    {
      company: "CIBC Bank",
      period: "Jun 2020 - Jun 2021",
      position: "Java Developer",
      gradient: "from-emerald-500 to-teal-500",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/CIBC_logo.svg/1200px-CIBC_logo.svg.png",
      details: [
        "Developed banking software solutions using Java and Spring framework",
        "Created and maintained database schemas, stored procedures, and queries",
        "Implemented unit and integration tests to ensure application reliability"
      ]
    }
  ];

  return (
    <section id="experience" className={`pt-1 pb-12 md:pt-1 md:pb-16 px-4 relative ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-black' : 'bg-white'} opacity-100`}></div>
      <div className="max-w-4xl mx-auto relative z-10">
        <RevealOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Experience</span>
          </h2>
          <p className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-lg mb-10 max-w-3xl mx-auto`}>
            Professional journey and accomplishments
          </p>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <RevealOnScroll key={index}>
                <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 shadow-lg border transition-all duration-300 hover:shadow-xl`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="flex items-center">
                      <div className={`mr-4 flex-shrink-0 ${isDarkMode ? 'bg-white' : 'bg-white'} rounded p-1 shadow-sm w-14 h-14 flex items-center justify-center overflow-hidden`}>
                        <img 
                          src={exp.logo} 
                          alt={`${exp.company} logo`} 
                          className="max-h-[85%] max-w-[85%] object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/100x100?text=" + exp.company;
                          }}
                        />
                      </div>
                      <div>
                        <h3 className={`text-xl md:text-2xl font-bold ${
                          exp.company === "AbbVie" ? "text-black" : 
                          exp.company === "Airtel" ? "text-red-600" : 
                          exp.company === "CIBC Bank" ? "text-yellow-500" : 
                          `text-transparent bg-clip-text bg-gradient-to-r ${exp.gradient}`
                        }`}>
                          {exp.company}
                        </h3>
                        <h4 className={`text-lg font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{exp.position}</h4>
                      </div>
                    </div>
                    <div className={`mt-2 md:mt-0 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-medium`}>
                      {exp.period}
                    </div>
                  </div>
                  <ul className="list-disc pl-5 space-y-2 ml-12">
                    {exp.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}; 