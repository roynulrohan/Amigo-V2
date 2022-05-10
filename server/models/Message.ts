import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
    sender: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

export const Message = mongoose.model('Message', MessageSchema);
