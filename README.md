# Deepak Reddy's Portfolio

This is my personal portfolio website built using React, Vite, and TailwindCSS. The project showcases my skills, experience, and projects with a modern, responsive design.

## Features

- **Interactive Terminal:** Linux-like terminal interface allowing visitors to explore my portfolio using familiar commands
- **AI Chat Assistant:** Intelligent chatbot that can answer questions about my background, skills, and projects
- **Modern Design:** Clean, professional design with smooth animations and transitions
- **Responsive Layout:** Fully responsive across desktop, tablet, and mobile devices
- **Dark/Light Mode:** Toggle between dark and light themes

## Technologies

- **React:** Component-based UI library
- **Vite:** Fast and lean development build tool
- **TailwindCSS:** Utility-first CSS framework
- **EmailJS:** Email service integration for contact form

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/deepakreddy22/deepak-portfolio.git
   cd deepak-portfolio
   ```

2. **Set up environment variables:**

   Create a `.env` file in the root directory with your EmailJS credentials:
   ```
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   VITE_EMAILJS_SERVICE_ID_CONTACT=your_contact_service_id_here
   VITE_EMAILJS_TEMPLATE_ID_CONTACT=your_contact_template_id_here
   VITE_EMAILJS_SERVICE_ID_CHAT=your_chat_service_id_here
   VITE_EMAILJS_TEMPLATE_ID_CHAT=your_chat_template_id_here
   ```
   You can use the `.env.example` file as a template.

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   The application should now be running at [http://localhost:5173](http://localhost:5173).

## Deployment

The portfolio is automatically deployed to GitHub Pages using GitHub Actions. When you push changes to the main branch, the site will be built and deployed.

To manually deploy:

```bash
npm run deploy
```

## Special Features

### Interactive Terminal
Access the terminal by clicking the "Terminal" button in the navigation. Try these commands:
- `help` - List all available commands
- `skills` - View my technical skills
- `projects` - See my project portfolio
- `experience` - View my work experience
- `contact` - Get my contact information

### AI Chat Assistant
The AI chatbot can answer questions about my background, skills, and projects. Try asking about:
- My technical skills
- My work experience
- My education
- My projects
- My contact information

## Contact

- Email: deepakreddyiitc1234@gmail.com
- LinkedIn: linkedin.com/in/deepak-reddy-3a911924b
- GitHub: github.com/deepakreddy21
- Instagram: instagram.com/deepakreddy_22
- Twitter: twitter.com/kdr_9837

## Folder Structure

```
your-portfolio/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── MobileMenu.jsx
│   │   ├── LoadingScreen.jsx
│   │   └── sections/
│   │       ├── Home.jsx
│   │       ├── About.jsx
│   │       ├── Projects.jsx
│   │       └── Contact.jsx
│   ├── index.css          # Tailwind base styles and global styles
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

## Customization

- **Tailwind CSS:** Modify the `index.css` file or add custom classes to further tweak the design.
- **Components:** Edit individual components in the `src/components/` folder to update content or styling.
- **Sections:** Update content in the `src/components/sections/` directory to showcase your personal projects, about info, and contact details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with improvements.

## License

This project is open source and available under the [MIT License](LICENSE).

## Resume Setup

To enable the resume download functionality:
1. Create a PDF version of your resume
2. Name it `resume.pdf`
3. Place it in the `public` folder of your project

This will make your resume accessible via the Resume link in the navigation menu.

---

Happy coding and enjoy building your professional portfolio!
