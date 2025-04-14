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
  
  // Config status
  const [showConfigWarning, setShowConfigWarning] = useState(false);
  
  // Contact form state
  const [contactMode, setContactMode] = useState(false);
  const [contactStep, setContactStep] = useState(0);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '', // Added phone field
    message: ''
  });
  
  // AI provider config (hidden from UI but used internally)
  const [aiProvider, setAiProvider] = useState('openai'); // 'openai' or 'dialogflow'
  
  // UI text constants
  const UI_TEXT = {
    typing: "Deepu is typing...",
    inputPlaceholder: "Type your message...",
    confirmation: "Thanks! Your message was received. Deepak will get back to you soon."
  };
  
  // Contact prompts
  const contactPrompts = [
    "I'd be happy to help you get in touch with Deepak! First, could you tell me your name?",
    "Thanks! Could you provide your email address so Deepak can reach you?",
    "If you'd like, please provide your phone number (optional):",
    "Finally, what message would you like to send to Deepak?",
    "Thanks for providing your information! Here's what I've collected:\n\nName: {{name}}\nEmail: {{email}}\nPhone: {{phone}}\nMessage: {{message}}\n\nIs this correct? (yes/no)"
  ];
  
  // Language state
  const [language, setLanguage] = useState('en'); // 'en', 'hi', 'te'
  
  // Suggestions based on context
  const [quickSuggestions, setQuickSuggestions] = useState([
    "What tech stack do you use?",
    "Can I see his projects?",
    "Where is Deepak based?"
  ]);
  
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
      databases: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"],
      other: ["Agile SDLC", "Scrum", "Kanban", "Waterfall", "JIRA", "GitHub", "Linux", "Rest APIs", "Microservices Architecture", "Redis", "Spark", "Splunk", "TDD", "BDD"]
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
      github: "deepakreddy21",
      twitter: "kdr_9837"
    }
  };
  
  // Multi-language support
  const translations = {
    en: {
      greeting: "👋 Hi there! I'm Deepu, Deepak's portfolio assistant. How can I help you today?",
      typing: "Deepu is typing...",
      inputPlaceholder: "Type your message...",
      sendButton: "Send",
      suggestions: {
        techStack: "What tech stack do you use?",
        projects: "Can I see his projects?",
        location: "Where is Deepak based?"
      },
      contactPrompts: [
        "I'd be happy to help you get in touch with Deepak! First, could you tell me your name?",
        "Thanks! Could you provide your email address so Deepak can reach you?",
        "If you'd like, please provide your phone number (optional):",
        "Finally, what message would you like to send to Deepak?",
        "Thanks for providing your information! Here's what I've collected:\n\nName: {{name}}\nEmail: {{email}}\nPhone: {{phone}}\nMessage: {{message}}\n\nIs this correct? (yes/no)"
      ],
      confirmation: "Thanks! Your message was received. Deepak will get back to you soon."
    },
    hi: {
      greeting: "👋 नमस्ते! मैं दीपु हूं, दीपक का पोर्टफोलियो सहायक। मैं आपकी किस प्रकार सहायता कर सकता हूं?",
      typing: "दीपु लिख रहा है...",
      inputPlaceholder: "अपना संदेश लिखें...",
      sendButton: "भेजें",
      suggestions: {
        techStack: "आप किस तकनीकी स्टैक का उपयोग करते हैं?",
        projects: "मैं उनके प्रोजेक्ट्स देख सकता हूं?",
        location: "दीपक कहां स्थित हैं?"
      },
      contactPrompts: [
        "मैं आपको दीपक से संपर्क करने में मदद करूंगा! सबसे पहले, क्या आप अपना नाम बता सकते हैं?",
        "धन्यवाद! क्या आप अपना ईमेल पता प्रदान कर सकते हैं ताकि दीपक आपसे संपर्क कर सकें?",
        "यदि आप चाहें, तो कृपया अपना फोन नंबर प्रदान करें (वैकल्पिक):",
        "अंत में, आप दीपक को क्या संदेश भेजना चाहते हैं?",
        "जानकारी प्रदान करने के लिए धन्यवाद! यहां वह जानकारी है जो मैंने एकत्र की है:\n\nनाम: {{name}}\nईमेल: {{email}}\nफोन: {{phone}}\nसंदेश: {{message}}\n\nक्या यह सही है? (हां/नहीं)"
      ],
      confirmation: "धन्यवाद! आपका संदेश प्राप्त हो गया है। दीपक जल्द ही आपसे संपर्क करेंगे।"
    },
    te: {
      greeting: "👋 హలో! నేను దీపు, దీపక్ పోర్ట్‌ఫోలియో సహాయకుడిని. నేను మీకు ఎలా సహాయం చేయగలను?",
      typing: "దీపు టైప్ చేస్తున్నాడు...",
      inputPlaceholder: "మీ సందేశాన్ని టైప్ చేయండి...",
      sendButton: "పంపు",
      suggestions: {
        techStack: "మీరు ఏ టెక్ స్టాక్ ఉపయోగిస్తారు?",
        projects: "నేను అతని ప్రాజెక్ట్‌లను చూడగలనా?",
        location: "దీపక్ ఎక్కడ ఉన్నాడు?"
      },
      contactPrompts: [
        "మిమ్మల్ని దీపక్‌తో సంప్రదించడంలో సహాయపడటానికి నేను సంతోషిస్తున్నాను! మొదట, మీ పేరు చెప్పగలరా?",
        "ధన్యవాదాలు! దీపక్ మిమ్మల్ని సంప్రదించగలిగేలా మీ ఇమెయిల్ చిరునామాను అందించగలరా?",
        "మీరు కోరుకుంటే, దయచేసి మీ ఫోన్ నంబర్‌ను అందించండి (ఐచ్ఛికం):",
        "చివరగా, మీరు దీపక్‌కి ఏ సందేశాన్ని పంపాలనుకుంటున్నారు?",
        "మీ సమాచారాన్ని అందించినందుకు ధన్యవాదాలు! ఇదిగో నేను సేకరించిన సమాచారం:\n\nపేరు: {{name}}\nఇమెయిల్: {{email}}\nఫోన్: {{phone}}\nసందేశం: {{message}}\n\nఇది సరైనదేనా? (అవును/కాదు)"
      ],
      confirmation: "ధన్యవాదాలు! మీ సందేశం అందింది. దీపక్ త్వరలో మిమ్మల్ని సంప్రదిస్తారు."
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
      `Deepak is skilled in:\n\n• Frontend: ${portfolioContent.techStack.frontend.join(', ')}\n• Backend: ${portfolioContent.techStack.backend.join(', ')}\n• DevOps: ${portfolioContent.techStack.devops.join(', ')}\n• Cloud: ${portfolioContent.techStack.cloud.join(', ')}\n• Databases: ${portfolioContent.techStack.databases.join(', ')}\n• Other Technologies: ${portfolioContent.techStack.other.join(', ')}\n\nNeed any details on these?`
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
      "You can contact Deepak directly at deepakreddyiitc1234@gmail.com. Do you need any other information?",
      "Deepak's email is deepakreddyiitc1234@gmail.com. Feel free to reach out to him directly!"
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
      "I'm Deepak's portfolio assistant and can only answer questions about his skills, projects, experience, and background. I'm not able to provide information on other topics. Feel free to ask me about his work or experience!",
      "I'm designed specifically to help with information about Deepak's portfolio. I can tell you about his skills, projects, or experience, but I can't answer questions outside that scope. What would you like to know about Deepak?",
      "As Deepak's portfolio assistant, I focus solely on providing information about his professional background and skills. For other topics, you might want to check elsewhere. Can I tell you about Deepak's projects instead?"
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

  // Check API configurations on mount
  useEffect(() => {
    // Check if either OpenAI or Dialogflow is configured
    const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const dialogflowProjectId = import.meta.env.VITE_DIALOGFLOW_PROJECT_ID;
    const dialogflowAgentId = import.meta.env.VITE_DIALOGFLOW_AGENT_ID;
    
    const isOpenAIConfigured = openaiKey && !openaiKey.includes('your_');
    const isDialogflowConfigured = dialogflowProjectId && dialogflowAgentId && 
                                !dialogflowProjectId.includes('your_') && 
                                !dialogflowAgentId.includes('your_');
    
    // Show warning if neither is configured
    if (!isOpenAIConfigured && !isDialogflowConfigured) {
      setShowConfigWarning(true);
      console.warn('Neither OpenAI nor Dialogflow is properly configured. Using built-in responses.');
    } else {
      setShowConfigWarning(false);
    }
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Toggle language
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    
    // Update greeting message
    const updatedMessages = [...messages];
    if (updatedMessages[0].type === 'bot') {
      updatedMessages[0].text = translations[lang].greeting;
    }
    setMessages(updatedMessages);
    
    // Update quick suggestions
    setQuickSuggestions([
      translations[lang].suggestions.techStack,
      translations[lang].suggestions.projects,
      translations[lang].suggestions.location
    ]);
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleOptionClick = (option) => {
    // Add the selected option as a user message
    const userMessage = { 
      id: Date.now(), 
      type: 'user', 
      text: option.text 
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Process the option value
    if (option.value === 'portfolio') {
      // Show typing indicator
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
        
        // Send portfolio introduction message
        const botResponse = {
          id: Date.now(),
          type: 'bot',
          text: "Great! I'd be happy to tell you about Deepak. What would you like to know about?\n\n• Skills & Technologies\n• Projects\n• Work Experience\n• Education\n\nOr you can ask me a specific question about Deepak's background or expertise."
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    } else if (option.value === 'contact') {
      // Start contact form flow
      setContactMode(true);
      processContactInput('');
    }
  };

  const processContactInput = (input) => {
    // If it's the initial call with empty input, just show the first prompt
    if (input === '') {
      setTimeout(() => {
        const botResponse = { 
          id: Date.now(), 
          type: 'bot', 
          text: contactPrompts[0]
        };
        setMessages(prev => [...prev, botResponse]);
      }, 500);
      return;
    }
    
    let newContactInfo = { ...contactInfo };
    let nextStep = contactStep;
    let responseText = '';
    
    switch (contactStep) {
      case 0: // Name
        newContactInfo.name = input;
        responseText = contactPrompts[1];
        nextStep = 1;
        break;
        
      case 1: // Email
        if (!isValidEmail(input)) {
          responseText = "That doesn't look like a valid email address. Could you please enter a valid email?";
        } else {
          newContactInfo.email = input;
          responseText = contactPrompts[2]; // Ask for phone (optional)
          nextStep = 2;
        }
        break;
        
      case 2: // Phone (optional)
        newContactInfo.phone = input; // Store even if empty
        responseText = contactPrompts[3]; // Ask for message
        nextStep = 3;
        break;
        
      case 3: // Message
        newContactInfo.message = input;
        responseText = contactPrompts[4]
          .replace('{{name}}', newContactInfo.name)
          .replace('{{email}}', newContactInfo.email)
          .replace('{{phone}}', newContactInfo.phone || 'Not provided')
          .replace('{{message}}', newContactInfo.message);
        nextStep = 4;
        break;
        
      case 4: // Confirmation
        if (input.toLowerCase() === 'yes' || input.toLowerCase() === 'y') {
          // Send email using EmailJS
          emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID_CHAT,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CHAT,
            {
              name: newContactInfo.name,
              email: newContactInfo.email,
              phone: newContactInfo.phone || 'Not provided',
              message: newContactInfo.message,
            }
          )
          .then((result) => {
            console.log('Email sent:', result.text);
          })
          .catch((error) => {
            console.error('Email error:', error.text);
          });
          
          responseText = UI_TEXT.confirmation;
          
          // Reset contact mode and info
          setTimeout(() => {
            setContactMode(false);
            setContactInfo({
              name: '',
              email: '',
              phone: '',
              message: ''
            });
          }, 2000);
        } else {
          responseText = "No problem, let's try again. What's your name?";
          nextStep = 0;
        }
        break;
        
      default:
        responseText = "I'm not sure what happened. Let's start over. What's your name?";
        nextStep = 0;
        setContactMode(false);
    }
    
    // Update state
    setContactInfo(newContactInfo);
    setContactStep(nextStep);
    
    // Add bot message
    setTimeout(() => {
      const botResponse = {
        id: Date.now(), 
        type: 'bot',
        text: responseText
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 800);
  };

  const isValidEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
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
    return "I'm Deepak's portfolio assistant and can only answer questions about his skills, projects, experience, and background. I'm not able to provide information on other topics. Feel free to ask me anything about Deepak's work or portfolio!";
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

  // Send message to OpenAI API
  const sendToOpenAI = async (userMessage) => {
    try {
      setIsTyping(true);
      
      // Check if API key exists
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      
      if (!apiKey || apiKey === 'your_openai_api_key_here' || apiKey.includes('your_')) {
        console.warn('OpenAI API key is missing or not configured. Using fallback response system instead.');
        // Use our built-in response system as a fallback
        const responseType = determineResponseType(userMessage);
        const contextData = extractContextFromMessage(userMessage);
        const fallbackResponse = getResponse(responseType !== 'default' ? responseType : 'greeting', contextData);
        
        // Add a note about the API key
        return fallbackResponse + "\n\n(Note: I'm currently operating with limited capabilities as my OpenAI connection isn't configured. Please add your API key to the .env file to enable full AI features.)";
      }
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { 
              role: "system", 
              content: `You are Deepu, a helpful portfolio assistant for Deepak Reddy. 
                       You should ONLY answer questions about Deepak's skills, experience, and background based on this information:
                       
                       Deepak is a Java Full Stack Developer based in Chicago, IL.
                       He has experience with React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Java, Spring Boot, Node.js, Python, Express, RESTful APIs.
                       He's worked at AbbVie (Feb 2024 - Present), BMO Harris Bank (May 2023 - Jan 2024), Airtel (Sep 2021 - Dec 2022), and CIBC Bank (Jun 2020 - Jun 2021).
                       
                       IMPORTANT: If the user asks ANYTHING that is not directly related to Deepak's portfolio, skills, projects, education, or experience, you must respond with:
                       "I'm Deepak's portfolio assistant and can only answer questions about his skills, projects, experience, and background. I'm not able to provide information on other topics. Feel free to ask me anything about Deepak's work or portfolio!"
                       
                       Keep responses concise and friendly. If you don't know something specific about Deepak, suggest contacting him directly.` 
            },
            { role: "user", content: userMessage }
          ],
          temperature: 0.7,
          max_tokens: 150
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('OpenAI API error:', errorData);
        throw new Error(`OpenAI API request failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      
      // Fall back to our built-in response system on error
      try {
        const responseType = determineResponseType(userMessage);
        const contextData = extractContextFromMessage(userMessage);
        return getResponse(responseType !== 'default' ? responseType : 'greeting', contextData);
      } catch (fallbackError) {
        return "I'm having trouble connecting right now. Could you try asking about Deepak's skills, projects, or experience instead?";
      }
    } finally {
      setIsTyping(false);
    }
  };

  // Send message to Dialogflow API
  const sendToDialogflow = async (userMessage) => {
    try {
      setIsTyping(true);
      
      // Check if Dialogflow config exists
      const projectId = import.meta.env.VITE_DIALOGFLOW_PROJECT_ID;
      const location = import.meta.env.VITE_DIALOGFLOW_LOCATION || 'global';
      const agentId = import.meta.env.VITE_DIALOGFLOW_AGENT_ID;
      const endpoint = import.meta.env.VITE_DIALOGFLOW_API_ENDPOINT;
      
      if (!projectId || !agentId || projectId.includes('your_') || agentId.includes('your_')) {
        console.warn('Dialogflow configuration is missing or not configured. Using fallback response system.');
        // Use our built-in response system as a fallback
        const responseType = determineResponseType(userMessage);
        const contextData = extractContextFromMessage(userMessage);
        const fallbackResponse = getResponse(responseType !== 'default' ? responseType : 'greeting', contextData);
        
        // Add a note about the configuration
        return fallbackResponse + "\n\n(Note: I'm currently operating with limited capabilities as my Dialogflow connection isn't configured. Please set up Dialogflow in the .env file to enable full AI features.)";
      }
      
      // For now, since proper Dialogflow authentication requires a backend service
      // We'll use our fallback system instead
      console.warn('Dialogflow integration requires backend authentication. Using fallback response system.');
      const responseType = determineResponseType(userMessage);
      const contextData = extractContextFromMessage(userMessage);
      return getResponse(responseType !== 'default' ? responseType : 'greeting', contextData) + 
             "\n\n(Note: For full Dialogflow integration, please implement proper authentication via a backend service.)";
      
      // Commented out Dialogflow implementation requiring authentication
      /*
      // Create a session ID (can be any string that identifies the conversation)
      const sessionId = 'portfolio-session-' + Date.now();
      
      // Build request URL
      const url = `${endpoint}/projects/${projectId}/locations/${location}/agents/${agentId}/sessions/${sessionId}:detectIntent`;
      
      // Make API request
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + await getDialogflowToken()
        },
        body: JSON.stringify({
          queryInput: {
            text: {
              text: userMessage,
              languageCode: 'en-US'
            }
          },
          queryParams: {
            contexts: [
              {
                name: 'portfolio-context',
                lifespanCount: 5,
                parameters: {
                  data: JSON.stringify({
                    name: 'Deepak Reddy',
                    location: 'Chicago, IL',
                    role: 'Software Developer'
                  })
                }
              }
            ]
          }
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Dialogflow API error:', errorData);
        throw new Error(`Dialogflow API request failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Extract the fulfillment text from the response
      return data.queryResult?.fulfillmentText || 
             data.queryResult?.fulfillmentMessages?.[0]?.text?.text?.[0] || 
             "I'm not sure how to respond to that.";
      */
    } catch (error) {
      console.error('Error with Dialogflow response:', error);
      // Fall back to our built-in response system
      try {
        const responseType = determineResponseType(userMessage);
        const contextData = extractContextFromMessage(userMessage);
        return getResponse(responseType !== 'default' ? responseType : 'greeting', contextData);
      } catch (fallbackError) {
        return "I'm having trouble right now. Could you try asking about Deepak's skills, projects, or experience instead?";
      }
    } finally {
      setIsTyping(false);
    }
  };
  
  // Helper function to get an access token for Dialogflow
  // This is a placeholder - in production, you would implement proper authentication
  const getDialogflowToken = async () => {
    // In a real implementation, you would retrieve a token using OAuth or a service account
    // For browser environments, this typically requires a backend service to securely store credentials
    
    // Placeholder warning
    console.warn('Dialogflow authentication not properly implemented. This will only work with proper backend authentication.');
    
    // Return a placeholder - this won't work until properly implemented
    return 'placeholder_token';
  };

  // Check for predefined actions before calling the API
  const checkPredefinedActions = (input) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('download resume') || lowerInput.includes('get resume')) {
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = '/Deepak_JFS_Dev_5Years.pdf'; // Path to resume in public folder
      link.download = 'Deepak_JFS_Dev_5Years.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      return {
        isAction: true,
        response: "I've started downloading Deepak's resume for you. Check your downloads folder!"
      };
    }
    
    if (lowerInput.includes('contact deepak') || lowerInput.includes('send message')) {
      setContactMode(true);
      setContactStep(0);
      
      return {
        isAction: true,
        response: contactPrompts[0]
      };
    }
    
    if (lowerInput.includes('where is he based') || lowerInput.includes('location') || lowerInput.includes('where does deepak live')) {
      return {
        isAction: true,
        response: "Deepak is currently based in Chicago, Illinois."
      };
    }
    
    return {
      isAction: false
    };
  };
  
  // Enhanced handleSendMessage function with API integration
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputValue.trim()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    
    // Process contact mode separately
    if (contactMode) {
      processContactInput(userMessage.text);
      return;
    }
    
    // Check for predefined actions first
    const predefinedAction = checkPredefinedActions(userMessage.text);
    
    if (predefinedAction.isAction) {
      // Display response for predefined action
      setTimeout(() => {
        setIsTyping(false);
        
        const botResponse = {
          id: Date.now(),
          type: 'bot',
          text: predefinedAction.response
        };
        
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 800);
      
      return;
    }
    
    // Try web search simulation for general knowledge questions
    const webSearchResponse = simulateWebSearch(userMessage.text);
    if (webSearchResponse) {
      setTimeout(() => {
        setIsTyping(false);
        
        const botResponse = {
          id: Date.now(),
          type: 'bot',
          text: webSearchResponse
        };
        
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 1200);
      
      return;
    }
    
    // Determine response type based on input text
    const responseType = determineResponseType(userMessage.text);
    if (responseType !== 'default') {
      // If we have a predefined response category, use it
      const contextData = extractContextFromMessage(userMessage.text);
      const responseText = getResponse(responseType, contextData);
      
      setTimeout(() => {
        setIsTyping(false);
        
        const botResponse = {
          id: Date.now(),
          type: 'bot',
          text: responseText
        };
        
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 800);
      
      return;
    }
    
    // If no predefined action or category, fallback to AI service
    setIsTyping(true);
    
    try {
      // Choose AI provider based on configuration
      let aiResponse;
      
      if (aiProvider === 'dialogflow') {
        aiResponse = await sendToDialogflow(userMessage.text);
      } else {
        // Default to OpenAI
        aiResponse = await sendToOpenAI(userMessage.text);
      }
      
      setTimeout(() => {
        setIsTyping(false);
        
        const botResponse = {
          id: Date.now(),
          type: 'bot',
          text: aiResponse
        };
        
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 800); // Small delay for typing effect
    } catch (error) {
      console.error("Error getting AI response:", error);
      
      setTimeout(() => {
        setIsTyping(false);
        
        const botResponse = {
          id: Date.now(),
          type: 'bot',
          text: "I'm having trouble connecting right now. Could you try again or ask something else?"
        };
        
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 800);
    }
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
  
  // Handle quick suggestion click
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    
    // Auto-submit after a brief delay
    setTimeout(() => {
      handleSendMessage();
    }, 300);
  };

  return (
    <>
      {/* Chat bubble button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 flex items-center py-2 px-4 rounded-full shadow-lg z-40 ${
          isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-blue-600 hover:bg-blue-700'
        } text-white transition-all duration-300 transform hover:scale-105 ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-label="Chat with Deepu"
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2 bg-white">
          <span className="text-xl">🤖</span>
        </div>
        <span className="font-medium">Deepak's AI Assistant</span>
        
        {/* Glowing effect */}
        <span className={`absolute -inset-0.5 rounded-full ${
          isDarkMode ? 'bg-indigo-500' : 'bg-blue-500'
        } opacity-30 blur-sm animate-pulse`}></span>
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className={`fixed bottom-24 right-6 w-80 sm:w-96 h-[480px] z-40 rounded-lg shadow-2xl overflow-hidden
          ${isDarkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'}
          flex flex-col transition-all duration-300 ease-in-out animate-fade-in-up`}>
          
          {/* Chat header */}
          <div className={`p-3 flex items-center justify-between ${
            isDarkMode ? 'bg-gray-800 border-b border-gray-700' : 'bg-blue-600 text-white'
          }`}>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                isDarkMode ? 'bg-indigo-600' : 'bg-blue-700'
              }`}>
                <span className="text-lg">🤖</span>
              </div>
              <div>
                <h3 className="font-medium">Deepak's AI Assistant</h3>
                <p className="text-xs opacity-75">
                  Here to help with portfolio inquiries
                </p>
              </div>
            </div>
            
            <div className="flex">
              <button 
                onClick={toggleChat}
                className={`rounded-full p-1 hover:bg-opacity-30 ${
                  isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-blue-500'
                }`}
                aria-label="Close chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Chat messages */}
          <div 
            className={`flex-1 p-3 overflow-y-auto ${
              isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'
            }`}
            ref={messagesEndRef}
          >
            {/* API Configuration Warning */}
            {showConfigWarning && (
              <div className={`mb-4 p-2 rounded-md ${
                isDarkMode ? 'bg-yellow-900 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'
              }`}>
                <p className={`text-xs ${
                  isDarkMode ? 'text-yellow-300' : 'text-yellow-800'
                }`}>
                  <span className="font-semibold">⚠️ Note:</span> I'm running in basic mode as no AI provider is configured. I'll use pre-programmed responses for now. For full AI capabilities, please configure OpenAI or Dialogflow API keys in the .env file.
                </p>
              </div>
            )}
            
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-3 max-w-[85%] ${
                  message.type === 'user' ? 'ml-auto' : 'mr-auto'
                } animate-fade-in`}
              >
                <div className={`p-3 rounded-lg ${
                  message.type === 'user' ? 
                    (isDarkMode ? 'bg-indigo-600 text-white' : 'bg-blue-600 text-white') : 
                    (isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800 border border-gray-200')
                }`}>
                  {message.text.split('\n').map((text, i) => (
                    <p key={i} className={i > 0 ? 'mt-1' : ''}>{text}</p>
                  ))}
                  
                  {message.options && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleOptionClick(option)}
                          className={`text-xs px-2 py-1 rounded-full mt-1 ${
                            isDarkMode ? 
                              'bg-gray-700 hover:bg-gray-600 text-white' : 
                              'bg-gray-200 hover:bg-gray-300 text-gray-800'
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
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="mb-3 max-w-[85%] mr-auto animate-fade-in">
                <div className={`p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800 border border-gray-200'
                }`}>
                  <div className="flex items-center">
                    <span className="text-sm opacity-75">{UI_TEXT.typing}</span>
                    <span className="ml-2 flex">
                      <span className="h-2 w-2 bg-current rounded-full mr-1 animate-bounce" style={{animationDelay: '0s'}}></span>
                      <span className="h-2 w-2 bg-current rounded-full mr-1 animate-bounce" style={{animationDelay: '0.2s'}}></span>
                      <span className="h-2 w-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat input */}
          <div className={`p-3 flex items-center ${
            isDarkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-white border-t border-gray-200'
          }`}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={UI_TEXT.inputPlaceholder}
              className={`flex-1 p-2 rounded-l ${
                isDarkMode ? 
                  'bg-gray-700 text-white placeholder-gray-400 border-gray-600' : 
                  'bg-gray-100 text-gray-800 placeholder-gray-500 border-gray-300'
              } border focus:outline-none focus:ring-2 ${
                isDarkMode ? 'focus:ring-indigo-500' : 'focus:ring-blue-500'
              }`}
            />
            <button
              onClick={handleSendMessage}
              className={`p-2 rounded-r ${
                isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}; 