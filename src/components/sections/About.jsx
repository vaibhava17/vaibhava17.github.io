// src/components/sections/About.jsx
"use client";

import { motion } from "framer-motion";
import { MapPin, GraduationCap } from "lucide-react";
import AnimatedSection, { StaggerContainer } from "../AnimatedSection";
import { Card, CardContent } from "../ui/card";

const About = ({ content }) => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection animation="fadeIn" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            About Me
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A passionate software engineer with over 3 years of experience in
            building modern web applications
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <AnimatedSection animation="slideLeft">
              <Card className="glass-effect">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <MapPin className="h-5 w-5 text-primary mr-2" />
                    <span className="text-muted-foreground">
                      Based in {content.personal.location}
                    </span>
                  </div>
                  <p className="text-foreground leading-relaxed">
                    {content.about.description}
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection animation="slideLeft" delay={0.2}>
              <Card className="glass-effect">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    What I Do
                  </h3>
                  <StaggerContainer className="space-y-2">
                    {content.about.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-center text-muted-foreground"
                      >
                        <span className="text-primary mr-3">•</span>
                        {highlight}
                      </div>
                    ))}
                  </StaggerContainer>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          <div className="space-y-6">
            <AnimatedSection animation="slideRight">
              <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/20">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4 text-primary">
                    Quick Stats
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {content.about.stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        className="text-center"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: index * 0.1, type: "spring" }}
                        viewport={{ once: true }}
                      >
                        <div className="text-3xl font-bold text-foreground mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection animation="slideRight" delay={0.2}>
              <Card className="glass-effect">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    Education
                  </h3>
                  <div className="space-y-3">
                    {content.education.map((edu, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <GraduationCap className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-foreground font-medium">
                            {edu.degree}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {edu.institution} ({edu.duration})
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
