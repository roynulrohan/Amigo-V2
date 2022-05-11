import { AUTH, LOGOUT, UPDATE_USERNAME, UPDATE_PHOTOURL, UPDATE_CONTACTS, UPDATE_PREFERREDSTATUS } from '../constants';

const authReducer = (state = { authData: null }, action: any) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
            const preferredStatus = JSON.parse(localStorage.getItem('preferredStatus') || '{}') || 'online';

            return { ...state, authData: action?.payload, preferredStatus };
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
        case UPDATE_CONTACTS:
            const userObjectNewContacts = JSON.parse(localStorage.getItem('profile') || '{}');
            userObjectNewContacts.user.contacts = action?.payload.newContacts;
            localStorage.setItem('profile', JSON.stringify(userObjectNewContacts));

            return { ...state, authData: userObjectNewContacts };
        case UPDATE_PREFERREDSTATUS:
            localStorage.setItem('preferredStatus', JSON.stringify(action?.payload));

            return { ...state, preferredStatus: action?.payload };
        default:
            return state;
    }
};

export default authReducer;
