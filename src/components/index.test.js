/* eslint-disable no-undef */
import React from "react";
import ApplicationRoot from "./index";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
    const tree = renderer.create(<ApplicationRoot />).toJSON();
    expect(tree).toMatchSnapshot();
});
