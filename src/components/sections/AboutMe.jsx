import { RevealOnScroll } from "../RevealOnScroll";

export const AboutMe = ({ isDarkMode }) => {
  return (
    <section
      id="about-me"
      className={`pt-16 md:pt-20 pb-16 md:pb-20 ${isDarkMode ? 'bg-black text-gray-200' : 'bg-white text-gray-800'} px-4 relative overflow-hidden min-h-screen`}
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <RevealOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">About Me</span>
          </h2>
          
          <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 md:p-8 shadow-xl border`}>
            <div className="space-y-6">
              <div className="space-y-4">
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-base md:text-lg leading-relaxed`}>
                  I'm a Results-Driven Java Full Stack Developer with over 4 years of hands-on experience building scalable web applications and cloud-native solutions. I specialize in designing robust backend architectures with Java, Spring Boot, and Microservices, and creating dynamic frontends using ReactJS, Angular, and TypeScript.
                </p>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-base md:text-lg leading-relaxed`}>
                  Throughout my career, I've engineered CI/CD pipelines, implemented RESTful APIs, and built cloud-deployed applications on AWS, Azure, and GCP. I have strong expertise in containerization with Docker, orchestration with Kubernetes, and infrastructure automation using Terraform and Ansible.
                </p>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-base md:text-lg leading-relaxed`}>
                  I earned my Master's in Information Technology and Management from the Illinois Institute of Technology, Chicago. I thrive in Agile teams, prioritize writing clean and testable code, and enjoy solving complex problems through innovation and technology.
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}; 