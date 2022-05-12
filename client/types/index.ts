export interface UserData {
    _id: string;
    username?: string;
    photoURL?: string;
    contacts?: string[];
    dateJoined: Date;
}

export interface AuthData {
    user: UserData;
    token: string;
}

export interface AuthState {
    authData: AuthData;
    preferredStatus: string;
}

export interface AuthReducer {
    auth: AuthState;
}

export interface EmittedUserStatus {
    id: string;
    status: string;
}

export interface GeneralState {
    onlineUsers: EmittedUserStatus[];
    currentConversation: Conversation;
    conversationCount: number;
}

export interface GeneralReducer {
    general: GeneralState;
}

export interface Conversation {
    _id: string;
    participants: string[];
    messages: [Message];
    createdAt: Date;
    updatedAt: Date;
}

export interface Message {
    _id: string;
    sender: string;
    content: string;
    dateCreated: Date;
}
