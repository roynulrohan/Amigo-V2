import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation LoginUser($username: String!, $password: String!) {
        loginUser(username: $username, password: $password) {
            user {
                _id
                username
                photoURL
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
                dateJoined
            }
            token
        }
    }
`;
