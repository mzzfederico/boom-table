/* eslint-disable no-undef */
import React from "react";
import Typologies from "./typologies";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
    const tree = renderer.create(
        <Typologies />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});