// src/components/ui/OptimizedImage.jsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export const OptimizedImage = ({ src, alt, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden">
      {!isLoaded && (
        <motion.div
          className="absolute inset-0 bg-muted animate-pulse"
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
        />
      )}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      </motion.div>
    </div>
  );
};
