import React from 'react';
import { motion } from 'framer-motion';

const ImageSkeleton = ({ width = 300, height = 200, rounded = 'rounded-lg' }) => {
  return (
    <motion.div 
      className={`${rounded} bg-gray-800 overflow-hidden`}
      style={{ width, height }}
      initial={{ opacity: 0.5 }}
      animate={{ 
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

export default ImageSkeleton;