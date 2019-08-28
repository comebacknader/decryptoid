import { encryptText } from "../index";
import { ENCRYPT_TEXT } from "../types";

describe("encrypt text", () => {
    let formValues;
    beforeEach(() => {
         formValues = {text_to_transform: "text to be encrypted", select_cipher: "double-transposition"}
    })
    
    it("has the correct type", async () => {
        const response = await encryptText(formValues)

        expect(response.type).toEqual(ENCRYPT_TEXT);
    }); 

    it("has the correct content", async () => {
        const response = await encryptText(formValues)

        expect(response.content).toEqual("otb eettx pyetde cnr");
    });
});