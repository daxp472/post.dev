import React from 'react'
import { FaTwitter, FaGithub, FaGlobe } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import GenericCardComponent from './GenericPostCard';



const UserPostContainer = () => {
    return (
        <div className="  flex items-center justify-center w-full">
            <div className="relative w-full ">
                {/* Glossy effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent  to-transparent rounded-3xl transform rotate-12 blur-sm"></div>

                {/* Main card */}
                <div className="relative bg-grady-800/50 backdrop-blur-smdd rodunded-3xl overflow-hidden bordder border-gray-d700 w-full">
                    

                    {/* Profile content */}
                    <div className=" grid grid-cols-3 max-[1720px]:grid-cols-2 max-[1360px]:grid-cols-1 gap-5 w-full ">
                        <GenericCardComponent />
                        <GenericCardComponent />
                        <GenericCardComponent />
                        <GenericCardComponent />
                        <GenericCardComponent />
                        <GenericCardComponent />
                        <GenericCardComponent />
                        <GenericCardComponent />
                        <GenericCardComponent />
                        <GenericCardComponent />
                        <GenericCardComponent />
                        <GenericCardComponent />
                        <GenericCardComponent />

                        
                    </div>
                </div>

                
            </div>
        </div>
    )
}

export default UserPostContainer    