import express from "express";
import { createChat, getUserChats } from "../controllers/chat/chatController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createChat); // New private chat
router.get("/my-chats", authMiddleware, getUserChats); // Get user's chats

export default router;