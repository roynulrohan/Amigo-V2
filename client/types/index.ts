export interface UserData {
    _id: string;
    username?: string;
    photoURL?: string;
    dateJoined: any;
}

export interface AuthData {
    user: UserData;
    token: string;
}

export interface AuthState {
    authData: AuthData;
}

export interface AuthReducer {
    auth: AuthState;
}

export interface Conversation {
    _id: string;
    participants: string[];
    messages: [Message];
    createdAt: Date;
    updatedAt: Date;
}

export interface Message {
    sender: string;
    content: string;
    dateCreated: Date;
}
