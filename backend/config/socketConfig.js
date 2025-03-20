import { Server } from "socket.io";

const socketConfig = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL || "http://localhost:3000", // Frontend URL
            methods: ["GET", "POST"],
            credentials: true
        },
        pingTimeout: 60000, // Connection timeout (60s)
        pingInterval: 25000 // Heartbeat interval (25s)
    });

    return io; // Initialized Socket.io instance return karo
};

export default socketConfig;