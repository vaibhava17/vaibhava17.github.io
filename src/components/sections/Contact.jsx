// src/components/sections/Contact.jsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import AnimatedSection from "../AnimatedSection";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

const Contact = ({ content }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    message: "",
    type: "", // 'success' or 'error'
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ isSubmitting: true, message: "", type: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setFormStatus({
          isSubmitting: false,
          message: result.message,
          type: "success",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setFormStatus({
          isSubmitting: false,
          message: result.message,
          type: "error",
        });
      }
    } catch (error) {
      setFormStatus({
        isSubmitting: false,
        message: "Network error. Please try again later.",
        type: "error",
      });
    }

    // Clear status message after 5 seconds
    setTimeout(() => {
      setFormStatus((prev) => ({ ...prev, message: "", type: "" }));
    }, 5000);
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: content.personal.email,
      href: `mailto:${content.personal.email}`,
      color: "text-blue-500",
    },
    {
      icon: Phone,
      label: "Phone",
      value: content.personal.phone,
      href: `tel:${content.personal.phone}`,
      color: "text-green-500",
    },
    {
      icon: MapPin,
      label: "Location",
      value: content.personal.location,
      href: "#",
      color: "text-red-500",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: content.personal.social.github,
      color: "hover:text-gray-900 dark:hover:text-white",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: content.personal.social.linkedin,
      color: "hover:text-blue-600",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: content.personal.social.twitter,
      color: "hover:text-blue-400",
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection animation="fadeIn" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Let's Work Together
          </h2>
          <p className="text-muted-foreground text-lg">
            I'm always interested in new opportunities and exciting projects
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <AnimatedSection animation="slideLeft">
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">
                    Get In Touch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactMethods.map((method, index) => {
                    const IconComponent = method.icon;
                    return (
                      <motion.div
                        key={method.label}
                        className="flex items-center group"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <div
                          className={`${method.color} p-3 rounded-lg bg-background mr-4 group-hover:scale-110 transition-transform`}
                        >
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {method.label}
                          </p>
                          {method.href.startsWith("mailto:") ||
                          method.href.startsWith("tel:") ? (
                            <a
                              href={method.href}
                              className="text-foreground hover:text-primary transition-colors font-medium"
                            >
                              {method.value}
                            </a>
                          ) : (
                            <span className="text-foreground font-medium">
                              {method.value}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection animation="slideLeft" delay={0.2}>
              <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">
                    Connect With Me
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => {
                      const IconComponent = social.icon;
                      return (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-3 rounded-lg bg-background/60 backdrop-blur-sm border border-border ${social.color} transition-all duration-300 group`}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <IconComponent className="h-6 w-6 group-hover:scale-110 transition-transform" />
                          <motion.div
                            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                            initial={{ y: 10 }}
                            whileHover={{ y: 0 }}
                          >
                            {social.label}
                          </motion.div>
                        </motion.a>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          {/* Contact Form */}
          <AnimatedSection animation="slideRight">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Status Message */}
                {formStatus.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                      formStatus.type === "success"
                        ? "bg-green-600/20 border border-green-500/30 text-green-300"
                        : "bg-red-600/20 border border-red-500/30 text-red-300"
                    }`}
                  >
                    {formStatus.type === "success" ? (
                      <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    )}
                    <span>{formStatus.message}</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={formStatus.isSubmitting}
                        className="w-full bg-background/60 backdrop-blur-sm border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 disabled:opacity-50"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={formStatus.isSubmitting}
                        className="w-full bg-background/60 backdrop-blur-sm border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 disabled:opacity-50"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      disabled={formStatus.isSubmitting}
                      className="w-full bg-background/60 backdrop-blur-sm border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 disabled:opacity-50"
                      placeholder="Project Discussion"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      required
                      disabled={formStatus.isSubmitting}
                      className="w-full bg-background/60 backdrop-blur-sm border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none disabled:opacity-50"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={formStatus.isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {formStatus.isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
