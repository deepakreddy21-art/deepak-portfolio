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
                  I'm a Java Full Stack Developer with 5+ years of experience building scalable, cloud-native applications across finance, healthcare, and telecom. I specialize in Java 17, Spring Boot, microservices, and modern front-end frameworks like React, Angular, and TypeScript, delivering seamless, user-focused solutions that perform at scale.
                </p>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-base md:text-lg leading-relaxed`}>
                  My work spans cloud migration, DevOps automation, and performance optimization, with proven results such as achieving 99.99% uptime, reducing release cycles by 80%, and improving application load times for millions of users. I'm skilled in deploying high-availability systems on AWS (Lambda, API Gateway, ECS, DynamoDB) and streamlining delivery through CI/CD pipelines using GitLab, Jenkins, and Terraform.
                </p>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-base md:text-lg leading-relaxed`}>
                  I hold a Master's in Information Technology and Management from the Illinois Institute of Technology, USA. Passionate about continuous learning, I thrive in Agile teams, mentor peers, and explore emerging cloud and automation technologies to push boundaries and deliver measurable impact.
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}; 