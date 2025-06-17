'use client';
import { useState, useEffect } from 'react';
import { ChevronDown, Mail, Phone, Github, Linkedin, Twitter, Heart, ExternalLink, Code, Briefcase, GraduationCap, Award, Menu, X, MapPin, Calendar } from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Smooth scrolling effect
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                VA
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/40 backdrop-blur-md">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-pink-800/20"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 p-1">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                <span className="text-6xl font-bold text-white">VA</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Vaibhav Agarwal
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-4">Software Development Engineer</p>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Passionate about building scalable web applications with React, Python, and modern technologies. 
            Currently working at Solfin, specializing in frontend development and LLM integrations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get In Touch
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="bg-transparent border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              View Projects
            </button>
          </div>
          
          <div className="flex justify-center space-x-6">
            <a href="https://github.com/vaibhava17" className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110">
              <Github className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com/in/vaibhava17" className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="https://twitter.com/heyvybav" className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110">
              <Twitter className="h-6 w-6" />
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-gray-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A passionate software engineer with over 3 years of experience in building modern web applications
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 text-purple-400 mr-2" />
                  <span className="text-gray-300">Based in India 🇮🇳</span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  I'm a Software Development Engineer II with over 3 years of experience in frontend development, 
                  specializing in React and modern web development techniques. Currently working at Solfin, 
                  where I develop scalable UI components and integrate LLM technologies.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold mb-3 text-purple-400">What I Do</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Frontend Development with React & Next.js</li>
                  <li>• Backend Development with Python & Node.js</li>
                  <li>• API Integration & Development</li>
                  <li>• LLM Integration & Automation</li>
                  <li>• Team Leadership & Mentoring</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-purple-500/20">
                <h3 className="text-2xl font-bold mb-4 text-purple-400">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">3+</div>
                    <div className="text-sm text-gray-400">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">50+</div>
                    <div className="text-sm text-gray-400">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">100+</div>
                    <div className="text-sm text-gray-400">Testing Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">99.9%</div>
                    <div className="text-sm text-gray-400">Uptime Achieved</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold mb-3 text-purple-400">Education</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <GraduationCap className="h-5 w-5 text-purple-400 mr-3 mt-1" />
                    <div>
                      <p className="text-white font-medium">Minor in Computer Science Engineering</p>
                      <p className="text-gray-400 text-sm">Indian Institute of Technology Mandi (2024-Present)</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <GraduationCap className="h-5 w-5 text-purple-400 mr-3 mt-1" />
                    <div>
                      <p className="text-white font-medium">B. Tech in Computer Science</p>
                      <p className="text-gray-400 text-sm">Shri Siddhi Vinayak Group Of Institutions (2022)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Experience
            </h2>
            <p className="text-gray-400 text-lg">My professional journey in software development</p>
          </div>
          
          <div className="space-y-8">
            {/* Solfin */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Software Development Engineer II</h3>
                  <p className="text-purple-400 font-semibold">Solfin</p>
                </div>
                <div className="flex items-center text-gray-400 mt-2 md:mt-0">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Jan 2025 - Present</span>
                </div>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  Developed scalable UI components in React and integrated APIs to streamline solar loan application workflows
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  Built and fine-tuned an internal LLM wrapper to extract data from documents and auto-generate loan applications
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  Automated document processing, reducing manual effort by 70% and accelerating application creation
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  Improved internal tool efficiency by optimizing LLM prompts and refining system integration flows
                </li>
              </ul>
            </div>

            {/* TalentXO */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Software Development Engineer I</h3>
                  <p className="text-purple-400 font-semibold">TalentXO</p>
                </div>
                <div className="flex items-center text-gray-400 mt-2 md:mt-0">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Sept 2023 - Dec 2024</span>
                </div>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  Designed and developed scalable backend and frontend features using React and Python, resulting in a 30% improvement in application performance metrics
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  Integrated APIs, enhancing system interoperability and improving user experience by reducing integration time by 40%
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  Provided critical support during deployment, achieving 99.9% uptime and reducing average bug resolution time by 50%
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  Conducted 100+ hours of thorough manual testing, resulting in a 95% reduction in post-deployment issues
                </li>
              </ul>
            </div>

            {/* Guni SMS */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Frontend Engineer</h3>
                  <p className="text-purple-400 font-semibold">Guni SMS</p>
                </div>
                <div className="flex items-center text-gray-400 mt-2 md:mt-0">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Dec 2021 - Sept 2023</span>
                </div>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  Developed responsive UI components using React, improving user engagement metrics by 20%
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  Led a team of 4 developers, providing mentorship and achieving a 95% on-time project completion rate
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  Collaborated with backend teams to integrate APIs, reducing integration time by 30%
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  Assisted in backend development with Node.js, contributing to a 15% improvement in overall development process efficiency
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <p className="text-gray-400 text-lg">Tools and technologies I work with</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Frontend */}
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-purple-500/20">
              <div className="flex items-center mb-4">
                <Code className="h-6 w-6 text-purple-400 mr-3" />
                <h3 className="text-xl font-bold text-white">Frontend</h3>
              </div>
              <div className="space-y-2">
                {['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'Bootstrap', 'Redux', 'MobX'].map((skill) => (
                  <div key={skill} className="bg-white/10 rounded-lg px-3 py-2 text-sm text-gray-300">
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl p-6 border border-blue-500/20">
              <div className="flex items-center mb-4">
                <Briefcase className="h-6 w-6 text-blue-400 mr-3" />
                <h3 className="text-xl font-bold text-white">Backend</h3>
              </div>
              <div className="space-y-2">
                {['Python', 'Flask', 'FastAPI', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'SQLAlchemy', 'JWT'].map((skill) => (
                  <div key={skill} className="bg-white/10 rounded-lg px-3 py-2 text-sm text-gray-300">
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Tools & Others */}
            <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-2xl p-6 border border-green-500/20">
              <div className="flex items-center mb-4">
                <Award className="h-6 w-6 text-green-400 mr-3" />
                <h3 className="text-xl font-bold text-white">Tools & Others</h3>
              </div>
              <div className="space-y-2">
                {['Git', 'AWS', 'Google Cloud', 'Linux', 'Docker', 'Postman', 'VSCode', 'JIRA', 'CI/CD'].map((skill) => (
                  <div key={skill} className="bg-white/10 rounded-lg px-3 py-2 text-sm text-gray-300">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-gray-400 text-lg">Some of my notable work and contributions</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Talent Partner Dashboard",
                description: "Comprehensive dashboard for talent management with advanced analytics and real-time data visualization.",
                tech: ["React", "Python", "APIs"],
                link: "https://talentxo.com"
              },
              {
                title: "Guni SMS Platform",
                description: "Scalable SMS service platform with user-friendly interface and robust backend infrastructure.",
                tech: ["React", "Node.js", "MongoDB"],
                link: "https://app.gunisms.com.au"
              },
              {
                title: "Magic Exports",
                description: "E-commerce platform for export business with inventory management and order tracking.",
                tech: ["React", "Express.js", "MySQL"],
                link: "https://magicexports.in"
              },
              {
                title: "Motoworld Website",
                description: "Tourism website for Manali Ladakh motorcycle tours with booking system and gallery.",
                tech: ["React", "Node.js", "MongoDB"],
                link: "https://manaliladakhmotoworld.com/"
              },
              {
                title: "Club Events Handler",
                description: "Event management system for student clubs with registration and attendance tracking.",
                tech: ["React", "Node.js", "MongoDB"],
                link: "https://intense-shelf-96174.herokuapp.com/"
              }
            ].map((project, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <p className="text-gray-400 text-lg">
              I'm always interested in new opportunities and exciting projects
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Get In Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-purple-400 mr-3" />
                    <a href="mailto:iamvaibhav.agarwal@gmail.com" className="text-gray-300 hover:text-white transition-colors duration-300">
                      iamvaibhav.agarwal@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-purple-400 mr-3" />
                    <a href="tel:+918279875697" className="text-gray-300 hover:text-white transition-colors duration-300">
                      +91 8279875697
                    </a>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-purple-400 mr-3" />
                    <span className="text-gray-300">India 🇮🇳</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-purple-500/20">
                <h3 className="text-xl font-bold text-white mb-4">Connect With Me</h3>
                <div className="flex space-x-4">
                  <a href="https://github.com/vaibhava17" className="bg-white/10 p-3 rounded-lg hover:bg-purple-600 transition-all duration-300 group">
                    <Github className="h-6 w-6 text-gray-300 group-hover:text-white" />
                  </a>
                  <a href="https://linkedin.com/in/vaibhava17" className="bg-white/10 p-3 rounded-lg hover:bg-purple-600 transition-all duration-300 group">
                    <Linkedin className="h-6 w-6 text-gray-300 group-hover:text-white" />
                  </a>
                  <a href="https://twitter.com/heyvybav" className="bg-white/10 p-3 rounded-lg hover:bg-purple-600 transition-all duration-300 group">
                    <Twitter className="h-6 w-6 text-gray-300 group-hover:text-white" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-300"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-300"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-300"
                  />
                </div>
                <div>
                  <textarea
                    rows={5}
                    placeholder="Your Message"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-300 resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-black/40 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mr-3">
                VA
              </span>
              <span className="text-gray-400">Vaibhav Agarwal</span>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>using React & Tailwind CSS</span>
            </div>
            
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://github.com/vaibhava17" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/in/vaibhava17" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/heyvybav" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-gray-400">
              © 2025 Vaibhav Agarwal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;