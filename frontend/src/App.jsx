import React, { useEffect, useState } from 'react';
import LandingPage from './pages/LandingPage';
import { Router } from 'lucide-react';
import Navbar from './components/Navbar';
import Sidebar from './components/SidebarComponent';
import GenericCardComponent from './components/GenericPostCard';
import axios from 'axios'

function App() {
  const [Initialdata, setInitialdata] = useState([])
  const fetchInitailData = async() => {
    const ResponseData = await axios.get("https://post-dev.onrender.com/api/posts/allPosts")
    setInitialdata(ResponseData.data.data);
    console.log(Initialdata)
  }

  useEffect(()=>{
    console.log("fetching...")
    fetchInitailData()
    console.log(Initialdata)
  }, [])

  return (
    <div className="min-h-screen max-h-screen bg-[#0a0a0a] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] w-screen flex overflow-hidden">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <div className="w-full flex flex-col items-center overflow-y-scroll max-h-full">
          <div className="w-fit pb-[95px]  grid grid-cols-4 p-5 gap-10 max-2xl:grid-cols-3 max-xl:grid-cols-2">
            {
              Initialdata.map((post, index)=>{
                return (
                  <GenericCardComponent
                    title={post.title}
                    desc={post.desc}
                    image={"dfsdfsdfd"}
                    likes_count={post.likes_count}
                    comments_count={post.comments.length}
                  />
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;