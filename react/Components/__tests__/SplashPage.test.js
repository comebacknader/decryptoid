import React from "react";
import { mount } from "enzyme";
import SplashPage from "../SplashPage";

let wrapped;

beforeEach(() => {
    wrapped = mount(<SplashPage />)
});

afterEach(() => {
    wrapped.unmount();
});

it("it has a Try it Now button", () => {
    expect(wrapped.find("button").length).toEqual(1);
});