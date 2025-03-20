import Message from "../../models/Message.js";
import Chat from "../../models/Chat.js";

export const sendMessage = async (req, res) => {
    const { chatId, content, media } = req.body;
    const senderId = req.user._id;

    const message = new Message({
        chatId,
        senderId,
        content,
        media
    });
    await message.save();

    await Chat.findByIdAndUpdate(chatId, { lastMessage: message._id });
    res.status(201).json(message);
};

export const getMessages = async (req, res) => {
    const { chatId } = req.params;
    const messages = await Message.find({ chatId })
        .sort({ createdAt: 1 })
        .limit(50); // Pagination ke liye limit
    res.status(200).json(messages);
};