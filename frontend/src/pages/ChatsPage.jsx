import React, { useState, useEffect } from "react";
import Sidebar from "../components/SidebarComponent";
import Navbar from "../components/Navbar";
import { FiSend, FiMessageSquare, FiPlus, FiUsers } from "react-icons/fi"; // FiPlus aur FiUsers add kiye

const ChatsPage = ({ socket }) => {
    const [chats, setChats] = useState([]); // Chat list
    const [selectedChat, setSelectedChat] = useState(null); // Active chat
    const [messages, setMessages] = useState([]); // Messages
    const [newMessage, setNewMessage] = useState(""); // New message input
    const [searchQuery, setSearchQuery] = useState(""); // Search bar for chats/users
    const [users, setUsers] = useState([]); // Search results for users
    const [groupName, setGroupName] = useState(""); // Group creation input
    const [selectedUsers, setSelectedUsers] = useState([]); // Users for group
    const [showGroupModal, setShowGroupModal] = useState(false); // Group creation modal

    // Fetch user's chats
    useEffect(() => {
        const fetchChats = async () => {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/chats/my-chats`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            const data = await res.json();
            setChats(data);
        };
        fetchChats();
    }, []);

    // Fetch messages for selected chat
    useEffect(() => {
        if (selectedChat) {
            const fetchMessages = async () => {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/messages/${selectedChat._id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                const data = await res.json();
                setMessages(data);
            };
            fetchMessages();
            socket.emit("joinChat", selectedChat._id);
        }
    }, [selectedChat, socket]);

    // Real-time messaging
    useEffect(() => {
        socket.on("newMessage", (message) => {
            if (message.chatId === selectedChat?._id) {
                setMessages((prev) => [...prev, message]);
            }
            setChats((prev) =>
                prev.map((chat) =>
                    chat._id === message.chatId ? { ...chat, lastMessage: message } : chat
                )
            );
        });
        return () => socket.off("newMessage");
    }, [socket, selectedChat]);

    // Search users for new chat/group
    useEffect(() => {
        if (searchQuery) {
            const fetchUsers = async () => {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/search?q=${searchQuery}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                const data = await res.json();
                setUsers(data);
            };
            fetchUsers();
        } else {
            setUsers([]);
        }
    }, [searchQuery]);

    // Send message
    const handleSendMessage = async () => {
        if (!newMessage.trim() || !selectedChat) return;
        const messageData = { chatId: selectedChat._id, content: newMessage };
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/messages/send`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(messageData),
        });
        if (res.ok) {
            const sentMessage = await res.json();
            socket.emit("sendMessage", sentMessage);
            setNewMessage("");
        }
    };

    // Start new private chat
    const startNewChat = async (userId) => {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/chats/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ participantId: userId }),
        });
        const newChat = await res.json();
        setChats((prev) => [...prev, newChat]);
        setSelectedChat(newChat);
        setSearchQuery("");
        setUsers([]);
    };

    // Create group
    const handleCreateGroup = async () => {
        if (!groupName || selectedUsers.length === 0) return;
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/groups/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ name: groupName, participantIds: selectedUsers }),
        });
        const newGroup = await res.json();
        setChats((prev) => [...prev, newGroup]);
        setSelectedChat(newGroup);
        setGroupName("");
        setSelectedUsers([]);
        setShowGroupModal(false);
    };

    // Filter chats
    const filteredChats = chats.filter((chat) =>
        chat.type === "group"
            ? chat.name.toLowerCase().includes(searchQuery.toLowerCase())
            : chat.participants
                  .find((p) => p._id !== localStorage.getItem("userId"))
                  ?.username.toLowerCase()
                  .includes(searchQuery.toLowerCase())
    );

    return (
        <div className="h-screen bg-[#0a0a0a] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] w-screen flex overflow-hidden">
            <Sidebar />
            <div className="w-full">
                <Navbar />
                <div className="w-full flex h-[calc(100vh-64px)] overflow-y-scroll scrollbar-hidden">
                    {/* Chat List (Left Side) */}
                    <div className="w-1/4 border-r border-zinc-800 p-4 flex flex-col gap-4 bg-zinc-900/50">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search chats or users..."
                                className="flex-1 p-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:border-purple-500"
                            />
                            <button
                                onClick={() => setShowGroupModal(true)}
                                className="p-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600"
                            >
                                <FiPlus className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Search Results */}
                        {searchQuery && users.length > 0 && (
                            <div className="space-y-2">
                                {users.map((user) => (
                                    <div
                                        key={user._id}
                                        onClick={() => startNewChat(user._id)}
                                        className="flex items-center gap-3 p-2 rounded-lg cursor-pointer text-zinc-400 hover:bg-zinc-800 hover:text-white"
                                    >
                                        <FiMessageSquare className="h-5 w-5" />
                                        <span>{user.username}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Chat List */}
                        {filteredChats.map((chat) => (
                            <div
                                key={chat._id}
                                onClick={() => setSelectedChat(chat)}
                                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                                    selectedChat?._id === chat._id
                                        ? "bg-purple-500/10 text-purple-500"
                                        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                                }`}
                            >
                                <FiMessageSquare className="h-5 w-5" />
                                <span>
                                    {chat.type === "group"
                                        ? chat.name
                                        : chat.participants.find((p) => p._id !== localStorage.getItem("userId"))
                                              ?.username}
                                </span>
                                {chat.lastMessage && (
                                    <span className="text-xs text-zinc-500 ml-auto">
                                        {new Date(chat.lastMessage.createdAt).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Chat Window (Right Side) */}
                    <div className="w-3/4 flex flex-col bg-zinc-900/50">
                        {selectedChat ? (
                            <>
                                <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
                                    <h3 className="text-lg font-medium text-zinc-200">
                                        {selectedChat.type === "group"
                                            ? selectedChat.name
                                            : selectedChat.participants.find(
                                                  (p) => p._id !== localStorage.getItem("userId")
                                              )?.username}
                                    </h3>
                                    {selectedChat.type === "group" && (
                                        <button className="text-zinc-400 hover:text-white text-sm">
                                            {selectedChat.participants.length} members
                                        </button>
                                    )}
                                </div>
                                <div className="flex-1 p-4 overflow-y-auto">
                                    {messages.map((msg) => (
                                        <div
                                            key={msg._id}
                                            className={`mb-2 p-2 rounded-lg max-w-[70%] ${
                                                msg.senderId === localStorage.getItem("userId")
                                                    ? "ml-auto bg-purple-500/20 text-right"
                                                    : "mr-auto bg-zinc-800"
                                            }`}
                                        >
                                            <p>{msg.content}</p>
                                            <span className="text-xs text-zinc-500">
                                                {new Date(msg.createdAt).toLocaleTimeString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 border-t border-zinc-800 flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-1 p-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:border-purple-500"
                                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        className="p-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600"
                                    >
                                        <FiSend className="h-5 w-5" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-zinc-400">
                                Select a chat or start a new one
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Group Creation Modal */}
            {showGroupModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-zinc-900 p-6 rounded-lg w-96">
                        <h3 className="text-lg font-medium text-zinc-200 mb-4">Create Group</h3>
                        <input
                            type="text"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            placeholder="Group Name"
                            className="w-full p-2 mb-4 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:border-purple-500"
                        />
                        <input
                            type="text"
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search users to add..."
                            className="w-full p-2 mb-4 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:border-purple-500"
                        />
                        <div className="max-h-40 overflow-y-auto">
                            {users.map((user) => (
                                <div
                                    key={user._id}
                                    onClick={() =>
                                        setSelectedUsers((prev) =>
                                            prev.includes(user._id)
                                                ? prev.filter((id) => id !== user._id)
                                                : [...prev, user._id]
                                        )
                                    }
                                    className={`flex items-center gap-2 p-2 cursor-pointer ${
                                        selectedUsers.includes(user._id)
                                            ? "bg-purple-500/20 text-purple-500"
                                            : "text-zinc-400 hover:bg-zinc-800"
                                    }`}
                                >
                                    <FiUsers className="h-5 w-5" />
                                    <span>{user.username}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={handleCreateGroup}
                                className="flex-1 p-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600"
                            >
                                Create
                            </button>
                            <button
                                onClick={() => setShowGroupModal(false)}
                                className="flex-1 p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatsPage;