import { Server } from "socket.io";
import { socketMiddleware } from "../middleware/socketMiddleware.js";

let io;

export const setupSocket = (server) => {
    io = new Server(server, {
        cors: { origin: process.env.FRONTEND_URL || "*" }
    });

    io.use(socketMiddleware); // Auth middleware for sockets

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.user._id}`);

        socket.on("joinChat", (chatId) => {
            socket.join(chatId); // User chat room mein join karta hai
        });

        socket.on("sendMessage", (message) => {
            io.to(message.chatId).emit("newMessage", message); // Chat room mein broadcast
        });

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.user._id}`);
        });
    });
};

export const getIO = () => {
    if (!io) throw new Error("Socket.io not initialized");
    return io;
};