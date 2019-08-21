import React from "react";
import { mount } from "enzyme";
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