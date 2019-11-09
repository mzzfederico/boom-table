/* eslint-disable no-undef */
import React from "react";
import Clients from "./index";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
    const tree = renderer.create(
        <Clients />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});