import { encryptText } from "../index";
import { ENCRYPT_TEXT } from "../types";

describe("encrypt text", () => {
    it("has the correct type", () => {
        const action = encryptText();

        expect(action.type).toEqual(ENCRYPT_TEXT);
    }); 

    it("has the correct content", () => {
        const action = encryptText(" text to be encrypted ");

        expect(action.content).toEqual(" text to be encrypted ");
    });
});