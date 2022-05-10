import { User } from '../../models/User';
import { UserInputError, AuthenticationError, ApolloError } from 'apollo-server-express';
import { verifyToken } from '../../middleware/auth';
import { Conversation } from '../../models/Conversation';
import { Message } from '../../models/Message';

export const ConversationResolver = {
    Query: {
        getAllConversations: async (_, args, context) => {
            const token = context.req.headers.authorization;

            const result = verifyToken({ token: token.split(' ')[1] });

            if (result.error) {
                throw new AuthenticationError(result.error);
            }
            const senderUser: any = await User.findById(result.userId);

            const conversations: any = await Conversation.find(
                {
                    participants: { $regex: senderUser.username, $options: 'i' },
                    messages: { $exists: true, $ne: [] },
                },
                { _id: true, participants: true, messages: { $slice: -1 }, createdAt: true, updatedAt: true }
            );

            return conversations;
        },
        getConversation: async (_, { receiver }, context) => {
            const token = context.req.headers.authorization;

            const result = verifyToken({ token: token.split(' ')[1] });

            if (result.error) {
                throw new AuthenticationError(result.error);
            }

            const senderUser: any = await User.findById(result.userId);
            const receiverUser: any = await User.findOne({ username: receiver });

            if (senderUser.username === receiver) {
                throw new UserInputError("Receiver can't be self");
            }

            if (!receiverUser || !senderUser) {
                throw new UserInputError("Receiver doesn't exist");
            }

            const conversation: any = await Conversation.findOne({
                $and: [{ participants: { $regex: senderUser.username, $options: 'i' } }, { participants: { $regex: receiver, $options: 'i' } }],
            });

            if (conversation) {
                return conversation;
            } else {
                const newConversation = new Conversation({
                    participants: [senderUser.username, receiver],
                });

                const savedConversation = await newConversation.save();

                return savedConversation;
            }
        },
    },

    Mutation: {
        sendMessage: async (_, { receiver, message }, context) => {
            const token = context.req.headers.authorization;

            const result = verifyToken({ token: token.split(' ')[1] });

            if (result.error) {
                throw new AuthenticationError(result.error);
            }

            const senderUser: any = await User.findById(result.userId);
            const receiverUser: any = await User.findOne({ username: receiver });

            if (senderUser.username === receiver) {
                throw new UserInputError("Receiver can't be self");
            }

            if (!receiverUser || !senderUser) {
                throw new UserInputError("Receiver doesn't exist");
            }

            const newMessage = new Message({
                sender: senderUser.username,
                content: message,
                dateCreated: Date.now(),
            });

            const updatedConversation: any = await Conversation.findOneAndUpdate(
                {
                    $and: [{ participants: { $regex: senderUser.username, $options: 'i' } }, { participants: { $regex: receiver, $options: 'i' } }],
                },
                { $push: { messages: newMessage } },
                { new: true, upsert: true }
            );

            return updatedConversation;
        },
    },
};
