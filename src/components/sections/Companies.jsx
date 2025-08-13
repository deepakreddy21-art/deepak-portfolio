import { RevealOnScroll } from "../RevealOnScroll";

export const Companies = ({ isDarkMode }) => {
  const companies = [
    {
      name: "USAA",
      logo: "https://is3-ssl.mzstatic.com/image/thumb/Purple122/v4/b4/ff/6c/b4ff6cb4-53c3-55a6-b122-0d5b37072cb3/AppIcon-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-85-220.png/1200x630wa.png",
      period: "May 2025 - Present",
      position: "Java Full Stack Developer"
    },
    {
      name: "AbbVie",
      logo: "https://1000logos.net/wp-content/uploads/2021/08/AbbVie-Logo.png",
      period: "Feb 2024 - Jan 2025",
      position: "Java Full Stack Developer"
    },
    {
      name: "BMO Harris Bank",
      logo: "https://logos-world.net/wp-content/uploads/2021/02/BMO-Logo-700x394.png",
      period: "May 2023 - Jan 2024",
      position: "Java Full Stack Developer"
    },
    {
      name: "Airtel",
      logo: "https://s.yimg.com/fz/api/res/1.2/mdwR.yOzGC7DpYT5WlRCzQ--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI0MDtxPTgwO3c9MjM4/https://s.yimg.com/zb/imgv1/4b6c4320-7846-39f4-8b72-13a3348db670/t_500x300",
      period: "Sep 2021 - Dec 2022",
      position: "Java Full Stack Developer"
    },
    {
      name: "CIBC Bank",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/CIBC_logo.svg/1200px-CIBC_logo.svg.png",
      period: "Jun 2020 - Jun 2021",
      position: "Java Developer"
    }
  ];

  return (
    <section id="companies" className={`pt-1 pb-12 md:pt-1 md:pb-16 px-4 relative ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-black' : 'bg-white'} opacity-100`}></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <RevealOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Companies</span>
          </h2>
          <p className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-lg mb-10 max-w-3xl mx-auto`}>
            Organizations I've had the privilege to work with
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
            {companies.map((company, index) => (
              <RevealOnScroll key={index}>
                <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-4 shadow-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center`}>
                  <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <img 
                      src={company.logo} 
                      alt={`${company.name} logo`} 
                      className="max-h-full max-w-full object-contain rounded-lg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/80x80?text=" + company.name;
                      }}
                    />
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${
                    company.name === "USAA" ? "text-blue-600" : 
                    company.name === "AbbVie" ? "text-purple-600" : 
                    company.name === "BMO Harris Bank" ? "text-blue-500" : 
                    company.name === "Airtel" ? "text-red-600" : 
                    "text-gray-700"
                  }`}>
                    {company.name}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                    {company.position}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} font-medium`}>
                    {company.period}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
