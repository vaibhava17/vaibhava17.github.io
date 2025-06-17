// src/components/sections/Projects.jsx
"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import AnimatedSection, { StaggerContainer } from "../AnimatedSection";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

const Projects = ({ content }) => {
  const ProjectCard = ({ project, index }) => (
    <AnimatedSection animation="scaleIn" delay={index * 0.1}>
      <Card className="glass-effect hover:border-primary/30 transition-all duration-300 group h-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </CardTitle>
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.1, rotate: 12 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="h-5 w-5" />
            </motion.a>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col h-full">
          <p className="text-muted-foreground mb-4 leading-relaxed flex-grow">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, techIndex) => (
              <motion.span
                key={tech}
                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: techIndex * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
          <div className="flex gap-2 mt-auto">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => window.open(project.link, "_blank")}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Live
            </Button>
            {/* Add GitHub link if available */}
            <Button
              variant="ghost"
              size="sm"
              className="px-3"
              onClick={() => window.open(project.link, "_blank")}
            >
              <Github className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection animation="fadeIn" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg">
            Some of my notable work and contributions
          </p>
        </AnimatedSection>

        <StaggerContainer
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          staggerDelay={0.1}
        >
          {content.projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </StaggerContainer>

        {/* Project Stats */}
        <AnimatedSection animation="fadeIn" delay={0.5} className="mt-16">
          <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl p-8 border border-purple-500/20">
            <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
              Project Impact
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Projects Completed", value: "50+", icon: "🚀" },
                { label: "Technologies Used", value: "15+", icon: "⚡" },
                { label: "Happy Clients", value: "25+", icon: "😊" },
                { label: "Code Commits", value: "1000+", icon: "💻" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimatedSection
          animation="fadeIn"
          delay={0.7}
          className="text-center mt-12"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 rounded-2xl text-white"
          >
            <h3 className="text-2xl font-bold mb-4">
              Interested in working together?
            </h3>
            <p className="text-purple-100 mb-6">
              I'm always open to discussing new opportunities and exciting
              projects.
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              Let's Talk
            </Button>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Projects;
