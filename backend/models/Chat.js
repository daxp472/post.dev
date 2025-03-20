import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['private', 'group'],
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    name: { // Group ke liye optional
        type: String,
        trim: true,
        required: function() { return this.type === 'group'; }
    },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }
}, {
    timestamps: true
});

chatSchema.index({ participants: 1 });
const Chat = mongoose.model('Chat', chatSchema);
export default Chat;