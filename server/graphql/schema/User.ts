import { gql } from 'apollo-server-express';

export const UserTypeDef = gql`
    scalar Date

    type User {
        _id: String!
        username: String!
        contacts: [String]!
        photoURL: String!
        dateJoined: Date!
    }

    type UserResponse {
        user: User
        token: String
    }

    type Query {
        getUser: UserResponse!
        getPhoto(username: String!): String
    }

    type photoUrlResponse {
        newPhotoURL: String
    }

    type usernameChangeResponse {
        newUsername: String!
    }

    type contactResponse {
        updatedContacts: [String]!
    }

    type Mutation {
        registerUser(username: String!, password: String!, confirmPassword: String!): UserResponse
        loginUser(username: String!, password: String!): UserResponse
        updatePhoto(url: String!): photoUrlResponse
        changeUsername(newUsername: String!, confirmPassword: String!): usernameChangeResponse
        addContact(contact: String!): contactResponse
        deleteContact(contact: String!): contactResponse
    }
`;
