/* eslint-disable no-undef */
import React from "react";
import Navbar from "./index";
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
    const tree = renderer.create(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});