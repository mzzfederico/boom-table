/* eslint-disable no-undef */
import React from "react";
import NotFound from "./index";
import {MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
    const tree = renderer.create(
        <MemoryRouter initialEntries={[ "/botched_route" ]}>
            <NotFound />
        </MemoryRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it("displays the bad route", () => {
    const tree = renderer.create(
        <MemoryRouter initialEntries={[ "/botched_route" ]}>
            <NotFound />
        </MemoryRouter>
    ).toJSON();
    expect(tree.indexOf("/botched_route") > -1);
});
