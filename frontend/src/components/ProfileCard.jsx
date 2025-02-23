import React, { useEffect, useState } from 'react'
import { FaTwitter, FaGithub, FaGlobe } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { UserProfileStorageGetter } from '../utils/localStorageEncrypter';

const ProfileCard = () => {

    const [ProfileData, setProfileData] = useState({
        username : "",
        fullName : "",
        followersCount : 0,
        followingCount : 0,
        title : "",
        bio : "",
        email : ""

    });

    useEffect(()=>{
        (async()=>{
            const serverResponse = await UserProfileStorageGetter("postDevUserConfigs");
            const parsedData = JSON.parse(serverResponse.data);
            console.log(parsedData)
            setProfileData(parsedData);
        })()
    }, [])


    return (
        <div className=" flex items-center justify-center w-fit max-[880px]:w-full min-[880px]:sticky top-0">
          <div className="relative w-full ">
            {/* Glossy effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent  to-transparent rounded-3xl transform rotate-12 blur-sm"></div>
            
            {/* Main card */}
            <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700 w-fit max-[880px]:w-full min-[880px]:min-w-[360px] min-[880px]:max-w-[360px]">
              {/* Cover image area */}
              <div className="h-16 "></div>

            
              
              {/* Profile content */}
              <div className="px-6 py-6 ">
                {/* Avatar */}
                <div className="relative -mt-16 mb-4 flex justify-center">
                  <div className="relative">
                    <img
                      src={(ProfileData.profileImage) ? ProfileData.profileImage : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                      alt="Profile"
                      className="w-32 h-32 rounded-full border-4 border-gray-800 bg-gray-800"
                    />
                    <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
                  </div>
                </div>
    
                {/* Profile info */}
                <div className="text-center max-w-4xl mx-auto">
                  <h1 className="text-2xl font-bold text-white mb-1">{ProfileData.fullName}</h1>
                  <p className="text-gray-400 mb-4">@{ProfileData.username}</p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <p className="text-white font-bold">{(ProfileData.posts)?ProfileData.posts.length:0}</p>
                      <p className="text-gray-400 text-sm">Posts</p>
                    </div>
                    <div>
                      <p className="text-white font-bold">{ProfileData.followingCount}</p>
                      <p className="text-gray-400 text-sm">Following</p>
                    </div>
                    <div>
                      <p className="text-white font-bold">{ProfileData.followersCount}</p>
                      <p className="text-gray-400 text-sm">Followers</p>
                    </div>
                  </div>
    
                  {/* Contact */}
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <MdEmail className="text-gray-400" />
                    <span className="text-gray-400">{ProfileData.email}</span>
                  </div>
    
                  {/* Social Links */}
                  <div className="mb-6">
                    <h3 className="text-gray-400 mb-2">Social Links</h3>
                    <div className="flex justify-center gap-4">
                      <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110 hover:shadow-lg hover:shadow-black">
                        <FaTwitter size={20} />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110 hover:shadow-lg hover:shadow-black">
                        <FaGithub size={20} />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110 hover:shadow-lg hover:shadow-black">
                        <FaGlobe size={20} />
                      </a>
                    </div>
                  </div>
    
                  {/* Bio */}
                  <div className="mb-6 max-w-2xl mx-auto">
                    <h3 className="text-gray-400 mb-2">Bio</h3>
                    <p className="text-gray-500">{(ProfileData.bio=="")?"No bio added yet":ProfileData.bio}</p>
                  </div>
    
                  {/* Professional Title */}
                  <div className="max-w-2xl mx-auto">
                    <h3 className="text-gray-400 mb-2">Professional Title</h3>
                    <p className="text-gray-500">{ProfileData.title === "" ? "No title added yet" : ProfileData.title}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          );
}

export default ProfileCard