import { ONLINE_USERS } from '../constants';

const initialState = { onlineUsers: [] };

const generalReducer = (state = initialState, action: any) => {
    switch (action.type) {
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
