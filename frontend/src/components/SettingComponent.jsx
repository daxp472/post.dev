import { useState } from 'react'
import { FiUser, FiLock, FiSettings, FiMonitor, FiTag, FiUsers, FiMoreHorizontal, FiArrowLeft } from 'react-icons/fi'
import ProfileSectionComponent from './ProfileSectionComponent'

const menuItems = [
  { icon: FiUser, label: 'Profile' },
  { icon: FiLock, label: 'Privacy' },
  { icon: FiSettings, label: 'Customization' },
  { icon: FiMonitor, label: 'Topics' },
  { icon: FiTag, label: 'Ads' },
  { icon: FiUsers, label: 'Others' },
]

function SettingComponents() {
  const [selectedItem, setSelectedItem] = useState('Profile')

  return (
    <div className="flex min-h-screen bg-[#18181E] text-white">
      {/* Sidebar */}
      <div className="w-full max-md:w-fit max-lg:w-fit max-w-[270px] max-md:pt-16 border-r border-gray-800 p-4 block md:block">
        <div className="flex items-center gap-2 mb-8">
          <div className="text-2xl font-bold max-md:hidden">Settings</div>
        </div>
        <nav className='space-y-2 max-md:space-y-0 max-md:gap-3 max-md:flex max-md:flex-col'> 
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.label}
                onClick={() => setSelectedItem(item.label)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 max-lg:w-fit max-lg:p-2 text-sm font-medium w-full cursor-pointer ${
                  selectedItem === item.label
                    ? 'bg-gray-800'
                    : 'hover:bg-gray-900'
                }`}
              >
                <Icon className="w-5 max-md:w-fit h-5" />
                <span className='max-md:hidden'>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#111112] border-b border-gray-800 p-4">
        <div className="flex items-center gap-4">
          <button className="p-2"
            onClick={()=>window.history.back()}
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>
      </div>


      {/* Main Content */}
      <div className="flex-1 p-8 block max-md:p-0">
        <h2 className="text-2xl font-bold mb-6">{selectedItem}</h2>
        <div className="space-y-6">
          {/* Content will go here based on selected item */}
          <div className="bg-[#18181E] rounded-lg p-4 max-md:p-0 pt-[73px] flex items-center flex-col ">
            {/* Sample content for {selectedItem} */}
            {
                (selectedItem == 'Profile') ? <ProfileSectionComponent /> : `Sample content for ${selectedItem}`
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingComponents