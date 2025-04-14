import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

export const Terminal = ({ isDarkMode, portfolioData, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', content: 'Welcome to DR Terminal v1.0.0' },
    { type: 'system', content: 'Type "help" to see available commands.' },
    { type: 'prompt', content: '$ ' }
  ]);
  const [theme, setTheme] = useState(isDarkMode ? 'dark' : 'light');
  const inputRef = useRef(null);
  const historyRef = useRef(null);
  
  // Add state for message collection flow
  const [collectingMessage, setCollectingMessage] = useState(false);
  const [messageStep, setMessageStep] = useState(0);
  const [messageData, setMessageData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Update theme when isDarkMode changes
  useEffect(() => {
    setTheme(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

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
          { type: 'output', content: '  skills            - List all skills by category' },
          { type: 'output', content: '  projects          - List all projects' },
          { type: 'output', content: '  experience        - Show work experience' },
          { type: 'output', content: '  contact           - Display contact information' },
          { type: 'output', content: '  whoami            - Display personal profile' },
          { type: 'output', content: '  download resume   - Download resume file' },
          { type: 'output', content: '  stats             - Display portfolio statistics' },
          { type: 'output', content: '  email             - Show email contact or open mailto link' },
          { type: 'output', content: '  theme             - Toggle between light/dark mode' },
          { type: 'output', content: '  open [site]       - Open social media links in browser' },
          { type: 'output', content: '  sendmsg           - Send a message to Deepak' },
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
        return [
          { type: 'output', content: 'skills     projects     experience     contact     profile     terminal' }
        ];
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
          { type: 'output', content: 'Java Full Stack Developer based in Chicago, IL' }
        ];
      }
    },
    'download': {
      description: 'Download resume',
      execute: (args) => {
        if (args === 'resume') {
          // Create a temporary link element
          const link = document.createElement('a');
          link.href = '/Deepak_JFS_Dev_5Years.pdf'; // Path to resume in public folder
          link.download = 'Deepak_JFS_Dev_5Years.pdf';
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
    'theme': {
      description: 'Toggle between light/dark mode',
      execute: () => {
        toggleDarkMode();
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        return [
          { type: 'system', content: 'THEME CHANGED:' },
          { type: 'output', content: `Switched to ${newTheme} mode` }
        ];
      }
    },
    'open': {
      description: 'Open social media links in browser',
      execute: (args) => {
        if (!args) {
          return [
            { type: 'error', content: 'open: missing site name' },
            { type: 'output', content: 'Available sites: github, linkedin, instagram, twitter, portfolio' }
          ];
        }
        
        const site = args.toLowerCase();
        let url = '';
        
        switch(site) {
          case 'github':
            url = `https://${data.contact.github}`;
            break;
          case 'linkedin':
            url = `https://${data.contact.linkedin}`;
            break;
          case 'instagram':
            url = `https://${data.contact.instagram}`;
            break;
          case 'twitter':
            url = `https://${data.contact.twitter}`;
            break;
          case 'portfolio':
            url = `https://${data.profile.portfolioUrl}`;
            break;
          default:
            return [
              { type: 'error', content: `Unknown site: ${site}` },
              { type: 'output', content: 'Available sites: github, linkedin, instagram, twitter, portfolio' }
            ];
        }
        
        window.open(url, '_blank');
        return [
          { type: 'system', content: 'OPENING LINK:' },
          { type: 'output', content: `Opening ${site} in a new tab...` }
        ];
      }
    },
    'sendmsg': {
      description: 'Send a message to Deepak',
      execute: (args) => {
        // Start the interactive message collection process
        setCollectingMessage(true);
        setMessageStep(0);
        setMessageData({
          name: '',
          email: '',
          message: ''
        });
        
        return [
          { type: 'system', content: 'SEND MESSAGE:' },
          { type: 'output', content: 'Please enter your name:' }
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

  // Handle keyboard input - modify this function
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (collectingMessage) {
        // Handle message collection mode
        processMessageInput();
      } else {
        // Normal command execution
        executeCommand(input);
      }
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

  // Get terminal styles based on theme
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

  // Add a new function to process message inputs
  const processMessageInput = () => {
    // Add user input to history
    const newHistory = [...history, { type: 'command', content: input }];
    
    let updatedHistory = [...newHistory];
    
    switch (messageStep) {
      case 0: // Collecting name
        if (!input.trim()) {
          updatedHistory.push({ type: 'error', content: 'Name cannot be empty. Please enter your name:' });
        } else {
          setMessageData({ ...messageData, name: input });
          setMessageStep(1);
          updatedHistory.push({ type: 'output', content: 'Please enter your email:' });
        }
        break;
        
      case 1: // Collecting email
        if (!input.trim()) {
          updatedHistory.push({ type: 'error', content: 'Email cannot be empty. Please enter your email:' });
        } else if (!/^\S+@\S+\.\S+$/.test(input)) {
          updatedHistory.push({ type: 'error', content: `"${input}" is not a valid email address. Please try again:` });
        } else {
          setMessageData({ ...messageData, email: input });
          setMessageStep(2);
          updatedHistory.push({ type: 'output', content: 'Please enter your message:' });
        }
        break;
        
      case 2: // Collecting message
        if (!input.trim()) {
          updatedHistory.push({ type: 'error', content: 'Message cannot be empty. Please enter your message:' });
        } else {
          const updatedMessageData = { ...messageData, message: input };
          setMessageData(updatedMessageData);
          
          // Show confirmation
          updatedHistory.push({ type: 'system', content: 'MESSAGE DETAILS:' });
          updatedHistory.push({ type: 'output', content: `Name: ${updatedMessageData.name}` });
          updatedHistory.push({ type: 'output', content: `Email: ${updatedMessageData.email}` });
          updatedHistory.push({ type: 'output', content: `Message: ${updatedMessageData.message}` });
          updatedHistory.push({ type: 'output', content: 'Send this message? (y/n)' });
          
          setMessageStep(3);
        }
        break;
        
      case 3: // Confirmation
        if (input.toLowerCase() === 'y' || input.toLowerCase() === 'yes') {
          // Send the message via EmailJS
          updatedHistory.push({ type: 'system', content: 'SENDING MESSAGE:' });
          updatedHistory.push({ type: 'output', content: 'Processing your message...' });
          
          // Initialize EmailJS
          emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
          
          // Send email
          emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID_CONTACT,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACT,
            {
              name: messageData.name,
              email: messageData.email,
              message: `Message from Terminal: ${messageData.message}`,
              subject: 'Terminal Message from Portfolio',
            }
          )
          .then(() => {
            setHistory([
              ...updatedHistory,
              { type: 'system', content: 'MESSAGE SENT:' },
              { type: 'output', content: 'Your message has been sent to Deepak. He will get back to you soon.' },
              { type: 'prompt', content: '$ ' }
            ]);
            // Reset collection state
            setCollectingMessage(false);
            setMessageStep(0);
          })
          .catch((error) => {
            console.error('Failed to send message:', error);
            setHistory([
              ...updatedHistory,
              { type: 'error', content: 'Failed to send message. Please try again later or use the contact form.' },
              { type: 'prompt', content: '$ ' }
            ]);
            // Reset collection state
            setCollectingMessage(false);
            setMessageStep(0);
          });
        } else if (input.toLowerCase() === 'n' || input.toLowerCase() === 'no') {
          updatedHistory.push({ type: 'output', content: 'Message cancelled.' });
          updatedHistory.push({ type: 'prompt', content: '$ ' });
          // Reset collection state
          setCollectingMessage(false);
          setMessageStep(0);
        } else {
          updatedHistory.push({ type: 'error', content: 'Please answer with "y" (yes) or "n" (no):' });
        }
        break;
    }
    
    // If we're still collecting input (didn't finish or had an error), don't add the prompt
    if (collectingMessage && !(messageStep === 3 && (input.toLowerCase() === 'y' || input.toLowerCase() === 'yes' || input.toLowerCase() === 'n' || input.toLowerCase() === 'no'))) {
      setHistory(updatedHistory);
    }
    
    // Clear input
    setInput('');
  };

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
                <span>Terminal - DR Portfolio ({theme} mode)</span>
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
                  style={{ caretColor: theme === 'light' ? '#2563eb' : '#4ade80' }}
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