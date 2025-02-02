import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import { Router } from 'lucide-react';
import Navbar from './components/Navbar';
import Sidebar from './components/SidebarComponent';
import GenericCardComponent from './components/GenericPostCard';

function App() {
  const [data, useData] = useState({})
  const fetchInitailData = async() => {
    // const ResponseData = await axios
  }

  return (
    <div className="min-h-screen max-h-screen bg-[#0a0a0a] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] w-screen flex overflow-hidden">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <div className="w-full flex flex-col items-center overflow-y-scroll max-h-full">
          <div className="w-fit pb-[95px]  grid grid-cols-4 p-5 gap-10 max-2xl:grid-cols-3 max-xl:grid-cols-2">
            <GenericCardComponent
              title={"What is web dev ?"}
              desc={"loremsdlfjla fda dfads fdsa dsa fdsa dsa fa sdf asdf adsf "}
              image={"dfsdfsdfd"}
              likes_count={12}
              comments_count={12}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;