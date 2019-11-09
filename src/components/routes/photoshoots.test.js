/* eslint-disable no-undef */
import React from "react";
import Photoshoots from "./photoshoots";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
    const tree = renderer.create(
        <Photoshoots />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});