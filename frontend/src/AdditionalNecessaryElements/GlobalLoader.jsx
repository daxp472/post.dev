import React from 'react';
import { motion } from 'framer-motion';

const GlobalLoader = ({ size = 50, color = "text-purple-500" }) => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <motion.div
        className={`w-${size} h-${size} ${color}`}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      </motion.div>
    </div>
  );
};

export default GlobalLoader;