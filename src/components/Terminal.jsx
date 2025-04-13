import { useState, useEffect, useRef } from 'react';

export const Terminal = ({ isDarkMode, portfolioData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', content: 'Welcome to DRK Terminal v1.0.0' },
    { type: 'system', content: 'Type "help" to see available commands.' },
    { type: 'prompt', content: '$ ' }
  ]);
  const [currentDirectory, setCurrentDirectory] = useState('~');
  const inputRef = useRef(null);
  const historyRef = useRef(null);

  // Portfolio data for terminal commands
  const data = {
    skills: {
      frontend: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
      backend: ["Java", "Spring Boot", "Node.js", "Python", "Express", "RESTful APIs"],
      devops: ["Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Jenkins"],
      cloud: ["AWS", "Azure", "GCP", "Serverless", "Microservices"],
      databases: ["MongoDB", "PostgreSQL", "MySQL", "Oracle", "Redis"]
    },
    projects: [
      {
        name: "Pharma Cloud Platform",
        description: "Developed a cloud-based platform for pharmaceutical data management and analytics.",
        technologies: ["Java", "Spring Boot", "AWS"]
      },
      {
        name: "Banking Microservices App",
        description: "Built a microservices-based banking application with a scalable architecture",
        technologies: ["React", "Node.js", "Docker"]
      },
      {
        name: "Retail Analytics Dashboard",
        description: "Created an analytics dashboard for retail data visualization and reporting",
        technologies: ["Python", "Flask", "Javascript"]
      },
      {
        name: "Personal Portfolio Website",
        description: "Designed and developed this responsive portfolio website with modern UI/UX principles",
        technologies: ["React", "TailwindCSS", "Vite"]
      },
      {
        name: "AI-Powered Image Generator",
        description: "Created a web application that uses machine learning to generate custom images based on text prompts",
        technologies: ["Python", "TensorFlow", "React", "Flask"]
      }
    ],
    experience: [
      {
        company: "AbbVie",
        period: "Feb 2024 - Present",
        position: "Java Full Stack Developer"
      },
      {
        company: "BMO Harris Bank",
        period: "May 2023 - Jan 2024",
        position: "Java Full Stack Developer"
      },
      {
        company: "Airtel",
        period: "Sep 2021 - Dec 2022",
        position: "Java Full Stack Developer"
      },
      {
        company: "CIBC Bank",
        period: "Jun 2020 - Jun 2021",
        position: "Java Developer"
      }
    ],
    contact: {
      email: "deepakreddyiitc1234@gmail.com",
      github: "github.com/deepakreddy21",
      linkedin: "linkedin.com/in/deepak-reddy-3a911924b",
      instagram: "instagram.com/deepakreddy_22",
      twitter: "twitter.com/kdr_9837"
    }
  };

  // Command definitions and handlers
  const commands = {
    help: {
      description: 'Display available commands',
      execute: () => {
        return [
          { type: 'system', content: 'Available commands:' },
          { type: 'output', content: '  help              - Show this help message' },
          { type: 'output', content: '  clear             - Clear terminal screen' },
          { type: 'output', content: '  ls                - List available sections' },
          { type: 'output', content: '  pwd               - Print working directory' },
          { type: 'output', content: '  cd [directory]    - Change directory' },
          { type: 'output', content: '  cat [file]        - Display file content' },
          { type: 'output', content: '  skills            - List all skills by category' },
          { type: 'output', content: '  projects          - List all projects' },
          { type: 'output', content: '  experience        - Show work experience' },
          { type: 'output', content: '  contact           - Display contact information' },
          { type: 'output', content: '  whoami            - Who am I?' },
          { type: 'output', content: '  exit              - Close the terminal' }
        ];
      }
    },
    clear: {
      description: 'Clear terminal screen',
      execute: () => {
        setHistory([]);
        return [];
      }
    },
    ls: {
      description: 'List available sections',
      execute: (args) => {
        if (currentDirectory === '~') {
          return [
            { type: 'output', content: 'skills/     projects/     experience/     contact/' }
          ];
        } else if (currentDirectory === '~/skills') {
          return [
            { type: 'output', content: 'frontend.txt     backend.txt     devops.txt     cloud.txt     databases.txt' }
          ];
        } else if (currentDirectory === '~/projects') {
          const projectList = data.projects.map(project => `${project.name.toLowerCase().replace(/\s+/g, '-')}.txt`).join('     ');
          return [
            { type: 'output', content: projectList }
          ];
        } else if (currentDirectory === '~/experience') {
          const experienceList = data.experience.map(exp => `${exp.company.toLowerCase().replace(/\s+/g, '-')}.txt`).join('     ');
          return [
            { type: 'output', content: experienceList }
          ];
        } else if (currentDirectory === '~/contact') {
          return [
            { type: 'output', content: 'email.txt     github.txt     linkedin.txt     instagram.txt     twitter.txt' }
          ];
        }
        return [{ type: 'error', content: 'No such directory: ' + currentDirectory }];
      }
    },
    pwd: {
      description: 'Print working directory',
      execute: () => {
        return [{ type: 'output', content: currentDirectory }];
      }
    },
    cd: {
      description: 'Change directory',
      execute: (args) => {
        if (!args || args === '~' || args === '/') {
          setCurrentDirectory('~');
          return [{ type: 'output', content: 'Changed directory to: ~' }];
        }
        
        if (args === '..') {
          if (currentDirectory === '~') {
            return [{ type: 'output', content: 'Already at home directory' }];
          }
          setCurrentDirectory('~');
          return [{ type: 'output', content: 'Changed directory to: ~' }];
        }
        
        const validDirectories = ['skills', 'projects', 'experience', 'contact'];
        const targetDir = args.replace('~/', '');
        
        if (validDirectories.includes(targetDir)) {
          setCurrentDirectory(`~/${targetDir}`);
          return [{ type: 'output', content: `Changed directory to: ~/${targetDir}` }];
        }
        
        return [{ type: 'error', content: `cd: no such directory: ${args}` }];
      }
    },
    cat: {
      description: 'Display file content',
      execute: (args) => {
        if (!args) {
          return [{ type: 'error', content: 'cat: missing file operand' }];
        }
        
        // Handle skill files
        if (currentDirectory === '~/skills') {
          const skillType = args.replace('.txt', '');
          if (data.skills[skillType]) {
            return [
              { type: 'system', content: `${skillType.toUpperCase()} SKILLS:` },
              { type: 'output', content: data.skills[skillType].join(', ') }
            ];
          }
        }
        
        // Handle project files
        if (currentDirectory === '~/projects') {
          const projectName = args.replace('.txt', '').replace(/-/g, ' ');
          const project = data.projects.find(p => p.name.toLowerCase() === projectName);
          if (project) {
            return [
              { type: 'system', content: project.name.toUpperCase() },
              { type: 'output', content: project.description },
              { type: 'output', content: `Technologies: ${project.technologies.join(', ')}` }
            ];
          }
        }
        
        // Handle experience files
        if (currentDirectory === '~/experience') {
          const companyName = args.replace('.txt', '').replace(/-/g, ' ');
          const experience = data.experience.find(e => e.company.toLowerCase() === companyName);
          if (experience) {
            return [
              { type: 'system', content: experience.company.toUpperCase() },
              { type: 'output', content: `Position: ${experience.position}` },
              { type: 'output', content: `Period: ${experience.period}` }
            ];
          }
        }
        
        // Handle contact files
        if (currentDirectory === '~/contact') {
          const contactType = args.replace('.txt', '');
          if (data.contact[contactType]) {
            return [
              { type: 'system', content: `${contactType.toUpperCase()}: ` },
              { type: 'output', content: data.contact[contactType] }
            ];
          }
        }
        
        return [{ type: 'error', content: `cat: ${args}: No such file or directory` }];
      }
    },
    skills: {
      description: 'List all skills by category',
      execute: () => {
        const output = [{ type: 'system', content: 'SKILLS BY CATEGORY:' }];
        
        Object.entries(data.skills).forEach(([category, skills]) => {
          output.push({ type: 'system', content: `\n${category.toUpperCase()}:` });
          output.push({ type: 'output', content: skills.join(', ') });
        });
        
        return output;
      }
    },
    projects: {
      description: 'List all projects',
      execute: () => {
        const output = [{ type: 'system', content: 'PROJECTS:' }];
        
        data.projects.forEach(project => {
          output.push({ type: 'system', content: `\n${project.name}:` });
          output.push({ type: 'output', content: project.description });
          output.push({ type: 'output', content: `Technologies: ${project.technologies.join(', ')}` });
        });
        
        return output;
      }
    },
    experience: {
      description: 'Show work experience',
      execute: () => {
        const output = [{ type: 'system', content: 'WORK EXPERIENCE:' }];
        
        data.experience.forEach(exp => {
          output.push({ type: 'system', content: `\n${exp.company}:` });
          output.push({ type: 'output', content: `Position: ${exp.position}` });
          output.push({ type: 'output', content: `Period: ${exp.period}` });
        });
        
        return output;
      }
    },
    contact: {
      description: 'Display contact information',
      execute: () => {
        return [
          { type: 'system', content: 'CONTACT INFORMATION:' },
          { type: 'output', content: `Email: ${data.contact.email}` },
          { type: 'output', content: `GitHub: ${data.contact.github}` },
          { type: 'output', content: `LinkedIn: ${data.contact.linkedin}` },
          { type: 'output', content: `Instagram: ${data.contact.instagram}` },
          { type: 'output', content: `Twitter: ${data.contact.twitter}` }
        ];
      }
    },
    whoami: {
      description: 'Who am I?',
      execute: () => {
        return [
          { type: 'system', content: 'Deepak Reddy' },
          { type: 'output', content: 'Software Developer based in Chicago, IL' }
        ];
      }
    },
    exit: {
      description: 'Close the terminal',
      execute: () => {
        setIsOpen(false);
        return [];
      }
    }
  };

  // Handle command execution
  const executeCommand = (command) => {
    const [cmd, ...args] = command.trim().split(' ');
    
    // Add executed command to history
    const newHistory = [...history, { type: 'command', content: `$ ${command}` }];
    
    // Process command
    if (commands[cmd]) {
      const output = commands[cmd].execute(args.join(' '));
      setHistory([...newHistory, ...output, { type: 'prompt', content: '$ ' }]);
    } else if (cmd) {
      setHistory([
        ...newHistory,
        { type: 'error', content: `command not found: ${cmd}` },
        { type: 'prompt', content: '$ ' }
      ]);
    } else {
      setHistory([...newHistory, { type: 'prompt', content: '$ ' }]);
    }
    
    // Clear input field
    setInput('');
  };

  // Handle keyboard input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    }
  };

  // Auto focus on input when terminal is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Auto scroll to bottom when history updates
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);
  
  // Listen for toggle-terminal event from navbar
  useEffect(() => {
    const handleToggleTerminal = () => {
      setIsOpen(prev => !prev);
    };
    
    window.addEventListener('toggle-terminal', handleToggleTerminal);
    
    return () => {
      window.removeEventListener('toggle-terminal', handleToggleTerminal);
    };
  }, []);

  return (
    <>
      {/* Terminal window */}
      {isOpen && (
        <>
          {/* Terminal window */}
          <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] h-[70vh] max-h-[600px] z-50
            ${isDarkMode ? 'bg-gray-900 text-green-400' : 'bg-black text-green-400'} 
            font-mono text-sm shadow-xl rounded-lg overflow-hidden
            transition-all duration-300 ease-in-out border ${isDarkMode ? 'border-gray-700' : 'border-gray-800'}`}>
            
            {/* Terminal header */}
            <div className={`flex items-center justify-between p-2 border-b ${
              isDarkMode ? 'border-gray-700' : 'border-gray-800'
            }`}>
              <div className="flex items-center">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={() => setIsOpen(false)}></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span>Terminal - {currentDirectory}</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Terminal content */}
            <div 
              ref={historyRef}
              className="p-4 h-[calc(100%-44px)] overflow-y-auto font-mono"
            >
              {history.map((item, index) => (
                <div key={index} className={
                  item.type === 'error' ? 'text-red-500' :
                  item.type === 'system' ? 'text-blue-400' :
                  item.type === 'command' ? 'text-white' :
                  'text-green-400'
                }>
                  {item.content}
                </div>
              ))}
              <div className="flex items-center">
                <span className="text-green-400">{history[history.length - 1]?.content !== '$ ' ? '$ ' : ''}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={`flex-1 bg-transparent border-none outline-none ${
                    isDarkMode ? 'text-green-400' : 'text-green-400'
                  } font-mono caret-green-400 pl-1`}
                  spellCheck="false"
                  autoCapitalize="none"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}; 