import { useState, useEffect } from "react";
import { FiSend, FiMessageSquare } from "react-icons/fi";

const ChatsPage = ({ socket }) => {
    const [chats, setChats] = useState([]); // User's chat list
    const [selectedChat, setSelectedChat] = useState(null); // Active chat
    const [messages, setMessages] = useState([]); // Messages of selected chat
    const [newMessage, setNewMessage] = useState(""); // Input for new message

    // Fetch user's chats on mount
    useEffect(() => {
        const fetchChats = async () => {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/chats/my-chats`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await res.json();
            setChats(data);
        };
        fetchChats();
    }, []);

    // Fetch messages when a chat is selected
    useEffect(() => {
        if (selectedChat) {
            const fetchMessages = async () => {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/messages/${selectedChat._id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const data = await res.json();
                setMessages(data);
            };
            fetchMessages();

            // Join chat room via Socket.io
            socket.emit("joinChat", selectedChat._id);
        }
    }, [selectedChat, socket]);

    // Real-time message listener
    useEffect(() => {
        socket.on("newMessage", (message) => {
            if (message.chatId === selectedChat?._id) {
                setMessages((prev) => [...prev, message]);
            }
            // Update chat list's last message if needed
            setChats((prev) =>
                prev.map((chat) =>
                    chat._id === message.chatId ? { ...chat, lastMessage: message } : chat
                )
            );
        });

        return () => socket.off("newMessage"); // Cleanup listener
    }, [socket, selectedChat]);

    // Send message
    const handleSendMessage = async () => {
        if (!newMessage.trim() || !selectedChat) return;

        const messageData = {
            chatId: selectedChat._id,
            content: newMessage,
        };

        // Send to backend
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
            socket.emit("sendMessage", sentMessage); // Broadcast via Socket.io
            setNewMessage(""); // Clear input
        }
    };

    return (
        <div className="flex h-screen bg-zinc-900 text-white">
            {/* Chat List (Left Side) */}
            <div className="w-1/4 border-r border-zinc-800 p-4 flex flex-col gap-4">
                <h2 className="text-xl font-semibold text-zinc-200">Chats</h2>
                {chats.length === 0 ? (
                    <p className="text-zinc-400">No chats yet</p>
                ) : (
                    chats.map((chat) => (
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
                                    : chat.participants.find((p) => p._id !== localStorage.getItem("userId"))?.username}
                            </span>
                        </div>
                    ))
                )}
            </div>

            {/* Chat Window (Right Side) */}
            <div className="w-3/4 flex flex-col">
                {selectedChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-zinc-800">
                            <h3 className="text-lg font-medium text-zinc-200">
                                {selectedChat.type === "group"
                                    ? selectedChat.name
                                    : selectedChat.participants.find((p) => p._id !== localStorage.getItem("userId"))
                                          ?.username}
                            </h3>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 overflow-y-auto">
                            {messages.map((msg) => (
                                <div
                                    key={msg._id}
                                    className={`mb-2 p-2 rounded-lg ${
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

                        {/* Message Input */}
                        <div className="p-4 border-t border-zinc-800 flex items-center gap-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 p-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:border-purple-500"
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
                        Select a chat to start messaging
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatsPage;