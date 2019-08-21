import { ENCRYPT_TEXT } from "../actionTypes";

const initialState = {
    encryption : ""
};

export default function(state = initialState, action) {
    switch(action.type){
        case ENCRYPT_TEXT: {
            return { ...state, encryption: action.content };
        }
        default:
            return state;
    }
};