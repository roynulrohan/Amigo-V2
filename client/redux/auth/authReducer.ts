import { AUTH, DELETE_USER, LOGOUT, UPDATE_USERNAME, UPDATE_PHOTOURL } from '../constants';

const authReducer = (state = { authData: null }, action: any) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
            return { ...state, authData: action?.payload };
        case LOGOUT:
            localStorage.removeItem('profile');
            return { ...state, authData: null };
        case UPDATE_USERNAME:
            const userObjectNewName = JSON.parse(localStorage.getItem('profile') || '{}');
            userObjectNewName.user.username = action?.payload.newUsername;
            localStorage.setItem('profile', JSON.stringify(userObjectNewName));
            return { ...state, authData: userObjectNewName };
        case UPDATE_PHOTOURL:
            const userObjectNewPhoto = JSON.parse(localStorage.getItem('profile') || '{}');
            userObjectNewPhoto.user.photoURL = action?.payload.newPhotoURL;
            localStorage.setItem('profile', JSON.stringify(userObjectNewPhoto));
            return { ...state, authData: userObjectNewPhoto };
        case DELETE_USER:
            localStorage.removeItem('profile');
            return { ...state, authData: null };
        default:
            return state;
    }
};

export default authReducer;
