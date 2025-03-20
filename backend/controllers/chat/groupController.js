import Chat from "../../models/Chat.js";

export const createGroup = async (req, res) => {
    const { name, participantIds } = req.body;
    const userId = req.user._id;

    const newGroup = new Chat({
        type: 'group',
        name,
        participants: [userId, ...participantIds]
    });
    await newGroup.save();
    res.status(201).json(newGroup);
};

export const leaveGroup = async (req, res) => {
    const { chatId } = req.params;
    const userId = req.user._id;

    const chat = await Chat.findById(chatId);
    if (!chat || chat.type !== 'group') return res.status(404).json({ error: "Group not found" });

    chat.participants = chat.participants.filter(id => id.toString() !== userId.toString());
    await chat.save();
    res.status(200).json({ message: "Left group" });
};