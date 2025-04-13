import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

export const AIChatBubble = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: 'bot', 
      text: "👋 Hi there! I'm Deepu, Deepak's portfolio assistant. How can I help you today?",
      options: [
        {
          text: "Learn about Deepak's work",
          value: "portfolio"
        },
        {
          text: "Send Deepak a message",
          value: "contact"
        }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Contact form state
  const [contactMode, setContactMode] = useState(false);
  const [contactStep, setContactStep] = useState(0);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  // Portfolio content for reference
  const portfolioContent = {
    specializations: [
      "Full-stack web development",
      "React and modern JavaScript frameworks",
      "DevOps and CI/CD pipelines",
      "Machine Learning deployment",
      "Cloud infrastructure on AWS and Azure"
    ],
    education: {
      degrees: [
        {
          degree: "Master's in Information Technology and Management",
          school: "Illinois Institute of Technology",
          location: "Chicago, IL",
          year: "",
          details: "Focused on advanced software development and cloud computing"
        }
      ],
      certifications: [
        "AWS Solutions Architect Associate",
        "Microsoft Azure Administrator",
        "Google Cloud Professional Developer"
      ]
    },
    workExperience: [
      {
        company: "FourHub Tech LLC",
        position: "Software Engineer",
        duration: "2021 - Present",
        responsibilities: [
          "Led development of cloud-native applications using React, Node.js and AWS",
          "Implemented CI/CD pipelines and automated testing frameworks",
          "Collaborated with cross-functional teams to deliver high-quality software solutions"
        ]
      },
      {
        company: "WeSpotHire LLC",
        position: "Software Developer",
        duration: "2019 - 2021",
        responsibilities: [
          "Developed and maintained RESTful APIs and microservices",
          "Built and enhanced frontend components using React and TypeScript",
          "Participated in code reviews and mentored junior developers"
        ]
      }
    ],
    techStack: {
      frontend: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
      backend: ["Node.js", "Python", "Java", "Express", "Django", "RESTful APIs"],
      devops: ["Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Jenkins"],
      cloud: ["AWS", "Azure", "GCP", "Serverless", "Microservices"],
      databases: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"]
    },
    projects: [
      {
        name: "Data Visualization Dashboard",
        description: "An interactive dashboard for visualizing complex datasets with filterable views and real-time updates.",
        technologies: ["React", "D3.js", "Node.js", "MongoDB", "WebSockets"],
        highlights: "Features interactive charts, custom filtering, and real-time data updates"
      },
      {
        name: "Machine Learning Model Deployment",
        description: "End-to-end ML deployment pipeline for image classification models with automated training and serving.",
        technologies: ["Python", "TensorFlow", "Docker", "Kubernetes", "Flask API"],
        highlights: "Includes CI/CD integration, model versioning, and performance monitoring"
      },
      {
        name: "Real-time Collaborative Editor",
        description: "A collaborative coding environment allowing multiple users to edit code simultaneously.",
        technologies: ["React", "Node.js", "WebSockets", "MongoDB", "Redis"],
        highlights: "Features syntax highlighting, real-time collaboration, and chat functionality"
      }
    ],
    latestProject: {
      name: "Cloud-Native Microservices Architecture",
      description: "A scalable, resilient microservices application deployed on Kubernetes with comprehensive monitoring.",
      technologies: ["Go", "gRPC", "Kubernetes", "Prometheus", "Grafana", "Istio"],
      highlights: "Implements service mesh for advanced traffic management and resilience patterns"
    },
    socialMedia: {
      instagram: "deepakreddy_22",
      linkedin: "deepak-reddy-3a911924b",
      github: "deepakreddy22",
      twitter: "kdr_9837"
    }
  };
  
  const chatResponses = {
    greeting: [
      "It's great to meet you! Are you interested in Deepak's work, or do you have a specific question?",
      "Hello! Looking for anything specific in Deepak's portfolio?"
    ],
    projects: [
      "Deepak has worked on several exciting projects! Some highlights include:\n\n• Data Visualization Dashboard: Interactive charts with React and D3.js\n• Machine Learning Model Deployment: End-to-end ML pipeline with TensorFlow\n• Real-time Collaborative Editor: Multi-user coding environment\n\nWhich one sounds interesting to you?",
      "Deepak specializes in full-stack development, machine learning, and DevOps. Is there a specific area you'd like to know more about?"
    ],
    latestProject: [
      `Deepak's latest project is a ${portfolioContent.latestProject.name}.\n\nIt's ${portfolioContent.latestProject.description}\n\nTech stack: ${portfolioContent.latestProject.technologies.join(', ')}\n\nHighlights: ${portfolioContent.latestProject.highlights}`
    ],
    skills: [
      `Deepak is skilled in:\n\n• Frontend: ${portfolioContent.techStack.frontend.join(', ')}\n• Backend: ${portfolioContent.techStack.backend.join(', ')}\n• DevOps: ${portfolioContent.techStack.devops.join(', ')}\n• Cloud: ${portfolioContent.techStack.cloud.join(', ')}\n• Databases: ${portfolioContent.techStack.databases.join(', ')}\n\nNeed any details on these?`
    ],
    specialization: [
      `Deepak specializes in:\n\n• ${portfolioContent.specializations.join('\n• ')}\n\nWhich area are you most interested in?`
    ],
    education: [
      `Deepak's educational background includes:\n\n• ${portfolioContent.education.degrees[0].degree} from ${portfolioContent.education.degrees[0].school} (${portfolioContent.education.degrees[0].location})\n\nHe also holds certifications in:\n• ${portfolioContent.education.certifications.join('\n• ')}`
    ],
    experience: [
      `Deepak's work experience includes:\n\n• ${portfolioContent.workExperience[0].position} at ${portfolioContent.workExperience[0].company} (${portfolioContent.workExperience[0].duration})\n  - ${portfolioContent.workExperience[0].responsibilities.join('\n  - ')}\n\n• ${portfolioContent.workExperience[1].position} at ${portfolioContent.workExperience[1].company} (${portfolioContent.workExperience[1].duration})\n  - ${portfolioContent.workExperience[1].responsibilities.join('\n  - ')}\n\nWould you like to know more about a specific role?`,
    ],
    contact: [
      "You can contact Deepak directly at dkilaru@hawk.iit.edu. Do you need any other information?",
      "Deepak's email is dkilaru@hawk.iit.edu. Feel free to reach out to him directly!"
    ],
    resume: [
      "I'd be happy to help you get Deepak's resume! You can download it directly using the button below.",
    ],
    techStack: [
      `For the Data Visualization Dashboard, Deepak used:\n• Frontend: React, D3.js\n• Backend: Node.js\n• Database: MongoDB\n• Real-time updates: WebSockets`,
      `For the Machine Learning Model Deployment, Deepak used:\n• ML Framework: TensorFlow\n• API: Flask\n• Containerization: Docker\n• Orchestration: Kubernetes\n• Language: Python`,
      `For the Real-time Collaborative Editor, Deepak used:\n• Frontend: React\n• Backend: Node.js\n• Real-time communication: WebSockets\n• Database: MongoDB\n• Caching: Redis`
    ],
    default: [
      "That's an interesting question! While I'm just a simple bot, Deepak would be happy to discuss this with you. You can reach him at dkilaru@hawk.iit.edu.",
      "Great question! Deepak would love to talk more about this. His email is dkilaru@hawk.iit.edu if you'd like to contact him directly.",
      "I'm not sure I understand perfectly, but you can reach Deepak at dkilaru@hawk.iit.edu for more information."
    ],
    goodbye: [
      "It was great chatting with you! Feel free to reach out anytime you have more questions about Deepak's work.",
      "Thanks for stopping by! Don't hesitate to connect with Deepak directly for more detailed information."
    ],
    contextual_home: [
      "I see you're looking at Deepak's home section! Would you like to learn about his skills or see his latest projects?",
      "Welcome to Deepak's portfolio! Can I help you navigate to the projects section or would you like to see his resume?"
    ],
    contextual_about: [
      "You're checking out Deepak's background! Would you like more details about his education or work experience?",
      "This section highlights Deepak's journey. Would you like to know about his skills or specializations?"
    ],
    contextual_testimonials: [
      "These are Deepak's key skills. Would you like me to elaborate on any specific technology?",
      "You're viewing Deepak's technical expertise. Would you like to see projects where he applied these skills?"
    ],
    contextual_experience: [
      "You're looking at Deepak's work history. Would you like more details about a specific role or company?",
      "This section shows Deepak's professional experience. Would you like to know more about the technologies he used at these companies?"
    ],
    contextual_projects: [
      "These are some of Deepak's highlighted projects. Would you like more technical details about any specific one?",
      "You're viewing Deepak's portfolio projects. Would you like to know more about his development process or tech stack?"
    ],
    contextual_contact: [
      "Looking to get in touch with Deepak? You can use this form or I can provide his email directly.",
      "Ready to connect with Deepak? Feel free to use this contact form or check out his LinkedIn profile."
    ],
    socialMedia: [
      `You can connect with Deepak on these social platforms:\n\n• Instagram: @${portfolioContent.socialMedia.instagram}\n• LinkedIn: linkedin.com/in/${portfolioContent.socialMedia.linkedin}\n• GitHub: github.com/${portfolioContent.socialMedia.github}\n• X/Twitter: @${portfolioContent.socialMedia.twitter}\n\nFeel free to follow or connect!`
    ]
  };

  const contactPrompts = [
    "I'd be happy to help you get in touch with Deepak! First, could you tell me your name?",
    "Thanks! Could you provide your email address so Deepak can reach you?",
    "Finally, what message would you like to send to Deepak?",
    "Thanks for providing your information! Here's what I've collected:\n\nName: {{name}}\nEmail: {{email}}\nMessage: {{message}}\n\nIs this correct? (yes/no)"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize EmailJS once when component mounts
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY); // Initialize with your public key from env
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const getRandomResponse = (category) => {
    const responses = chatResponses[category] || chatResponses.default;
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const determineResponseType = (input) => {
    const lowerInput = input.toLowerCase();
    
    // Smart commands
    if (/^show my resume$|^show resume$|^view resume$/i.test(lowerInput)) {
      return 'resume';
    } else if (/^explain my projects$|^tell me about projects$|^show projects$/i.test(lowerInput)) {
      return 'projects';
    } else if (/^give me contact info$|^contact information$|^how to contact$/i.test(lowerInput)) {
      return 'contact';
    } else if (/^list skills$|^what are my skills$|^show skills$/i.test(lowerInput)) {
      return 'skills';
    } else if (/^explain experience$|^work history$|^job experience$/i.test(lowerInput)) {
      return 'experience';
    } else if (/^social media$|^social accounts$|^social profiles$/i.test(lowerInput)) {
      return 'socialMedia';
    }
    
    // Regular keyword matching
    else if (/hi|hello|hey|greetings/i.test(lowerInput)) {
      return 'greeting';
    } else if (/latest project|newest project|recent work/i.test(lowerInput)) {
      return 'latestProject';
    } else if (/project|portfolio|work on|app|website|developed|build/i.test(lowerInput)) {
      return 'projects';
    } else if (/tech stack|technologies|tools used|built with|framework|library/i.test(lowerInput)) {
      return 'techStack';
    } else if (/speciali[sz]e|focus|expert|good at/i.test(lowerInput)) {
      return 'specialization';
    } else if (/education|degree|university|college|school|academic|study|studied|learn|certification|diploma|graduate/i.test(lowerInput)) {
      return 'education';
    } else if (/skill|technology|tech stack|know|experience with/i.test(lowerInput)) {
      return 'skills';
    } else if (/work experience|job|career|work history|company|employment|position|role|professional experience/i.test(lowerInput)) {
      return 'experience';
    } else if (/contact|email|reach|get in touch|connect|hire|work with|message|reach out/i.test(lowerInput)) {
      return 'contact';
    } else if (/resume|cv|download/i.test(lowerInput)) {
      return 'resume';
    } else if (/social media|instagram|linkedin|github|twitter|x|social|profile|follow|connect with|account/i.test(lowerInput)) {
      return 'socialMedia';
    } else if (/bye|goodbye|see you|farewell|thanks|thank you/i.test(lowerInput)) {
      return 'goodbye';
    } else {
      // Check if we can provide contextual suggestions based on current section
      const currentSection = detectCurrentSection();
      if (currentSection) {
        return 'contextual_' + currentSection;
      }
      return 'default';
    }
  };

  // Function to detect which section of the portfolio the user is currently viewing
  const detectCurrentSection = () => {
    try {
      // Get visible sections by checking their position on screen
      const sections = {
        'home': document.getElementById('home'),
        'about-me': document.getElementById('about-me'),
        'testimonials': document.getElementById('testimonials'), // This is Skills section
        'experience': document.getElementById('experience'),
        'projects': document.getElementById('projects'),
        'contact': document.getElementById('contact')
      };
      
      // Check which section is currently in viewport
      for (const [id, element] of Object.entries(sections)) {
        if (element && isElementInViewport(element)) {
          return id;
        }
      }
      return null;
    } catch (e) {
      // In case of error, don't break the chat functionality
      console.error("Error in detecting section:", e);
      return null;
    }
  };
  
  // Helper function to check if an element is in viewport
  const isElementInViewport = (el) => {
    try {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    } catch (e) {
      return false;
    }
  };

  const processContactInput = (input) => {
    // If this is the first prompt and input is empty, just show the prompt
    if (contactStep === 0 && input === '') {
      const botMessage = { 
        id: messages.length + 1, 
        type: 'bot', 
        text: contactPrompts[0]
      };
      setMessages(prev => [...prev, botMessage]);
      return;
    }
    
    // Process input based on current step
    if (input !== '') {
      switch(contactStep) {
        case 0:
          // Store name
          setContactInfo(prev => ({ ...prev, name: input }));
          
          // Increment step
          setContactStep(1);
          
          // Show next prompt
          const nameResponse = { 
            id: messages.length + 1, 
            type: 'bot', 
            text: contactPrompts[1]
          };
          setMessages(prev => [...prev, nameResponse]);
          break;
          
        case 1:
          // Email validation
          if (!isValidEmail(input)) {
            const invalidEmailResponse = { 
              id: messages.length + 1, 
              type: 'bot', 
              text: "That doesn't appear to be a valid email address. Please provide a valid email so Deepak can get back to you."
            };
            setMessages(prev => [...prev, invalidEmailResponse]);
          } else {
            // Store email
            setContactInfo(prev => ({ ...prev, email: input }));
            
            // Increment step
            setContactStep(2);
            
            // Show next prompt
            const emailResponse = { 
              id: messages.length + 1, 
              type: 'bot', 
              text: contactPrompts[2]
            };
            setMessages(prev => [...prev, emailResponse]);
          }
          break;
          
        case 2:
          // Store message
          setContactInfo(prev => ({ ...prev, message: input }));
          
          // Increment step
          setContactStep(3);
          
          // Show confirmation prompt
          const confirmationText = contactPrompts[3]
            .replace('{{name}}', contactInfo.name)
            .replace('{{email}}', contactInfo.email)
            .replace('{{message}}', input);
            
          const confirmationResponse = { 
            id: messages.length + 1, 
            type: 'bot', 
            text: confirmationText
          };
          setMessages(prev => [...prev, confirmationResponse]);
          break;
          
        case 3:
          // Check if user confirmed
          if (/yes|correct|right|looks good|send it/i.test(input)) {
            // Send email
            const templateParams = {
              from_name: contactInfo.name,
              from_email: contactInfo.email,
              message: contactInfo.message
            };
            
            emailjs.send(
              import.meta.env.VITE_EMAILJS_SERVICE_ID_CHAT, 
              import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CHAT, 
              templateParams
            )
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
              
                // Show success message
                const successResponse = { 
                  id: messages.length + 1, 
                type: 'bot', 
                  text: "Great! I've sent your message to Deepak. He'll get back to you soon! Is there anything else I can help you with?"
              };
                setMessages(prev => [...prev, successResponse]);
              
                // Reset contact mode
              setContactMode(false);
              setContactStep(0);
              setContactInfo({
                name: '',
                email: '',
                message: ''
              });
              }, (err) => {
                console.log('FAILED...', err);
              
                // Show error message
                const errorResponse = { 
                  id: messages.length + 1, 
                type: 'bot', 
                  text: "I'm sorry, there was an error sending your message. Please try again later or contact Deepak directly at dkilaru@hawk.iit.edu."
              };
                setMessages(prev => [...prev, errorResponse]);
              
                // Reset contact mode
              setContactMode(false);
              setContactStep(0);
            });
          } else {
            // User wants to change something
            const editResponse = { 
              id: messages.length + 1, 
                type: 'bot', 
              text: "No problem! Let's start over. What's your name?"
              };
            setMessages(prev => [...prev, editResponse]);
              
            // Reset to step 0
            setContactStep(0);
              setContactInfo({
                name: '',
                email: '',
                message: ''
              });
          }
          break;
          
        default:
          break;
      }
    }
  };
  
  // Helper function to validate email
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Add a function to gather portfolio data dynamically
  const gatherPortfolioData = () => {
    try {
      // Attempt to gather data directly from the DOM when possible
      const sections = {
        'home': document.getElementById('home'),
        'about-me': document.getElementById('about-me'),
        'testimonials': document.getElementById('testimonials'),
        'experience': document.getElementById('experience'),
        'projects': document.getElementById('projects'),
        'contact': document.getElementById('contact')
      };
      
      // Extract experience data if available
      let experienceData = [];
      if (sections.experience) {
        const experienceItems = sections.experience.querySelectorAll('.experience-item');
        if (experienceItems && experienceItems.length) {
          experienceItems.forEach(item => {
            try {
              const company = item.querySelector('.company-name')?.textContent;
              const position = item.querySelector('.position')?.textContent;
              const period = item.querySelector('.period')?.textContent;
              const details = Array.from(item.querySelectorAll('.details li')).map(li => li.textContent);
              
              if (company) {
                experienceData.push({ company, position, period, details });
              }
            } catch (e) {
              console.error("Error extracting experience item:", e);
            }
          });
        }
      }
      
      // Extract project data if available
      let projectData = [];
      if (sections.projects) {
        const projectItems = sections.projects.querySelectorAll('.project-card');
        if (projectItems && projectItems.length) {
          projectItems.forEach(item => {
            try {
              const title = item.querySelector('.project-title')?.textContent;
              const description = item.querySelector('.project-description')?.textContent;
              const technologies = Array.from(item.querySelectorAll('.tech-tag')).map(tag => tag.textContent);
              
              if (title) {
                projectData.push({ title, description, technologies });
              }
            } catch (e) {
              console.error("Error extracting project item:", e);
            }
          });
        }
      }

      // Update portfolio content with any dynamically gathered data
      if (experienceData.length > 0) {
        portfolioContent.workExperience = experienceData.map(exp => ({
          company: exp.company,
          position: exp.position || "Not specified",
          duration: exp.period || "Not specified",
          responsibilities: exp.details || []
        }));
      }
      
      if (projectData.length > 0) {
        portfolioContent.projects = projectData.map(proj => ({
          name: proj.title,
          description: proj.description || "A portfolio project",
          technologies: proj.technologies || [],
          highlights: "Featured project in portfolio"
        }));
      }
      
      return true;
    } catch (e) {
      console.error("Error gathering portfolio data:", e);
      return false;
    }
  };

  // Try to gather dynamic data on initial load
  useEffect(() => {
    // Wait for DOM to be fully loaded
    setTimeout(() => {
      gatherPortfolioData();
    }, 2000);
  }, []);
  
  // Gather data again when chat is opened
  useEffect(() => {
    if (isOpen) {
      gatherPortfolioData();
    }
  }, [isOpen]);

  // Add web information simulation
  const webInformationSources = {
    tech: [
      {
        topic: "react",
        info: "React is currently at version 18.2, with React 19 in alpha stage. The latest trends include Server Components, React Query for data fetching, and increased focus on performance with features like automatic batching."
      },
      {
        topic: "javascript",
        info: "JavaScript's latest ECMAScript standard is ES2023, introducing features like Array.prototype.findLast(), Array.prototype.toSorted() (non-mutating sort), and improvements to the RegExp /v flag."
      },
      {
        topic: "ai",
        info: "The AI industry is rapidly evolving with developments in generative AI like GPT-4o, Claude 3 Opus, and open-source models like Llama 3. Key trends include multimodal capabilities, better reasoning, and finetuning for specialized tasks."
      },
      {
        topic: "cloud",
        info: "Cloud computing is trending toward serverless architectures, edge computing, and AI integration. Major providers (AWS, Azure, GCP) are expanding their AI services, while cost optimization and sustainability are becoming key concerns."
      },
      {
        topic: "machine learning",
        info: "Recent advances in machine learning include foundation models, few-shot learning, and attention mechanisms. MLOps practices are becoming standard, and there's increasing focus on responsible AI and explainability."
      }
    ],
    career: [
      {
        topic: "software engineering",
        info: "The software engineering job market remains strong with median salaries around $130,000 in the US. Remote work options continue to be prevalent, with skills in AI/ML, cloud architecture, and fullstack development being highly sought after."
      },
      {
        topic: "interview",
        info: "Modern tech interviews are evolving beyond whiteboard coding to include take-home assignments, pair programming, and system design discussions. Companies are increasingly valuing soft skills and cultural fit alongside technical expertise."
      },
      {
        topic: "salary",
        info: "For experienced software engineers, salary ranges typically fall between $120,000-$180,000 base, with total compensation potentially higher at larger tech companies. Factors like location, company size, and specialized skills significantly impact compensation."
      }
    ],
    industry: [
      {
        topic: "startups",
        info: "The startup ecosystem is seeing increased focus on AI applications, climate tech, and healthcare innovation. Funding has become more selective in 2023-2024 compared to previous years, with investors emphasizing sustainable business models and path to profitability."
      },
      {
        topic: "tech trends",
        info: "Current technology trends include AI integration across all sectors, increased adoption of AR/VR technologies, focus on cybersecurity in response to sophisticated threats, and continued expansion of IoT and edge computing applications."
      }
    ],
    general: [
      {
        topic: "portfolio",
        info: "A portfolio website showcases a person's work, skills, and achievements. For developers, it typically includes projects, technical skills, work experience, and contact information. A good portfolio demonstrates technical abilities and also gives a sense of the person's style and approach to problem-solving."
      },
      {
        topic: "web development",
        info: "Web development involves creating and maintaining websites and web applications. It includes frontend development (HTML, CSS, JavaScript), backend development (server-side logic, databases), and fullstack development (both). Modern web development often uses frameworks like React, Angular, or Vue for frontend and Node.js, Django, or Ruby on Rails for backend."
      },
      {
        topic: "software development",
        info: "Software development is the process of designing, coding, testing, and maintaining computer software. It follows methodologies like Agile or Waterfall and includes stages such as requirements gathering, design, implementation, testing, deployment, and maintenance. Key principles include DRY (Don't Repeat Yourself), SOLID, and writing clean, maintainable code."
      },
      {
        topic: "resume",
        info: "A strong technical resume should be concise (1-2 pages), highlight relevant skills and experience, quantify achievements, include keywords from job descriptions, and be tailored to specific roles. It should include sections for technical skills, work experience, education, and notable projects or achievements."
      },
      {
        topic: "learning",
        info: "Effective ways to learn programming include: building real projects, contributing to open source, pair programming, teaching others what you've learned, reading documentation and books, taking focused online courses, consistent daily practice, and joining developer communities for feedback and support."
      }
    ],
    coding: [
      {
        topic: "java",
        info: "Java is an object-oriented programming language widely used for enterprise applications, Android development, and backend services. It's known for its 'write once, run anywhere' capability through the Java Virtual Machine (JVM). Recent versions have added features like lambdas, streams, and modules to modernize the language."
      },
      {
        topic: "python",
        info: "Python is a high-level, interpreted language known for its readability and versatility. It's widely used in data science, machine learning, web development, automation, and scripting. Python 3.11 and 3.12 brought significant performance improvements and new features like pattern matching and better error messages."
      },
      {
        topic: "node",
        info: "Node.js is a JavaScript runtime built on Chrome's V8 engine that allows developers to run JavaScript on the server. It's known for its non-blocking, event-driven architecture that makes it efficient for I/O-intensive applications like web servers. The Node.js ecosystem includes npm, one of the largest package repositories in the world."
      },
      {
        topic: "database",
        info: "Modern database technologies include SQL databases (PostgreSQL, MySQL, SQL Server) for structured data with relations, NoSQL databases (MongoDB, Cassandra) for flexible schemas and horizontal scaling, NewSQL solutions combining SQL and NoSQL benefits, and specialized databases like time-series (InfluxDB), graph (Neo4j), and vector databases (Pinecone) for AI applications."
      }
    ]
  };

  // Function to simulate gathering information from the web with improved matching
  const simulateWebSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    
    // Enhanced topic detection
    const findTopicMatches = () => {
      let bestMatch = null;
      let bestScore = 0;
      
      // Search through our simulated "web information"
      for (const category in webInformationSources) {
        for (const item of webInformationSources[category]) {
          // Check for exact topic match
          if (lowerQuery.includes(item.topic)) {
            // Score based on how central the topic is to the question
            const score = 10 - Math.abs(lowerQuery.indexOf(item.topic) - lowerQuery.length/2) / lowerQuery.length * 10;
            if (score > bestScore) {
              bestScore = score;
              bestMatch = item;
            }
          }
          
          // Check for related terms
          const relatedTerms = getRelatedTerms(item.topic);
          for (const term of relatedTerms) {
            if (lowerQuery.includes(term)) {
              // Lower score for related terms
              const score = (7 - Math.abs(lowerQuery.indexOf(term) - lowerQuery.length/2) / lowerQuery.length * 7) * 0.8;
              if (score > bestScore) {
                bestScore = score;
                bestMatch = item;
              }
            }
          }
        }
      }
      
      return bestMatch;
    };
    
    // Get related terms for topic matching
    const getRelatedTerms = (topic) => {
      const relatedTermsMap = {
        "react": ["react.js", "reactjs", "jsx", "component", "hooks", "frontend framework"],
        "javascript": ["js", "ecmascript", "typescript", "frontend", "scripting"],
        "ai": ["artificial intelligence", "ml", "deep learning", "neural networks", "gpt"],
        "machine learning": ["ml", "ai", "neural networks", "data science", "training models"],
        "cloud": ["aws", "azure", "gcp", "serverless", "iaas", "paas"],
        "software engineering": ["coding", "programming", "software development", "engineering", "coding"],
        "interview": ["job interview", "technical interview", "hiring", "coding challenge"],
        "salary": ["compensation", "pay", "income", "money", "earnings"],
        "startups": ["startup", "entrepreneurship", "founder", "venture capital", "seed funding"],
        "tech trends": ["technology trends", "emerging tech", "future tech", "innovation"],
        "portfolio": ["personal website", "showcase", "developer portfolio", "work samples"],
        "web development": ["web dev", "frontend", "backend", "fullstack", "website creation"],
        "software development": ["software engineering", "coding", "programming", "development"],
        "resume": ["cv", "curriculum vitae", "job application", "professional summary"],
        "learning": ["study", "tutorial", "education", "course", "skill development"],
        "java": ["jvm", "object oriented", "enterprise", "spring", "jakarta ee"],
        "python": ["py", "scripting", "data science", "django", "flask"],
        "node": ["node.js", "nodejs", "javascript backend", "npm", "server-side javascript"],
        "database": ["db", "sql", "nosql", "data storage", "dbms", "persistence"]
      };
      
      return relatedTermsMap[topic] || [];
    };
    
    // Try to find matching topics
    const matchedTopic = findTopicMatches();
    
    if (matchedTopic) {
      return formatWebResponse(matchedTopic.info, matchedTopic.topic);
    }
    
    // If we don't have a match but it looks like a general knowledge question,
    // return a thoughtful response that acknowledges limitations
    if (isGeneralKnowledgeQuestion(lowerQuery)) {
      return formatLimitedResponse(lowerQuery);
    }
    
    return null;
  };
  
  // Helper to detect if this is likely a general knowledge question
  const isGeneralKnowledgeQuestion = (query) => {
    const generalPatterns = [
      /what is|what are|how to|how do|explain|tell me about|describe|define|who is|why is|when was|where is/i,
      /difference between|compare|versus|vs\./i,
      /best way to|tips for|advice on|guide to/i,
      /meaning of|definition of|purpose of/i
    ];
    
    return generalPatterns.some(pattern => pattern.test(query));
  };
  
  // Format web responses to appear more natural
  const formatWebResponse = (info, topic) => {
    const intros = [
      `Here's what I know about ${topic}:\n\n`,
      `I can share some information about ${topic}:\n\n`,
      `Regarding ${topic}:\n\n`,
      `About ${topic}:\n\n`,
      `On the topic of ${topic}:\n\n`
    ];
    
    const followups = [
      `\n\nIs there anything specific about ${topic} you'd like to know?`,
      `\n\nDo you have any specific questions about this?`,
      `\n\nCan I clarify anything else about ${topic}?`,
      `\n\nWould you like more details on any aspect of this?`
    ];
    
    const intro = intros[Math.floor(Math.random() * intros.length)];
    const followup = followups[Math.floor(Math.random() * followups.length)];
    
    return `${intro}${info}${followup}`;
  };
  
  // Format response for questions we don't have data for
  const formatLimitedResponse = (query) => {
    const responses = [
      `That's an interesting question! While I focus primarily on helping you explore Deepak's portfolio and background, I can try to provide a general perspective:\n\nThis topic may involve multiple considerations and approaches. I'd recommend researching current sources for the most accurate and up-to-date information.\n\nWould you like to return to discussing Deepak's work and experience?`,
      
      `Great question! I specialize in providing information about Deepak's portfolio, skills, and background. For this specific topic, you might want to check specialized resources for the most current information.\n\nIs there anything about Deepak's work or skills that I can help with instead?`,
      
      `I appreciate your curiosity! While my primary purpose is to help you navigate Deepak's portfolio and professional background, this appears to be a more general question.\n\nFor the most accurate information on this topic, consulting specialized resources would be ideal.\n\nCan I tell you about Deepak's projects or experience instead?`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getResponse = (category, context = {}) => {
    // Always try to gather fresh data before responding
    gatherPortfolioData();
    
    // For certain queries, generate a more dynamic, custom response
    switch(category) {
      case 'experience':
        return generateExperienceResponse(context);
      case 'projects':
        return generateProjectsResponse(context);
      case 'skills':
        return generateSkillsResponse(context);
      case 'education':
        return generateEducationResponse();
      default:
        return getRandomResponse(category);
    }
  };
  
  // Generate custom responses for different categories
  const generateExperienceResponse = (context = {}) => {
    const { company } = context;
    
    // If looking for a specific company, provide details just for that company
    if (company) {
      const companyData = portfolioContent.workExperience.find(
        exp => exp.company.toLowerCase().includes(company.toLowerCase())
      );
      
      if (companyData) {
        return `About Deepak's work at ${companyData.company}:\n\n• Position: ${companyData.position}\n• Period: ${companyData.duration}\n\nKey responsibilities:\n• ${companyData.responsibilities.join('\n• ')}`;
      }
    }
    
    // Default to showing all experience
    return chatResponses.experience[0];
  };
  
  const generateProjectsResponse = (context = {}) => {
    const { project, technology } = context;
    
    // If looking for a specific project, provide those details
    if (project) {
      const projectData = portfolioContent.projects.find(
        p => p.name.toLowerCase().includes(project.toLowerCase())
      );
      
      if (projectData) {
        return `About the ${projectData.name} project:\n\n${projectData.description}\n\nTechnologies used:\n• ${projectData.technologies.join('\n• ')}\n\n${projectData.highlights}`;
      }
    }
    
    // If looking for projects with a specific technology
    if (technology) {
      const relevantProjects = portfolioContent.projects.filter(
        p => p.technologies.some(tech => tech.toLowerCase().includes(technology.toLowerCase()))
      );
      
      if (relevantProjects.length > 0) {
        return `Projects where Deepak used ${technology}:\n\n${
          relevantProjects.map(p => `• ${p.name}: ${p.description.substring(0, 100)}...`).join('\n\n')
        }`;
      }
    }
    
    // Default to showing all projects
    return chatResponses.projects[0];
  };
  
  const generateSkillsResponse = (context = {}) => {
    const { category } = context;
    
    // If looking for a specific skill category
    if (category && portfolioContent.techStack[category.toLowerCase()]) {
      const skills = portfolioContent.techStack[category.toLowerCase()];
      return `Deepak's ${category} skills include:\n\n• ${skills.join('\n• ')}`;
    }
    
    // Default to showing all skills
    return chatResponses.skills[0];
  };
  
  const generateEducationResponse = () => {
    return chatResponses.education[0];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = { id: messages.length + 1, type: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    
    const userInput = inputValue;
    setInputValue('');
    
    // Show typing indicator
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      // Handle contact mode
      if (contactMode) {
        processContactInput(userInput);
        return;
      }
      
      // Check if this looks like a general knowledge question
      const webSearchTerms = ["what is", "how does", "tell me about", "latest", "current", "trends", "news", "explain", "when was", "who is"];
      const mightBeGeneralQuestion = webSearchTerms.some(term => userInput.toLowerCase().includes(term));
      
      // If it might be a general question, attempt to simulate web search
      if (mightBeGeneralQuestion) {
        const webResult = simulateWebSearch(userInput);
        
        if (webResult) {
          // Show a "searching" indicator before displaying results
          setIsTyping(true);
          
          setTimeout(() => {
            setIsTyping(false);
            
            // Add a message indicating the AI is searching the web
            const searchingMessage = { 
              id: messages.length + 2, 
              type: 'bot', 
              text: webResult
            };
            setMessages(prev => [...prev, searchingMessage]);
          }, 1500 + Math.random() * 1000); // Slightly longer delay to simulate web search
          
          return;
        }
      }
      
      // Extract context from the user's message
      const context = extractContextFromMessage(userInput);
      
      // Determine response for regular mode
      const responseType = determineResponseType(userInput);
      
      // If user wants to contact, check if they're just asking for email
      if (responseType === 'contact') {
        // Check if user is just asking for email or wants to send a message
        const lowerInput = userInput.toLowerCase();
        const wantsToSendMessage = /send|message|get in touch|form|fill out|submit|contact form/i.test(lowerInput);
        
        if (wantsToSendMessage) {
          // User wants to fill out contact form
          setContactMode(true);
          processContactInput(''); // Start the contact flow
          return;
        } else {
          // User just wants the email, provide it directly
          const botResponse = { 
            id: messages.length + 2, 
            type: 'bot', 
            text: getRandomResponse('contact')
          };
          setMessages(prev => [...prev, botResponse]);
          return;
        }
      }
      
      // Add bot response for regular mode using the enhanced getResponse function
      const botResponse = { 
        id: messages.length + 2, 
        type: 'bot', 
        text: getResponse(responseType, context)
      };
      
      // If it's a resume request, add download button
      if (responseType === 'resume') {
        botResponse.action = 'resume';
      }
      
      setMessages(prev => [...prev, botResponse]);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };
  
  // Extract context from user message to provide more specific responses
  const extractContextFromMessage = (message) => {
    const lowerMessage = message.toLowerCase();
    let context = {};
    
    // Check for company names in experience questions
    portfolioContent.workExperience.forEach(exp => {
      if (lowerMessage.includes(exp.company.toLowerCase())) {
        context.company = exp.company;
      }
    });
    
    // Check for project names in project questions
    portfolioContent.projects.forEach(proj => {
      if (lowerMessage.includes(proj.name.toLowerCase())) {
        context.project = proj.name;
      }
    });
    
    // Check for technology mentions
    ['frontend', 'backend', 'devops', 'cloud', 'databases'].forEach(category => {
      if (lowerMessage.includes(category)) {
        context.category = category;
      }
      
      portfolioContent.techStack[category].forEach(tech => {
        if (lowerMessage.includes(tech.toLowerCase())) {
          context.technology = tech;
        }
      });
    });
    
    return context;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleOptionClick = (option) => {
    // Add the selected option as a user message
    const userMessage = { 
      id: messages.length + 1, 
      type: 'user', 
      text: option.text 
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      if (option.value === 'portfolio') {
        // Send portfolio introduction message
        const botResponse = { 
          id: messages.length + 2, 
          type: 'bot', 
          text: "Great! I'd be happy to tell you about Deepak. What would you like to know about?\n\n• Skills & Technologies\n• Projects\n• Work Experience\n• Education\n\nOr you can ask me a specific question about Deepak's background or expertise."
        };
        setMessages(prev => [...prev, botResponse]);
      } else if (option.value === 'contact') {
        // Start contact form flow
        setContactMode(true);
        processContactInput('');
      }
    }, 1000);
  };

  return (
    <div className="fixed right-4 bottom-4 z-50">
      {/* Chat Bubble */}
      {!isOpen && (
        <div 
          onClick={toggleChat}
          className={`flex items-center cursor-pointer transition-opacity duration-300 p-3 rounded-full ${
            isDarkMode ? 'bg-gradient-to-r from-cyan-600 to-purple-600' : 'bg-gradient-to-r from-cyan-500 to-purple-500'
          } shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}
        >
          <div className="mr-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <span className="text-2xl">🤖</span>
            </div>
          </div>
          <div className={`text-white max-w-[180px]`}>
            <p className="font-medium text-sm">Hi, I'm Deepu — Deepak's portfolio bot. Want to chat?</p>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {isOpen && (
        <div className={`rounded-xl shadow-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} w-80 md:w-96 overflow-hidden flex flex-col`} style={{ height: '500px', maxHeight: '80vh' }}>
          {/* Chat Header */}
          <div className={`p-4 ${isDarkMode ? 'bg-gradient-to-r from-cyan-700 to-purple-700' : 'bg-gradient-to-r from-cyan-500 to-purple-500'} text-white flex items-center justify-between`}>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3">
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <h3 className="font-semibold">Deepu</h3>
                <p className="text-xs opacity-80">
                  {contactMode ? "Contact Assistant" : "Portfolio Assistant"}
                </p>
              </div>
            </div>
            <button 
              onClick={toggleChat} 
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Chat Messages */}
          <div 
            className={`flex-1 p-4 overflow-y-auto ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
            style={{ scrollBehavior: 'smooth' }}
          >
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`rounded-lg px-4 py-2 max-w-[85%] ${
                    message.type === 'user' 
                      ? `${isDarkMode ? 'bg-purple-600' : 'bg-purple-500'} text-white` 
                      : `${isDarkMode ? 'bg-gray-700' : 'bg-white'} ${isDarkMode ? 'text-white' : 'text-gray-800'} shadow`
                  }`}
                >
                  <p className="whitespace-pre-line">{message.text}</p>
                  
                  {message.action === 'resume' && (
                    <a 
                      href="https://drive.google.com/file/d/1IyTVLQiJhc2-Z3C78y2diijVFG5_LiVV/view?usp=drive_link" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-2 inline-flex items-center justify-center w-full py-2 px-3 rounded-md ${
                        isDarkMode ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-cyan-500 hover:bg-cyan-600'
                      } text-white text-sm font-medium transition-colors`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      View Resume
                    </a>
                  )}
                  
                  {message.options && message.options.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleOptionClick(option)}
                          className={`w-full text-left py-2 px-3 rounded-md text-white text-sm font-medium transition-colors ${
                            isDarkMode 
                              ? 'bg-gray-600 hover:bg-gray-500' 
                              : 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600'
                          }`}
                        >
                          {option.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="mb-4 flex justify-start">
                <div className={`rounded-lg px-4 py-2 ${isDarkMode ? 'bg-gray-700' : 'bg-white'} ${isDarkMode ? 'text-white' : 'text-gray-800'} shadow`}>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '200ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '400ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat Input */}
          <div className={`p-3 border-t ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} flex items-center`}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={contactMode ? `Type your ${contactStep === 0 ? 'name' : contactStep === 1 ? 'email' : contactStep === 2 ? 'message' : 'yes/no'}...` : "Type a message..."}
              className={`flex-1 py-2 px-3 rounded-full ${
                isDarkMode 
                  ? 'bg-gray-800 text-white border-gray-700 focus:ring-cyan-600' 
                  : 'bg-gray-100 text-gray-800 border-gray-200 focus:ring-cyan-500'
              } border focus:outline-none focus:ring-2`}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className={`ml-2 p-2 rounded-full ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700' 
                  : 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600'
              } text-white disabled:opacity-50 transition-colors`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 