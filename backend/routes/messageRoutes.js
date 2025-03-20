import express from "express";
import { sendMessage, getMessages } from "../controllers/chat/messageController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/send", authMiddleware, sendMessage); // Send a message
router.get("/:chatId", authMiddleware, getMessages); // Get messages of a chat

export default router;