/* eslint-disable no-undef */
import React from "react";
import Home from "./index";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
    const tree = renderer.create(
        <MemoryRouter initialEntries={[ "/" ]}>
            <Home />
        </MemoryRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});