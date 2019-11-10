/* eslint-disable no-undef */
import React from "react";
import ApplicationRoot from "./index";
import renderer from "react-test-renderer";

jest.mock("ky");

it("renders without crashing", () => {
    const tree = renderer.create(<ApplicationRoot />).toJSON();
    expect(tree).toMatchSnapshot();
});
