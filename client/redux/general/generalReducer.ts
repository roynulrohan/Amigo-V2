import { CONVERSATION_COUNT, CURRENT_CONVERSATION, ONLINE_USERS } from '../constants';

const initialState = { onlineUsers: [], currentConversation: null, conversationCount: 0 };

const generalReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CONVERSATION_COUNT:
            return {
                ...state,
                conversationCount: action.payload,
            };
        case CURRENT_CONVERSATION:
            return {
                ...state,
                currentConversation: action.payload,
            };
        case ONLINE_USERS:
            return {
                ...state,
                onlineUsers: action.payload,
            };
        default:
            return state;
    }
};

export default generalReducer;
