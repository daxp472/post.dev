import React from 'react'
import Sidebar from '../components/SidebarComponent'
import Navbar from '../components/Navbar'
import GenericCardComponent from '../components/GenericCardComponent'
import ScrollableTags from '../components/TagslistGenericComponent'

const ExplorePage = () => {
  const Tags = ["Artificial Intelligence", "Machine Learning", "Neural Networking", "Nextjs", "Reactjs", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Bootstrap 5", "Vue js", "Python", "Rust", "AI and ML"]
  return (
    <div className="h-screen bg-[#0a0a0a] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] w-screen flex overflow-hidden">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <div className="w-full flex flex-col items-center overflow-y-scroll max-h-full">
          <div className="w-full px-5 pt-10">
            <ScrollableTags tags={Tags} onTagClick={() => console.log("working")} />
          </div>
          
          <div className="w-fit pb-[95px]  grid grid-cols-4 p-5 gap-10 max-2xl:grid-cols-3 max-xl:grid-cols-2">
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
            <GenericCardComponent />
            <GenericCardComponent />
            <GenericCardComponent />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExplorePage