import React from 'react'
import ContentEditor from '../components/ContentCreator'
import Sidebar from '../components/SidebarComponent'
import Navbar from '../components/Navbar'

const CreatePostPage = () => {
  return (
    <div className="h-screen bg-[#0a0a0a] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] w-screen flex overflow-hidden">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <div className="w-full flex flex-col items-center overflow-y-scroll h-[calc(100vh-64px)] scrollbar-hidden">
          
          <ContentEditor />
          
        </div>
      </div>
    </div>
  )
}

export default CreatePostPage


