// src/components/sections/Skills.jsx
"use client";

import { motion } from "framer-motion";
import { Code, Server, Settings } from "lucide-react";
import AnimatedSection, { StaggerContainer } from "../AnimatedSection";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const Skills = ({ content }) => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: Code,
      skills: content.skills.frontend,
      gradient: "from-purple-600/20 to-pink-600/20",
      border: "border-purple-500/20",
      iconColor: "text-purple-400",
    },
    {
      title: "Backend",
      icon: Server,
      skills: content.skills.backend,
      gradient: "from-blue-600/20 to-purple-600/20",
      border: "border-blue-500/20",
      iconColor: "text-blue-400",
    },
    {
      title: "Tools & Others",
      icon: Settings,
      skills: content.skills.tools,
      gradient: "from-green-600/20 to-blue-600/20",
      border: "border-green-500/20",
      iconColor: "text-green-400",
    },
  ];

  const SkillBadge = ({ skill, index }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.05,
        type: "spring",
        stiffness: 200,
      }}
      whileHover={{
        scale: 1.05,
        y: -2,
        boxShadow: "0 4px 20px rgba(139, 92, 246, 0.3)",
      }}
      className="bg-background/60 backdrop-blur-sm border border-border rounded-lg px-3 py-2 text-sm text-foreground hover:bg-accent/50 transition-all duration-200 cursor-default"
    >
      {skill}
    </motion.div>
  );

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection animation="fadeIn" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground text-lg">
            Tools and technologies I work with
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;

            return (
              <AnimatedSection
                key={category.title}
                animation="scaleIn"
                delay={categoryIndex * 0.2}
              >
                <Card
                  className={`bg-gradient-to-br ${category.gradient} ${category.border} h-full`}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <IconComponent
                          className={`h-6 w-6 ${category.iconColor}`}
                        />
                      </motion.div>
                      <span className="text-foreground">{category.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <StaggerContainer className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <SkillBadge
                          key={skill}
                          skill={skill}
                          index={skillIndex}
                        />
                      ))}
                    </StaggerContainer>
                  </CardContent>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Floating skill elements */}
        <div className="relative mt-16 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            {["React", "Python", "Next.js", "Node.js", "TypeScript"].map(
              (skill, index) => (
                <motion.div
                  key={skill}
                  className="absolute text-primary/20 font-bold text-4xl md:text-6xl"
                  style={{
                    left: `${Math.random() * 80 + 10}%`,
                    top: `${Math.random() * 80 + 10}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.1, 0.3, 0.1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                >
                  {skill}
                </motion.div>
              )
            )}
          </div>

          {/* Skill mastery visualization */}
          <AnimatedSection animation="fadeIn" delay={0.5}>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-8 text-foreground">
                Skill Proficiency
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { skill: "React/Next.js", level: 95 },
                  { skill: "JavaScript/TypeScript", level: 90 },
                  { skill: "Python", level: 85 },
                  { skill: "Node.js", level: 80 },
                ].map((item, index) => (
                  <motion.div
                    key={item.skill}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="relative w-20 h-20 mx-auto mb-3">
                      <svg
                        className="w-20 h-20 transform -rotate-90"
                        viewBox="0 0 36 36"
                      >
                        <path
                          className="text-muted/20"
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <motion.path
                          className="text-primary"
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray={`${item.level}, 100`}
                          initial={{ strokeDasharray: "0, 100" }}
                          whileInView={{
                            strokeDasharray: `${item.level}, 100`,
                          }}
                          viewport={{ once: true }}
                          transition={{ duration: 2, delay: index * 0.2 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">
                          {item.level}%
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">
                      {item.skill}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Skills;
