import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  Home, 
  RefreshCw 
} from 'lucide-react';

const PageNotFound = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  };

  return (
    <div className="min-h-screen max-h-screen bg-[#0a0a0a] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] w-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center p-8 rounded-xl bg-black/30 backdrop-blur-sm flex flex-col items-center"
      >
        <motion.div 
          variants={itemVariants}
          className="mb-6"
        >
          <AlertTriangle 
            className="mx-auto text-yellow-500" 
            size={100} 
            strokeWidth={1.5}
          />
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4"
        >
          404
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-2xl text-gray-300 mb-6"
        >
          Oops! Page Not Found
        </motion.p>
        
        <motion.p 
          variants={itemVariants}
          className="text-md text-gray-400 mb-8 max-w-md"
        >
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          className="flex space-x-4"
        >
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 group"
          >
            <Home className="mr-2 group-hover:animate-spin" size={20} />
            Return to Home
          </Link>
          <button 
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-all duration-300 group"
          >
            <RefreshCw className="mr-2 group-hover:animate-spin" size={20} />
            Reload Page
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PageNotFound;