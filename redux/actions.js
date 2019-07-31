import { SIGNUP_USER } from './actionTypes';
import { ENCRYPT_TEXT } from './actionTypes';

export const signupUser = (content) => ({
    type: SIGNUP_USER,
    content
});

export const encryptText = (content) => ({
    type: ENCRYPT_TEXT,
    content 
}); 