import React, { useEffect, useState } from 'react'
import ProfileCard from '../components/ProfileCard';
import UserPostContainer from '../components/UserPostContainer';
import ProfileError from '../AdditionalNecessaryElements/ProfileError';
import Sidebar from '../components/SidebarComponent';
import Navbar from '../components/Navbar';
import { UserProfileStorageGetter } from '../utils/localStorageEncrypter';
import { GET_PROFILE_BY_ID_URL } from '../ApiRoutes';
import axios from 'axios';

const UserProfileDetails = () => {
    const [userLogined, setUserLogined] = useState(false);
    const [ProfileData, setProfileData] = useState({})
    const [refreshCount, setRefreshCount] = useState(0);

    useEffect(() => {
        (async () => {
            const serverResponse = await UserProfileStorageGetter("postDevUserConfigs");
            const parsedData = JSON.parse(serverResponse.data);
            console.log(parsedData)
            console.log("asdfdsfafds")
            const userreesponse = await axios.get(GET_PROFILE_BY_ID_URL("kKqWdPHv8fhXObJEn9y8DILsYPo1"))
            console.log(userreesponse)
            
            setProfileData(parsedData); // Update ProfileData with fresh data
            if (parsedData) {
                setUserLogined(true);
            }
        })();
    }, [refreshCount]); // This will trigger the effect whenever refreshCount changes

    return (
        <div className="min-h-screen max-h-screen bg-[#0a0a0a] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] w-screen flex overflow-hidden">
          <Sidebar />
          <div className="w-full">
            <Navbar />
            <div className="flex overflow-y-scroll overflow-x-hidden max-h-full w-full p-5 items-start gap-5 max-[880px]:flex-col h-[calc(100vh-64px)] max-md:h-[calc(100vh-119px)]">

                {
                    (userLogined) ? 
                    <>
                        <ProfileCard UserData = {ProfileData}  />
                        <UserPostContainer Posts = {ProfileData.posts} Refresher = {setRefreshCount} />
                    </> :
                    <>
                        <ProfileError
                            title="Profile Access Denied"
                            message="Please log in to view your profile details"
                        />
                    </>
                }

            </div>
          </div>
        </div>
      );
}

export default UserProfileDetails