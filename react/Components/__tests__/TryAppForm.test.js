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

it("has the encryption appear if it is inside the reducer already", () => {
    expect(wrapped.find(".try_result_box").render().text()).toContain("Encrypted text")
});

it("validates the input to not have a length > 30", () => {
    wrapped.find("input").simulate("change", {
        target: { value: `This is a sentence with over 30 characters long. 
        It should not go through.` }
    });
    wrapped.find("input").simulate("blur")
    expect(wrapped.find("#try_input_errors").render().text()).toContain("The input must be shorter than 30 characters");
});


it("validates the input to not be empty", () => {
    wrapped.find("input").simulate("change", {
        target: { value: `` }
    });
    wrapped.find("input").simulate("blur")
    expect(wrapped.find("#try_input_errors").render().text()).toContain("You must enter some text");
});