import mongoose, { Schema } from 'mongoose';

const ConversationSchema = new Schema(
    {
        participants: {
            type: Array,
            required: true,
        },
        messages: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    }
);

export const Conversation = mongoose.model('Conversation', ConversationSchema);
