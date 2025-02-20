import React from 'react';
import { motion } from 'framer-motion';

const ContentSkeleton = () => {
  return (
    <div className="space-y-4 w-full">
      {[1, 2, 3].map((item) => (
        <motion.div 
          key={item}
          className="bg-gray-800 h-20 rounded-lg"
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
      ))}
    </div>
  );
};

export default ContentSkeleton;