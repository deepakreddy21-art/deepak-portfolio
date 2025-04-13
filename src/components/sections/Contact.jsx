import { RevealOnScroll } from "../RevealOnScroll";
import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';

export const Contact = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Form validation state
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [formTouched, setFormTouched] = useState({
    name: false,
    email: false,
    message: false
  });
  
  // Initialize EmailJS once when component mounts
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY); // Initialize with your public key from env
  }, []);

  // Validate form fields
  const validateField = (name, value) => {
    let errorMessage = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          errorMessage = 'Name is required';
        } else if (value.trim().length < 2) {
          errorMessage = 'Name must be at least 2 characters';
        }
        break;
      case 'email':
        if (!value.trim()) {
          errorMessage = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(value)) {
          errorMessage = 'Please enter a valid email address';
        }
        break;
      case 'message':
        if (!value.trim()) {
          errorMessage = 'Message is required';
        } else if (value.trim().length < 10) {
          errorMessage = 'Message must be at least 10 characters';
        }
        break;
      default:
        break;
    }
    
    return errorMessage;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Validate field if it's been touched
    if (formTouched[name]) {
      setErrors({
        ...errors,
        [name]: validateField(name, value)
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    // Mark field as touched
    setFormTouched({
      ...formTouched,
      [name]: true
    });
    
    // Validate field
    setErrors({
      ...errors,
      [name]: validateField(name, value)
    });
  };

  const validateForm = () => {
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message)
    };
    
    setErrors(newErrors);
    
    // Check if form is valid (all error messages are empty)
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setFormTouched({
      name: true,
      email: true,
      message: true
    });
    
    // Validate all fields
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(false);
    
    // Send email using EmailJS
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID_CONTACT, // Service ID from env
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACT, // Template ID from env
      {
        name: formData.name,
        email: formData.email,
        subject: 'Contact from Portfolio',
        message: formData.message
      }
    )
    .then((response) => {
      console.log('Email successfully sent!', response);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form data
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Reset touched state
      setFormTouched({
        name: false,
        email: false,
        message: false
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    })
    .catch((error) => {
      console.error('Failed to send email:', error);
      setIsSubmitting(false);
      setSubmitError(true);
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitError(false);
      }, 5000);
    });
  };

  return (
    <section id="contact" className={`pt-1 pb-16 md:pt-1 md:pb-24 px-4 relative ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-black' : 'bg-white'} opacity-100`}></div>
      <div className="max-w-5xl mx-auto relative z-10">
        <RevealOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600">Get In Touch</span>
          </h2>
          <p className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-lg mb-12 max-w-3xl mx-auto`}>
            Have a project in mind or want to discuss opportunities? I'd love to hear from you!
          </p>
          
          <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 md:p-8 shadow-xl border`}>
            <div className="flex flex-col md:flex-row gap-10">
              {/* Contact Info */}
              <div className="md:w-2/5">
                <h3 className="text-xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600">Contact Information</h3>
                <div className="space-y-6">
                  <div className={`rounded-lg p-5 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border transition-all hover:shadow-md`}>
                    <div className="flex items-start">
                      <div className="text-cyan-500 mt-1 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Email</h4>
                        <a 
                          href="mailto:deepakreddyiic1234@gmail.com" 
                          className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 font-medium hover:underline transition-colors"
                          aria-label="Send email to Deepak"
                        >
                          deepakreddyiic1234@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="md:w-3/5">
                <h3 className="text-xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600">Send Me a Message</h3>
                
                <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={`w-full px-4 py-2.5 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-800'} border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors ${errors.name && formTouched.name ? 'border-red-500' : ''}`}
                        required
                      />
                      {errors.name && formTouched.name && (
                        <p id="name-error" className="mt-1 text-red-500 text-xs">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={`w-full px-4 py-2.5 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-800'} border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors ${errors.email && formTouched.email ? 'border-red-500' : ''}`}
                        required
                      />
                      {errors.email && formTouched.email && (
                        <p id="email-error" className="mt-1 text-red-500 text-xs">{errors.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-5">
                    <label htmlFor="message" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows="5"
                      aria-invalid={errors.message ? "true" : "false"}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className={`w-full px-4 py-2.5 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-800'} border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors resize-none ${errors.message && formTouched.message ? 'border-red-500' : ''}`}
                      required
                    ></textarea>
                    {errors.message && formTouched.message && (
                      <p id="message-error" className="mt-1 text-red-500 text-xs">{errors.message}</p>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-md hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-70 transition-colors duration-300 shadow-md hover:shadow-lg"
                      aria-label="Send message"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : 'Send Message'}
                    </button>
                    
                    {submitSuccess && (
                      <div className="mt-4 p-3 bg-green-100 border border-green-300 text-green-800 rounded-md flex items-start" role="alert" aria-live="polite">
                        <svg className="h-5 w-5 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>Your message has been sent successfully! I'll get back to you soon.</span>
                      </div>
                    )}
                    
                    {submitError && (
                      <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded-md flex items-start" role="alert" aria-live="polite">
                        <svg className="h-5 w-5 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>There was an error sending your message. Please try again or email me directly.</span>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
