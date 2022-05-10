import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';
import authReducer from './auth/authReducer';

const rootReducer = combineReducers({
    auth: authReducer,
});

const middleware = [thunk];
const composeEnhancers = composeWithDevTools(applyMiddleware(...middleware));

export const store = createStore(rootReducer, composeEnhancers);

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
