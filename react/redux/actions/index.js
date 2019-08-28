import { ENCRYPT_TEXT } from './types';
import axios from "axios";

export async function encryptText(content) {
    
    const response = await axios.post(
        'http://localhost:3000/api/upload', {
            cipher: content.select_cipher,
            text: content.text_to_transform
        })
    return {
        type: ENCRYPT_TEXT,
        content: response.data.msg
    }; 
}