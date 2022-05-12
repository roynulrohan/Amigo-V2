import { Conversation } from '../../types';
import { CONVERSATIONS, CONVERSATION_COUNT, CURRENT_CONVERSATION, ONLINE_USERS, SEND_MESSAGE } from '../constants';

const initialState: any = { onlineUsers: [], conversations: [], currentConversation: null, conversationCount: 0 };

const generalReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CONVERSATIONS:
            return {
                ...state,
                conversations: action.payload,
            };
        case SEND_MESSAGE:
            const conversationsCopy: Conversation[] = [...state.conversations];

            const conversationIndex = conversationsCopy.findIndex((x) => x._id == action.payload.conversation._id);

            if (conversationIndex !== -1) {
                conversationsCopy[conversationIndex] = action.payload.conversation;
            } else {
                conversationsCopy.push(action.payload.conversation);
            }

            let toReturn = {
                ...state,
                conversations: conversationsCopy,
            };

            if (state.currentConversation && action.payload.conversation._id === state.currentConversation._id) {
                toReturn['currentConversation'] = action.payload.conversation;
            }

            return toReturn;
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
