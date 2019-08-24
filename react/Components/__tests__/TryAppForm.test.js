import React from "react";
import { mount, simulate } from "enzyme";
import TryAppForm from "../TryAppForm";
import Root from "../../Root"; 

let wrapped;

beforeEach(() => {
    const initialState = {
        encrypt: { encryption: "Encrypted text"}
    }

    wrapped = mount(
        <Root initialState={initialState}>
            <TryAppForm />
        </Root>
    );
});

afterEach(() => {
    wrapped.unmount();
}); 

it("has an input form", () => {
   expect(wrapped.find("input").length).toEqual(1);
});

it("has an input that users can type into", () => {
    wrapped.find("input").simulate("change", {
        target: { value: "new comment" }
    });

    wrapped.update();

    expect(wrapped.find("input").prop("value")).toEqual("new comment");
});

it("has a select box that users can choose the cipher", () => {
    wrapped.find("select").simulate("change", {
        target: { value: "double-transposition" }
    });
    wrapped.update();    

    expect(wrapped.find("select").prop("value")).toEqual("double-transposition");
});

it("has the encryption of appear if it is inside the reducer already", () => {
    expect(wrapped.find(".try_result_box").html()).toEqual(`<div class=\"try_result_box\">Encrypted text</div>`)
});

// it("validates the input to not have a length > 30", () => {
//     wrapped.find("input").simulate("change", {
//         target: { value: `This is a sentence with over 30 characters long. 
//         It should not go through.` }
//     });

//     //wrapped.update();  

//      wrapped.find("input").simulate("click");
//     expect(wrapped.find("#try_input_errors").html()).toEqual("double-transposition");
// });

// it("has an input that gets submitted", () => {
//     wrapped.find("input").simulate("change", {
//         target: { value: "new comment" }
//     });
//     wrapped.update();  
//     wrapped.find("select").simulate("change", {
//         target: { value: "double-transposition" }
//     });
//     wrapped.update();  
//     wrapped.find("form").simulate("submit");

//     wrapped.update();

//     expect(wrapped.find(".try_result_box").html()).toEqual(" some text ")
// });
// test that the input gets submitted

// test that encryption appears after submission

// make sure that the input validates length < 0 (or empty)