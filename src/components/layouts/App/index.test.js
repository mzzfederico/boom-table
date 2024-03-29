/* eslint-disable no-undef */
import React from "react";
import App from "./index";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
});

it("contains children as they are", () => {
    const randomNumber = Math.floor(Math.random * 1000000000);
    const tree = renderer.create(<App>{randomNumber}</App>).toJSON();
    expect(JSON.stringify(tree).indexOf(randomNumber) > -1);
});