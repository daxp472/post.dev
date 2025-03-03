import React, { useEffect, useState } from 'react'
import ProfileCard from '../components/ProfileCard';
import UserPostContainer from '../components/UserPostContainer';
import ProfileError from '../AdditionalNecessaryElements/ProfileError';
import Sidebar from '../components/SidebarComponent';
import Navbar from '../components/Navbar';
import { UserProfileStorageGetter } from '../utils/localStorageEncrypter';
import { GET_PROFILE_BY_ID_URL, GET_USER_PROFILE_DETAILS } from '../ApiRoutes';
import axios from 'axios';




const UserProfileDetails = () => {
    const [userLogined, setUserLogined] = useState(false);
    const [ProfileData, setProfileData] = useState({})
    const [refreshCount, setRefreshCount] = useState(0);

    const GetProfileData = async() =>{
        const userreesponse = await axios.get(GET_USER_PROFILE_DETAILS("kKqWdPHv8fhXObJEn9y8DILsYPo1"))
        console.log(userreesponse.data.data.user)
        setProfileData(userreesponse.data.data.user);
    }

    useEffect(() => {
        (async () => {
            // const serverResponse = await UserProfileStorageGetter("postDevUserConfigs");
            // const parsedData = JSON.parse(serverResponse.data);
            // console.log(parsedData)
            // console.log("asdfdsfafds")
            
            // console.log("working done")
            
            // setProfileData(parsedData); // Update ProfileData with fresh data
            // setProfileData((prev) => userreesponse.data.data.user); 
            // console.log(ProfileData)
            GetProfileData()

        })();
    }, []); // This will trigger the effect whenever refreshCount changes

    return (
        <div className="min-h-screen max-h-screen bg-[#0a0a0a] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] w-screen flex overflow-hidden">
          <Sidebar />
          <div className="w-full">
            <Navbar />
            <div className="flex overflow-y-scroll overflow-x-hidden max-h-full w-full p-5 items-start gap-5 max-[880px]:flex-col h-[calc(100vh-64px)] max-md:h-[calc(100vh-119px)] flex-col">
                {
                    JSON.stringify(ProfileData)
                }

                {
                    <>
                        <ProfileCard ProfileDetails = {ProfileData}  />
                        {/* <UserPostContainer Posts = {ProfileData.posts} Refresher = {setRefreshCount} /> */}
                    </> 
                }

            </div>
          </div>
        </div>
      );
}

export default UserProfileDetails