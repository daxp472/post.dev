import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/mongodbConfig.js";
import cors from "cors";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js"; // New chat routes
import messageRoutes from "./routes/messageRoutes.js"; // New message routes
import groupRoutes from "./routes/groupRoutes.js"; // New group routes
import { setupSocket } from "./utils/socketSetup.js"; // Socket.io setup
import admin from "firebase-admin"; // Firebase for notifications
import serviceAccount from "./config/firebaseConfig.js"; // Firebase config

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;


app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
}));

// MongoDB connection
connectDB().catch(err => console.error("DB Connection Error:", err));

// Middleware for parsing requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes); // Chat routes
app.use('/api/messages', messageRoutes); // Message routes
app.use('/api/groups', groupRoutes); // Group routes

// Firebase initialization
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// HTTP server banaya for Socket.io
const server = app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

// Socket.io setup
setupSocket(server);

export default server;