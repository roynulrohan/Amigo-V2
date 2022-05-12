import { gql } from 'apollo-server-express';

export const ConversationTypeDef = gql`
    scalar Date

    type Message {
        _id: String!
        sender: String!
        content: String!
        dateCreated: Date!
    }

    type Conversation {
        _id: String!
        participants: [String]!
        messages: [Message]!
        createdAt: Date!
        updatedAt: Date!
    }

    type ConversationResponse {
        conversation: Conversation
    }

    type Query {
        getAllConversations: [Conversation]
        getConversation(receiver: String!): Conversation
    }

    type Mutation {
        sendMessage(receiver: String!, message: String!): Conversation
    }
`;
