import React, { useEffect, useState } from 'react'
import ProfileCard from '../components/ProfileCard';
import UserPostContainer from '../components/UserPostContainer';
import ProfileError from '../AdditionalNecessaryElements/ProfileError';
import Sidebar from '../components/SidebarComponent';
import Navbar from '../components/Navbar';
import { UserProfileStorageGetter } from '../utils/localStorageEncrypter';
import { GET_PROFILE_BY_ID_URL, GET_USER_PROFILE_DETAILS } from '../ApiRoutes';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FetchUserProfileDetailPage } from '../utils/AuthFunctions';




const UserProfileDetails = () => {
    const [userLogined, setUserLogined] = useState(false);
    const [ProfileData, setProfileData] = useState({posts:[]})
    const [refreshCount, setRefreshCount] = useState(0);
    const [userPosts, setUserPosts] = useState([]);
    const { username } = useParams()

    const GetProfileData = async() =>{
        try{
            const data = await FetchUserProfileDetailPage(username);
            setProfileData(data);
            console.log("The Fetched Details ....")
            // console.log(data.posts)
            console.log(ProfileData)

        }catch(error){
            console.error('Error fetching profile data:', error)
        }

    }

    useEffect(() => {
        (async () => {
            GetProfileData()
        })();
    }, []); // This will trigger the effect whenever refreshCount changes

    return (
        <div className="min-h-screen max-h-screen bg-[#0a0a0a] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] w-screen flex overflow-hidden">
          <Sidebar />
          <div className="w-full">
            <Navbar />
            <div className="flex overflow-y-scroll overflow-x-hidden max-h-full w-full p-5 items-start gap-5 max-[880px]:flex-col h-[calc(100vh-64px)] max-md:h-[calc(100vh-119px)] ">

                {
                    <>
                        <ProfileCard ProfileDetails = {ProfileData}  />
                        <UserPostContainer Posts = {ProfileData.posts} Refresher = {setRefreshCount} />
                    
                    </> 
                }

            </div>
          </div>
        </div>
      );
}

export default UserProfileDetails