/* eslint-disable no-undef */
import React from "react";
import App from "./index";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
});
