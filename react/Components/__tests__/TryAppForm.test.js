import React from "react";
import { mount, simulate } from "enzyme";
import TryAppForm from "../TryAppForm";
import Root from "../../Root"; 

let wrapped;

beforeEach(() => {
    wrapped = mount(
        <Root>
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

