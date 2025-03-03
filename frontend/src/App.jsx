import React, { useCallback, useEffect, useState } from 'react';
import LandingPage from './pages/LandingPage';
import { Router } from 'lucide-react';
import Navbar from './components/Navbar';
import Sidebar from './components/SidebarComponent';
import GenericCardComponent from './components/GenericPostCard';
import axios from 'axios'
import Loader from './components/Loader';
import { GET_ALL_POST_URL } from './ApiRoutes';
import { UserProfileStorageGetter } from './utils/localStorageEncrypter';

function App() {
  const [Initialdata, setInitialdata] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [userPersonalData, setUserPersonalData] = useState(null);
  const [userLikedPosts, setUserLikedPosts] = useState([]);
  const [isUserLogiedin, setIsUserLogiedin] = useState(false);
  const fetchInitailData = useCallback(
    async() => {
      const ResponseData = await axios.get(GET_ALL_POST_URL)
      setInitialdata(ResponseData.data.data);
      setIsLoading((prev)=>!prev);
    },
    [Initialdata],
  )
  
  const getUserStoredData = async ()=> {
    try {
      setUserPersonalData(JSON.parse((await UserProfileStorageGetter("postDevUserConfigs")).data))
      setIsUserLogiedin(true);
    } catch (error) {
      setIsUserLogiedin(false);
    }
  }

  useEffect(()=>{
    getUserStoredData()
    fetchInitailData()
    try {
      setUserLikedPosts(userPersonalData.likedPosts)
      console.log(userLikedPosts)
    console.log(userLikedPosts)
    } catch (error) {
      
    }
  }, [])

  return (
    <div className="h-screen bg-[#0a0a0a] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] w-screen flex overflow-hidden">
      <Sidebar />
      <div className="w-full ">
        <Navbar />
        <div className="w-full flex flex-col items-center overflow-y-scroll h-[calc(100vh-64px)]  ">
          {
            (isLoading)?
            (
              <div className="h-full w-full flex items-center justify-center p-20">
                <Loader/>
              </div>
            )
            :
            (<div className="w-full max-md:pb-[95px]  grid grid-cols-4 p-5 gap-10 max-[1760px]:grid-cols-3 max-[1345px]:grid-cols-2 max-[810px]:grid-cols-1 max-md:gap-5">
              {
                [...Initialdata.reverse()].map((post, index)=>{
                  let isliked = false;
                  try {
                    if(userPersonalData.likedPosts.map((post)=>post._id).includes(post._id)){
                      isliked = true
                    }else{
                      isliked = false
                    }
                  } catch (error) {
                    
                  }
                  return (
                    <>
                    <GenericCardComponent
                      title={post.title}
                      desc={post.desc}
                      image={post.image}
                      likes_count={post.likes_count}
                      comments_count={post.comments.length}
                      postID={post._id}
                      key={index}
                      isLiked={isliked}
                      user_image={post.user_image}
                    />
                    </>
                  )
                })
              }
            </div>)
          }
        </div>
      </div>
    </div>
  );
}

export default App;