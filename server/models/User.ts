import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    contacts: {
        type: Array,
        default: [],
    },
    dateJoined: {
        type: Date,
        default: Date.now,
    },
    photoURL: {
        type: String,
        default: '',
    },
});

export const User = mongoose.model('User', UserSchema);
