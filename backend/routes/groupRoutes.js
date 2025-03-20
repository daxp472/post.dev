import express from "express";
import { createGroup, leaveGroup } from "../controllers/chat/groupController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createGroup); // Create a group
router.put("/leave/:chatId", authMiddleware, leaveGroup); // Leave a group

export default router;