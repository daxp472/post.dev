import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import {
  IoSearch,
  IoNotificationsOutline
} from "react-icons/io5"
import {
  FaRegUserCircle,
  FaUser,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa"
import { UserProfileStorageGetter } from '../utils/localStorageEncrypter'
import { LogoutUser } from '../utils/AuthFunctions'

export default function Navbar() {

  // State management for hover interactions
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isUserLogined, setIsUserLogined] = useState(false);
  const [UserMiniCardData, setUserMiniCardData] = useState({username:"", name:"", profile:""});

  const navigate = useNavigate()




  // Handler for profile icon hover
  const handleProfileHover = () => {
    setIsProfileHovered(true);
  }

  // Handler for profile icon mouse leave
  const handleProfileLeave = () => {
    // Delayed state update to prevent immediate closure
    setTimeout(() => {
      if (!isCardHovered) {
        setIsProfileHovered(false);
      }
    }, 200);
  }

  // Handler for card hover enter
  const handleCardHoverEnter = () => {
    setIsCardHovered(true);
    setIsProfileHovered(true);
  }

  // Handler for card hover leave
  const handleCardHoverLeave = () => {
    setIsCardHovered(false);
    setIsProfileHovered(false);
  }


  //Fetching User Details...
  useEffect(() => {
    // console.log(user)
    (async()=>{
      try {
        const serverResponse = await UserProfileStorageGetter("postDevUserConfigs");
        const parsedData = JSON.parse(serverResponse.data)
        console.log(parsedData)
        setUserMiniCardData({
          username: parsedData.username,
          name: parsedData.fullName,
          profile: parsedData.avatar,
        });
      } catch (error) {
        setIsUserLogined(true)
      }
    })()
  }, [])

  return (
    // Main navigation bar with border, background, and blur effect
    // Added fixed z-index to ensure navbar is always on top
    <div className='p-8' >
      <nav className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-xl w-full fixed top-0 left-0 z-[9998]">
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 relative">
          {/* Logo Section */}
          <div className="flex items-center gap-2 max-lg:w-fit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-infinity h-8 w-8 text-[#ff4d4d]"
            >
              <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"></path>
            </svg>
            <span className="text-xl font-semibold text-white max-lg:hidden">
              Daily<span className="text-zinc-400">.POST</span>
            </span>
          </div>

          {/* Search section with input and search icon */}
          <div className="flex-1 px-20 max-sm:hidden">
            <div className="relative">
              <IoSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-full bg-zinc-800/50 py-2 pl-10 pr-4 text-white placeholder-zinc-400 outline-none ring-1 ring-zinc-700 focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
          </div>

          {/* Right section with action buttons */}
          <div className="flex items-center gap-4">
            {/* New Post button */}
            <button className="max-md:hidden rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black transition-colors hover:bg-zinc-200">
              New Post
            </button>

            {/* Notifications button */}
            <button className="max-md:hidden rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white">
              <IoNotificationsOutline className="h-6 w-6" />
            </button>

            {/* Profile section with hover card */}
            {
              isUserLogined ? 
                <Link to={'/auth/register'} ><button className='p-3 px-5 text-white font-black rounded-md bg-gray-800 cursor-pointer'>Signup</button></Link>
              :
                (
                  <>
                    <div
                      className="relative"
                      onMouseEnter={handleProfileHover}
                      onMouseLeave={handleProfileLeave}
                    >
                      {/* Profile icon button */}
                      <button className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center overflow-hidden">
                                            <img src={(UserMiniCardData.profile != "") ? UserMiniCardData.profile : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="" className="w-full h-full object-cover" />
                                          </div>
                      </button>

                      {/* Animated Profile Dropdown Card */}
                      <AnimatePresence>
                        {isProfileHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            // Highest z-index to ensure card is above all elements
                            className="absolute right-0 top-full mt-4 z-[99999] w-72"
                            onMouseEnter={handleCardHoverEnter}
                            onMouseLeave={handleCardHoverLeave}
                          >
                            {/* Profile card container */}
                            <div className="bg-zinc-800 rounded-2xl shadow-2xl border border-zinc-700 overflow-hidden">
                              {/* Profile header with avatar and name */}
                              {
                                  (
                                    <>
                                      <div className="p-6 bg-zinc-900/50 backdrop-blur-xl">
                                        <div className="flex items-center space-x-4">
                                          {/* Gradient avatar */}
                                          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center overflow-hidden">
                                            <img src={(UserMiniCardData.profile != "") ? UserMiniCardData.profile : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="" className="w-full h-full object-cover" />
                                          </div>
                                          {/* User details */}
                                          <div>
                                            <h3 className="text-white font-bold text-lg">{UserMiniCardData.name}</h3>
                                            <p className="text-zinc-400 text-sm">@{UserMiniCardData.username}</p>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Dropdown menu items */}
                                      <div className="p-2">
                                        {/* Profile link */}
                                        <Link
                                          to="/profile"
                                          className=" px-4 py-2.5 text-white hover:bg-zinc-700 rounded-lg transition-colors flex items-center"
                                        >
                                          <FaUser className="mr-3" /> My Profile
                                        </Link>

                                        {/* Settings link */}
                                        <Link
                                          to="/more/settings"
                                          className=" px-4 py-2.5 text-white hover:bg-zinc-700 rounded-lg transition-colors flex items-center"
                                        >
                                          <FaCog className="mr-3" /> Settings
                                        </Link>

                                        {/* Logout button */}
                                        <button
                                          className="w-full text-left px-4 py-2.5 text-red-400 hover:bg-zinc-700 rounded-lg transition-colors flex items-center cursor-pointer"
                                          onClick={()=>{LogoutUser()
                                            console.log(window.location.hostname)
                                            navigate('/auth/login')
                                          }}
                                        >
                                          <FaSignOutAlt className="mr-3" /> Logout
                                        </button>
                                      </div>

                                    

                                    </>
                                  )
                              }
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                )
            }

          </div>
        </div>
      </nav>
    </div>
  )
}