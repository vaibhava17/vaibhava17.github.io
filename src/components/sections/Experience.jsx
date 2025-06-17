// src/components/sections/Experience.jsx
"use client";

import { motion } from "framer-motion";
import { Calendar, ExternalLink } from "lucide-react";
import AnimatedSection, { StaggerContainer } from "../AnimatedSection";
import { Card, CardContent } from "../ui/card";

const Experience = ({ content }) => {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection animation="fadeIn" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Experience
          </h2>
          <p className="text-muted-foreground text-lg">
            My professional journey in software development
          </p>
        </AnimatedSection>

        <div className="space-y-8">
          {content.experience.map((exp, index) => (
            <AnimatedSection
              key={index}
              animation={index % 2 === 0 ? "slideLeft" : "slideRight"}
              delay={index * 0.2}
            >
              <Card className="glass-effect hover:border-primary/30 transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {exp.position}
                        </h3>
                        {exp.website && (
                          <motion.a
                            href={exp.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </motion.a>
                        )}
                      </div>
                      <p className="text-primary font-semibold text-lg">
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex items-center text-muted-foreground mt-2 lg:mt-0">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{exp.duration}</span>
                    </div>
                  </div>

                  <StaggerContainer staggerDelay={0.1}>
                    <ul className="space-y-3 text-muted-foreground">
                      {exp.achievements.map((achievement, achIndex) => (
                        <motion.li
                          key={achIndex}
                          className="flex items-start group/item"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <span className="text-primary mr-3 mt-1 group-hover/item:scale-125 transition-transform">
                            •
                          </span>
                          <span className="leading-relaxed">{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </StaggerContainer>

                  {/* Company Badge */}
                  <motion.div
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                      {exp.company}
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        {/* Timeline connector */}
        {/* <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary to-transparent"></div> */}
      </div>
    </section>
  );
};

export default Experience;
