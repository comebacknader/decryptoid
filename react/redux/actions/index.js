import { ENCRYPT_TEXT } from './types';

export const encryptText = (content) => ({
    type: ENCRYPT_TEXT,
    content 
}); 