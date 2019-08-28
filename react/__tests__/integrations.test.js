import React from "react";
import { mount } from "enzyme";
import Root from "../Root";
import App from "../App";
import moxios from "moxios";

let wrapped;

beforeEach(() => {

    wrapped = mount(
        <Root>
            <App />
        </Root>
    );

    moxios.install()
    moxios.stubRequest("http://localhost:3000/api/upload", {
        status: 200,
        response: { msg: "Encrypted text" }
    })
});

afterEach(() => {
    moxios.uninstall()
})

it("can enter text and get it encrypted", (done) => {
    // attempt to render the entire application

    // find the try app button and click it
    wrapped.find("#home_btn").simulate("click")

    // expect to find the form
    expect(wrapped.find(".try_app_form").length).toEqual(1)

    // enter values in the form
    wrapped.find("input").simulate("change", {
        target: { value: "new comment" }
    });
    wrapped.find("select").simulate("change", {
        target: { value: "double-transposition" }
    });

    // submit the form
    wrapped.find("form").simulate("submit");

    moxios.wait(() => {
        wrapped.update()

        expect(wrapped.find(".try_result_box").render().text()).toContain("Encrypted text")

        done()
        wrapped.unmount()
    })
});
