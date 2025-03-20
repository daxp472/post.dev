import Chat from "../../models/Chat.js";
import Message from "../../models/Message.js";

export const createChat = async (req, res) => {
    const { participantId } = req.body; // Dusre user ka ID
    const userId = req.user._id; // Logged-in user

    const existingChat = await Chat.findOne({
        type: 'private',
        participants: { $all: [userId, participantId] }
    });

    if (existingChat) return res.status(200).json(existingChat);

    const newChat = new Chat({
        type: 'private',
        participants: [userId, participantId]
    });
    await newChat.save();
    res.status(201).json(newChat);
};

export const getUserChats = async (req, res) => {
    const userId = req.user._id;
    const chats = await Chat.find({ participants: userId })
        .populate('participants', 'username avatar')
        .populate('lastMessage');
    res.status(200).json(chats);
};