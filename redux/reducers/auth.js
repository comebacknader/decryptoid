import { SIGNUP_USER } from "../actionTypes";
// The reducer function goes here

const initialState = {
    sessionID : ''
};

export default function(state = initialState, action) {
    switch (action) {
        case SIGNUP_USER: {
            const { sessionID } = action.content;
            return { ...state, sessionID };
        }
        default:
            return state;
    }
};