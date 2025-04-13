import { useState, useEffect, useRef } from 'react';

export const Terminal = ({ isDarkMode, portfolioData, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', content: 'Welcome to DRK Terminal v1.0.0' },
    { type: 'system', content: 'Type "help" to see available commands.' },
    { type: 'prompt', content: '$ ' }
  ]);
  const [currentDirectory, setCurrentDirectory] = useState('~');
  const [theme, setTheme] = useState(isDarkMode ? 'dark' : 'light');
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
    },
    profile: {
      name: "Deepak Reddy",
      degree: "Master's in Computer Science, Illinois Institute of Technology",
      role: "Full Stack Developer",
      portfolioUrl: "deepakreddy21-art.github.io/deepak-portfolio"
    },
    stats: {
      projects: 5,
      experienceYears: 4,
      skillsCount: 25,
      certifications: 3
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
          { type: 'output', content: '  whoami            - Display personal profile' },
          { type: 'output', content: '  download resume   - Download resume file' },
          { type: 'output', content: '  search [keyword]  - Search portfolio content' },
          { type: 'output', content: '  theme [option]    - Change terminal theme (light/dark/hacker)' },
          { type: 'output', content: '  stats             - Display portfolio statistics' },
          { type: 'output', content: '  email             - Show email contact or open mailto link' },
          { type: 'output', content: '  sudo hire-me      - Special command :)' },
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
      description: 'Display personal profile',
      execute: () => {
        return [
          { type: 'system', content: `${data.profile.name} - ${data.profile.role}` },
          { type: 'output', content: data.profile.degree },
          { type: 'output', content: `Portfolio: ${data.profile.portfolioUrl}` },
          { type: 'output', content: 'Software Developer based in Chicago, IL' }
        ];
      }
    },
    'download': {
      description: 'Download resume',
      execute: (args) => {
        if (args === 'resume') {
          // Create a temporary link element
          const link = document.createElement('a');
          link.href = '/resume.pdf'; // Path to resume in public folder
          link.download = 'deepak_reddy_resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          return [
            { type: 'system', content: 'DOWNLOAD INITIATED:' },
            { type: 'output', content: 'Resume download started...' }
          ];
        }
        return [{ type: 'error', content: `Unknown download option: ${args}` }];
      }
    },
    'search': {
      description: 'Search portfolio content',
      execute: (args) => {
        if (!args) {
          return [{ type: 'error', content: 'search: missing search term' }];
        }
        
        const keyword = args.toLowerCase();
        const results = [];
        
        // Search in skills
        let skillMatches = [];
        Object.entries(data.skills).forEach(([category, skills]) => {
          const matches = skills.filter(skill => skill.toLowerCase().includes(keyword));
          if (matches.length > 0) {
            skillMatches.push({ category, matches });
          }
        });
        
        // Search in projects
        const projectMatches = data.projects.filter(project => 
          project.name.toLowerCase().includes(keyword) || 
          project.description.toLowerCase().includes(keyword) ||
          project.technologies.some(tech => tech.toLowerCase().includes(keyword))
        );
        
        // Search in experience
        const experienceMatches = data.experience.filter(exp => 
          exp.company.toLowerCase().includes(keyword) ||
          exp.position.toLowerCase().includes(keyword)
        );
        
        // Compile results
        if (skillMatches.length === 0 && projectMatches.length === 0 && experienceMatches.length === 0) {
          return [{ type: 'system', content: `No results found for: "${args}"` }];
        }
        
        const output = [{ type: 'system', content: `SEARCH RESULTS FOR: "${args}"` }];
        
        if (skillMatches.length > 0) {
          output.push({ type: 'system', content: '\nSKILLS:' });
          skillMatches.forEach(({ category, matches }) => {
            output.push({ type: 'output', content: `${category}: ${matches.join(', ')}` });
          });
        }
        
        if (projectMatches.length > 0) {
          output.push({ type: 'system', content: '\nPROJECTS:' });
          projectMatches.forEach(project => {
            output.push({ type: 'output', content: `${project.name}: ${project.description}` });
          });
        }
        
        if (experienceMatches.length > 0) {
          output.push({ type: 'system', content: '\nEXPERIENCE:' });
          experienceMatches.forEach(exp => {
            output.push({ type: 'output', content: `${exp.company}: ${exp.position} (${exp.period})` });
          });
        }
        
        return output;
      }
    },
    'theme': {
      description: 'Change terminal theme',
      execute: (args) => {
        const validThemes = ['light', 'dark', 'hacker'];
        
        if (!args || !validThemes.includes(args)) {
          return [
            { type: 'error', content: `Invalid theme option. Available themes: ${validThemes.join(', ')}` },
            { type: 'output', content: `Current theme: ${theme}` }
          ];
        }
        
        setTheme(args);
        
        // If switching between light and dark, also toggle site-wide dark mode
        if ((args === 'light' || args === 'dark') && args !== theme) {
          if (args === 'light' && isDarkMode) {
            toggleDarkMode();
          } else if (args === 'dark' && !isDarkMode) {
            toggleDarkMode();
          }
        }
        
        return [{ type: 'system', content: `Theme changed to "${args}"` }];
      }
    },
    'sudo': {
      description: 'Sudo command',
      execute: (args) => {
        if (args === 'hire-me') {
          return [
            { type: 'system', content: '🎉 EXCELLENT DECISION DETECTED 🎉' },
            { type: 'output', content: 'Initiating hiring protocol...' },
            { type: 'output', content: 'Preparing workspace...' },
            { type: 'output', content: 'Configuring developer environment...' },
            { type: 'output', content: 'Adding to team chat...' },
            { type: 'system', content: 'CONGRATULATIONS!' },
            { type: 'output', content: 'You\'ve successfully recognized talent when you see it!' },
            { type: 'output', content: 'For the formal hiring process, please contact me at:' },
            { type: 'output', content: `Email: ${data.contact.email}` },
            { type: 'output', content: `LinkedIn: ${data.contact.linkedin}` }
          ];
        }
        return [{ type: 'error', content: 'sudo: command not found. Did you mean "sudo hire-me"?' }];
      }
    },
    'stats': {
      description: 'Display portfolio statistics',
      execute: () => {
        return [
          { type: 'system', content: 'PORTFOLIO STATISTICS:' },
          { type: 'output', content: `Projects: ${data.stats.projects}` },
          { type: 'output', content: `Years of Experience: ${data.stats.experienceYears}` },
          { type: 'output', content: `Skills: ${data.stats.skillsCount}` },
          { type: 'output', content: `Certifications: ${data.stats.certifications}` },
          { type: 'output', content: `Professional Roles: ${data.experience.length}` }
        ];
      }
    },
    'email': {
      description: 'Email contact',
      execute: () => {
        // Create mailto link
        const mailtoLink = `mailto:${data.contact.email}?subject=Job%20Opportunity%20for%20Deepak%20Reddy`;
        window.open(mailtoLink, '_blank');
        
        return [
          { type: 'system', content: 'EMAIL CONTACT:' },
          { type: 'output', content: `Email: ${data.contact.email}` },
          { type: 'output', content: 'Email client opened in new tab (if not, please check popup blocker)' }
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
    
    // Special case for "download resume" command
    if (cmd === 'download' && args[0] === 'resume') {
      const output = commands['download'].execute('resume');
      setHistory([...newHistory, ...output, { type: 'prompt', content: '$ ' }]);
      setInput('');
      return;
    }
    
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

  // Update theme when isDarkMode changes
  useEffect(() => {
    setTheme(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Determine terminal styles based on theme
  const getTerminalStyles = () => {
    switch (theme) {
      case 'light':
        return {
          bg: 'bg-white',
          text: 'text-gray-800',
          header: 'bg-gray-100 border-gray-300',
          prompt: 'text-blue-600',
          commandText: 'text-gray-800',
          systemText: 'text-blue-600',
          outputText: 'text-gray-800',
          errorText: 'text-red-600',
          border: 'border-gray-300'
        };
      case 'hacker':
        return {
          bg: 'bg-black',
          text: 'text-green-500',
          header: 'bg-black border-green-800',
          prompt: 'text-green-500',
          commandText: 'text-green-500',
          systemText: 'text-green-300',
          outputText: 'text-green-500',
          errorText: 'text-red-500',
          border: 'border-green-800'
        };
      case 'dark':
      default:
        return {
          bg: 'bg-gray-900',
          text: 'text-green-400',
          header: 'bg-gray-800 border-gray-700',
          prompt: 'text-green-400',
          commandText: 'text-white',
          systemText: 'text-blue-400',
          outputText: 'text-green-400',
          errorText: 'text-red-500',
          border: 'border-gray-700'
        };
    }
  };

  const styles = getTerminalStyles();

  return (
    <>
      {/* Terminal window */}
      {isOpen && (
        <>
          {/* Terminal window */}
          <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] h-[70vh] max-h-[600px] z-50
            ${styles.bg} ${styles.text} 
            font-mono text-sm shadow-xl rounded-lg overflow-hidden
            transition-all duration-300 ease-in-out border ${styles.border}`}>
            
            {/* Terminal header */}
            <div className={`flex items-center justify-between p-2 border-b ${styles.border}`}>
              <div className="flex items-center">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={() => setIsOpen(false)}></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span>Terminal - {currentDirectory} - {theme} mode</span>
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
                  item.type === 'error' ? styles.errorText :
                  item.type === 'system' ? styles.systemText :
                  item.type === 'command' ? styles.commandText :
                  styles.outputText
                }>
                  {item.content}
                </div>
              ))}
              <div className="flex items-center">
                <span className={styles.prompt}>{history[history.length - 1]?.content !== '$ ' ? '$ ' : ''}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={`flex-1 ${styles.bg} border-none outline-none ${styles.text} font-mono pl-1`}
                  style={{ caretColor: theme === 'hacker' ? '#22c55e' : theme === 'light' ? '#2563eb' : '#4ade80' }}
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