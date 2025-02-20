import React from 'react'
import SettingComponents from '../components/SettingComponent'
import Sidebar from '../components/SidebarComponent'
import Navbar from '../components/Navbar'

const SettingsPage = () => {
  return (
    <div className="h-screen bg-[#18181E] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] w-screen flex overflow-hidden">
          <Sidebar />
          <div className="w-full">
            {/* <Navbar /> */}
            <div className="w-full overflow-y-scroll max-h-full">
              
              <SettingComponents />
              
            </div>
          </div>
        </div>
  )
}

export default SettingsPage