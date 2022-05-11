import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation LoginUser($username: String!, $password: String!) {
        loginUser(username: $username, password: $password) {
            user {
                _id
                username
                photoURL
                contacts
                dateJoined
            }
            token
        }
    }
`;

export const REGISTER_USER = gql`
    mutation RegisterUser($username: String!, $password: String!, $confirmPassword: String!) {
        registerUser(username: $username, password: $password, confirmPassword: $confirmPassword) {
            user {
                _id
                username
                photoURL
                contacts
                dateJoined
            }
            token
        }
    }
`;
export const ADD_CONTACT = gql`
    mutation AddContact($contact: String!) {
        addContact(contact: $contact) {
            updatedContacts
        }
    }
`;
