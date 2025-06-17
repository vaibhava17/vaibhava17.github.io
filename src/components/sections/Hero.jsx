// src/components/sections/Hero.jsx
"use client";

import { motion } from "framer-motion";
import { ChevronDown, Github, Linkedin, Twitter, Download } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = ({ content }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-red-600/20"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(219, 39, 119, 0.1), rgba(239, 68, 68, 0.1))",
              "linear-gradient(45deg, rgba(219, 39, 119, 0.1), rgba(239, 68, 68, 0.1), rgba(139, 92, 246, 0.1))",
              "linear-gradient(45deg, rgba(239, 68, 68, 0.1), rgba(139, 92, 246, 0.1), rgba(219, 39, 119, 0.1))",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating Elements */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Mouse Follower */}
      <motion.div
        className="fixed w-8 h-8 bg-primary/10 rounded-full pointer-events-none z-50 mix-blend-multiply"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
          className="mb-8 mt-8"
        >
          <div className="relative w-48 h-48 mx-auto mb-8">
            <motion.div className="w-full h-full rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-1">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <motion.span
                  className="text-6xl font-bold gradient-text"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(139, 92, 246, 0.5)",
                      "0 0 40px rgba(219, 39, 119, 0.5)",
                      "0 0 20px rgba(139, 92, 246, 0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  VA
                </motion.span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Name Animation */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          {content.personal.name.split("").map((char, index) => (
            <motion.span
              key={index}
              className="gradient-text inline-block"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5 + index * 0.05,
                duration: 0.3,
              }}
              whileHover={{
                scale: 1.1,
                textShadow: "0 0 20px rgba(139, 92, 246, 0.8)",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Title with Typewriter Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mb-4"
        >
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground"
            animate={{
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            {content.personal.title}
          </motion.p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          {content.personal.subtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.button
            onClick={() => scrollToSection("contact")}
            className="group relative px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold shadow-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">Get In Touch</span>
          </motion.button>

          <motion.button
            onClick={() => scrollToSection("projects")}
            className="group px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full font-semibold transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
          </motion.button>

          <motion.a
            href="/resume.pdf"
            download
            className="group px-8 py-3 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full font-semibold transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4" />
            Download CV
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="flex justify-center space-x-6 mb-16"
        >
          {[
            {
              icon: Github,
              href: content.personal.social.github,
              label: "GitHub",
            },
            {
              icon: Linkedin,
              href: content.personal.social.linkedin,
              label: "LinkedIn",
            },
            {
              icon: Twitter,
              href: content.personal.social.twitter,
              label: "Twitter",
            },
          ].map(({ icon: Icon, href, label }, index) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 rounded-full bg-muted hover:bg-accent transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-6 h-6" />
              <motion.div
                className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ y: 10 }}
                whileHover={{ y: 0 }}
              >
                {label}
              </motion.div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
