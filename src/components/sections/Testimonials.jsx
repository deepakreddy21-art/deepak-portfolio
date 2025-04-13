import { RevealOnScroll } from "../RevealOnScroll";

export const Testimonials = ({ isDarkMode }) => {
  const skillCategories = [
    {
      category: "Programming",
      skills: ["Java", "J2EE", "Python", ".Net", "C", "C#", "C++", "Rust", "Bash", "PowerShell"],
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      category: "Java APIs",
      skills: ["EJB", "J2EE", "JSP", "JSTL", "Custom Tag Libraries", "JAX-RS", "JDBC", "Servlets", "JNDI", "JMS", "JAXB", "JUnit", "Spring MVC", "Spring Boot"],
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      category: "Cloud Platforms",
      skills: ["AWS (EC2, S3, Lambda, SQS, RDS, EKS, DynamoDB)", "Azure (VMs, VNet, Azure AD, AKS)", "GCP"],
      gradient: "from-cyan-500 to-emerald-500"
    },
    {
      category: "Frameworks",
      skills: ["MEAN Stack", "MERN Stack", "Express", "React", "Vue", "Angular"],
      gradient: "from-pink-500 to-rose-500"
    },
    {
      category: "Web Technologies",
      skills: ["HTML/HTML5", "CSS/CSS3", "Bootstrap", "JSP", "Ajax", "XML", "JSON", "NodeJS", "ReactJS"],
      gradient: "from-amber-500 to-orange-500"
    },
    {
      category: "Databases",
      skills: ["Azure SQL", "MySQL", "PostgreSQL", "MongoDB", "Cassandra", "Oracle", "Cosmos DB"],
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      category: "Deployment Tools",
      skills: ["Azure DevOps", "Jenkins", "Docker", "Kubernetes", "Terraform", "Bamboo", "Git", "Maven", "Gradle"],
      gradient: "from-violet-500 to-purple-500"
    },
    {
      category: "Testing & QA",
      skills: ["JUnit", "Mockito", "PyTest", "Postman", "Selenium", "Rest-Assured", "TestNG", "Cucumber"],
      gradient: "from-sky-500 to-indigo-500"
    }
  ];

  return (
    <section id="testimonials" className={`pt-1 pb-12 md:pt-1 md:pb-20 px-4 relative ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-black' : 'bg-white'} opacity-100`}></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <RevealOnScroll>
          <h2 className="text-5xl md:text-7xl font-bold mb-3 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Skills</span>
          </h2>
          <p className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-lg mb-10 md:mb-16 max-w-3xl mx-auto`}>
            Expertise across various technologies and frameworks to build robust, scalable applications
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <div 
                key={index}
                className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-6 shadow-lg border hover:shadow-xl transition-all duration-300 h-full`}
              >
                <h3 className={`text-xl md:text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${category.gradient} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} pb-2`}>
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className={`${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'} py-1 px-3 text-sm rounded-full mb-2 font-medium`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}; 