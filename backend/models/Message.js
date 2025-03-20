import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['sent', 'delivered', 'read'],
        default: 'sent'
    },
    media: { // Images ya GIFs ke liye
        type: String,
        default: null
    }
}, {
    timestamps: true
});

messageSchema.index({ chatId: 1, createdAt: -1 });
const Message = mongoose.model('Message', messageSchema);
export default Message;