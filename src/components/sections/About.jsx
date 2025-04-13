import { RevealOnScroll } from "../RevealOnScroll";

export const About = () => {
  const frontendSkills = [
    "React",
    "Vue",
    "TypeScript",
    "TailwindCSS",
    "Svelte",
  ];

  const backendSkills = ["Node.js", "Python", "AWS", "MongoDB", "GraphQL"];

  return (
    <section id="about" className="pt-12 pb-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 bg-gradient-to-br from-purple-500 to-indigo-500 blur-3xl -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 bg-gradient-to-tr from-blue-500 to-cyan-400 blur-3xl -ml-20 -mb-20"></div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <RevealOnScroll>
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-xl border border-gray-200">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">About Me</h3>
                <div className="space-y-4">
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    I'm a Software Engineer with over 3.5 years of experience building scalable web applications and cloud-native solutions with Java, Python, C#, Rust, React.js and .NET Core. I specialize in microservices, CI/CD pipelines, and deploying secure systems on Azure, AWS, and GCP.
                  </p>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    I recently earned my Master's in Information Technology and Management from Illinois Institute of Technology. I'm passionate about clean, maintainable code and leveraging Docker, Kubernetes, and Terraform to solve real-world challenges.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
