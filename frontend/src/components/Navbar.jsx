// import { SiInfinity } from "react-icons/si"
import { IoSearch, IoNotificationsOutline } from "react-icons/io5"
import { FaRegUserCircle } from "react-icons/fa"

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-xl w-full">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        

        {/* Search */}
        <div className="flex-1 px-20">
          <div className="relative">
            <IoSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-full bg-zinc-800/50 py-2 pl-10 pr-4 text-white placeholder-zinc-400 outline-none ring-1 ring-zinc-700 focus:ring-2 focus:ring-purple-500/50"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <button className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black transition-colors hover:bg-zinc-200">
            New Post
          </button>
          <button className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white">
            <IoNotificationsOutline className="h-6 w-6" />
          </button>
          <button className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white">
            <FaRegUserCircle className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  )
}

