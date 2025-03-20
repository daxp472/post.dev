import { Link, NavLink } from "react-router-dom";
import { AiFillProfile, AiOutlineHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FiEdit3, FiLink, FiBell, FiSettings, FiLogOut, FiMessageSquare } from "react-icons/fi"; // FiMessageSquare add kiya
import { CgProfile } from "react-icons/cg";

const navItems = [
    { icon: AiOutlineHome, text: "Home", path: "/" },
    { icon: BiSearch, text: "Explore", path: "/explore" },
    { icon: FiEdit3, text: "Create a post", path: "/create" },
    { icon: FiLink, text: "Share a link", path: "/share" },
    { icon: FiBell, text: "Activity", path: "/activity" },
    { icon: FiMessageSquare, text: "Chats", path: "/chats" }, // Chat option add kiya
    { icon: FiSettings, text: "Settings", path: "/more/settings" },
];

export default function Sidebar() {
    return (
        <>
            <aside className="w-64 max-md:w-full max-md:py-0 max-md:flex border-r border-zinc-800 bg-zinc-900/50 backdrop-blur-xl h-screen max-md:h-fit max-lg:w-fit max-md:fixed max-md:bottom-0 max-md:z-50">
                <div className="flex h-full min-md:flex-col max-md:flex-row min-md:justify-between p-4 max-lg:w-16 max-md:w-full max-md:p-0">
                    <div className="flex flex-col gap-10 py-2 max-lg:w-8 max-md:flex-col max-md:w-full">
                        {/* Logo */}
                        <div className="flex items-center gap-2 max-lg:w-fit max-md:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-infinity h-8 w-8 text-[#ff4d4d]"
                            >
                                <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"></path>
                            </svg>
                            <span className="text-xl font-semibold text-white max-lg:hidden">
                                Daily<span className="text-zinc-400">.POST</span>
                            </span>
                        </div>
                        <nav className="space-y-2 max-md:space-y-0 max-lg:space-y-0 max-md:flex max-md:w-full max-md:justify-evenly">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 rounded-lg px-3 py-2 max-lg:w-fit max-lg:p-2 text-sm font-medium transition-colors ${
                                            isActive
                                                ? "bg-purple-500/10 text-purple-500"
                                                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                                        } ${item.text === "Settings" ? "max-md:hidden" : ""}`
                                    }
                                >
                                    <item.icon className="h-5 w-5 max-lg:w-fit" />
                                    <span className="max-lg:hidden">{item.text}</span>
                                </NavLink>
                            ))}
                        </nav>
                    </div>

                    <div className="max-md:hidden">
                        <Link
                            to={"/profile"}
                            className="flex items-center gap-3 max-lg:p-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                        >
                            <CgProfile className="h-5 w-5" />
                            <span className="max-lg:hidden">Profile</span>
                        </Link>
                        <button className="flex items-center gap-3 max-lg:p-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white">
                            <FiLogOut className="h-5 w-5" />
                            <span className="max-lg:hidden">Log out</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}