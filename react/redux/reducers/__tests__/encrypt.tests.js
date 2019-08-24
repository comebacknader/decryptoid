import encryptReducer from "../encrypt"; 
import ENCRYPT_TEXT from "../../actions/types";

it("handles actions with a type of ENCRYPT_TEXT", () => {
    const action = {
        type: "ENCRYPT_TEXT",
        content: "Text to be encrypted"
    }

    const newState = encryptReducer({ encryption: "" }, action);   

    expect(newState).toEqual({ encryption: "Text to be encrypted" });
});


it("handles actions with an unknown type", () => {
    const newState = encryptReducer({ encryption: "" }, {});

    expect(newState).toEqual({ encryption: "" });
});