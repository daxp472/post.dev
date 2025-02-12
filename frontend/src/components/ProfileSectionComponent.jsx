import React, { useEffect, useState } from 'react';
import { Users, MapPin, Calendar, Link as LinkIcon, Twitter, Github as GitHub, Mail } from 'lucide-react';
import axios from 'axios';
import Loader from './Loader';

function ProfileSectionComponent() {
  const [userData, setUserData] = useState({
    username: "",
    fullName: "",
    email: "",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200&h=200",
    accountType: "personal",
    followersCount: 0,
    followingCount: 0
  });

  const [isLoading, setIsLoading] = useState(true);

  const getDetails = async() => {
    const userData = await axios.get(
        "https://post-dev.onrender.com/api/users/rjiOACSm0EX6486g03ok325J2Ll2/profile",
        {
            headers: {
                "authorization" : "rjiOACSm0EX6486g03ok325J2Ll2" 
            }
        }
    )

    console.log(userData);
    setUserData({...userData.data.data, ...userData, fullName: userData.data.data.firstname + " " + userData.data.data.lastname});
    

  };

  useEffect(()=>{
    getDetails();
    setIsLoading((prev)=>!prev);
  }, [])

  return (
    <>
      {
        (isLoading) ? <Loader /> :
        (
          <div className="min-h-screen bg-[#18181E] text-gray-100 max-w-[750px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="relative">
          {/* Profile Image */}
          <div className="mb-6">
            <img 
              src={userData.avatar}
              alt={userData.fullName}
              className="w-32 h-32 rounded-full border-4 border-gray-800"
            />
          </div>
          
          {/* Profile Info */}
          <div className="pb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{userData.fullName}</h1>
                <p className="text-gray-400">@{userData.username}</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full transition cursor-pointer">
                Edit Profile
              </button>
            </div>
            
            {/* Account Type Badge */}
            <div className="mt-2">
              <span className="px-3 py-1 rounded-full text-sm inline-block bg-blue-500">
                {userData.accountType} account
              </span>
            </div>
            
            <p className="mt-4 text-gray-300">
              {userData.bio}
            </p>
            
            {/* Stats */}
            <div className="flex gap-6 mt-6">
              <div className="flex items-center gap-2">
                <Users size={20} className="text-gray-400" />
                <span className="font-medium">{userData.followersCount}</span>
                <span className="text-gray-400">followers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{userData.followingCount}</span>
                <span className="text-gray-400">following</span>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-gray-400">
                <Mail size={18} />
                <span>{userData.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin size={18} />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <LinkIcon size={18} />
                <a href="#" className="text-blue-400 hover:underline">portfolio.dev</a>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition">
                <GitHub size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
        )
      }
    </>
  );
}

export default ProfileSectionComponent;