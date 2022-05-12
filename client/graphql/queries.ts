import { gql } from '@apollo/client';

export const VERIFY_USER = gql`
    query GetUser {
        getUser {
            user {
                _id
                username
                photoURL
                dateJoined
                contacts
            }
            token
        }
    }
`;

export const GET_ALL_CONVERSATIONS = gql`
    query GetAllConversations {
        getAllConversations {
            _id
            participants
            messages {
                _id
                sender
                content
                dateCreated
            }
            createdAt
            updatedAt
        }
    }
`;

export const GET_CONVERSATION = gql`
    query GetConversation($receiver: String!) {
        getConversation(receiver: $receiver) {
            _id
            participants
            messages {
                _id
                sender
                content
                dateCreated
            }
            createdAt
            updatedAt
        }
    }
`;

export const GET_PHOTO = gql`
    query GetPhoto($username: String!) {
        getPhoto(username: $username)
    }
`;
