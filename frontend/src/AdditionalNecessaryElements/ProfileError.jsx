import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Lock, 
  LogIn, 
  UserPlus 
} from 'lucide-react'

const ProfileError = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-[#1f1f28] rounded-3xl shadow-2xl overflow-hidden relative">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#282834]/50 to-[#1f1f28]/70 opacity-100 pointer-events-none"></div>
        
        {/* Content Container */}
        <div className="relative z-10 p-8 flex flex-col items-center text-center space-y-6">
          {/* Icon */}
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ 
              rotate: [0, -10, 10, 0],
              transition: { 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          >
            <Lock 
              className="text-yellow-500 mb-4" 
              size={90} 
              strokeWidth={1.5}
            />
          </motion.div>
          
          {/* Text Content */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-3">
              Profile Locked
            </h2>
            <p className="text-gray-300 text-base max-w-md mx-auto">
              Unlock your full potential by logging in or creating an account. 
              Connect, share, and explore your personalized experience.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-4 w-full">
            <Link 
              to="/auth/login"
              className="w-full flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full 
              hover:from-purple-700 hover:to-pink-700 transition-all duration-300 group shadow-lg hover:shadow-xl"
            >
              <LogIn className="mr-2 group-hover:rotate-12 transition-transform" size={20} />
              Login to Profile
            </Link>
            
            <Link 
              to="/auth/register"
              className="w-full flex items-center justify-center px-6 py-3.5 bg-gray-800 text-white rounded-full 
              hover:bg-gray-700 transition-all duration-300 group shadow-lg hover:shadow-xl"
            >
              <UserPlus className="mr-2 group-hover:rotate-12 transition-transform" size={20} />
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProfileError