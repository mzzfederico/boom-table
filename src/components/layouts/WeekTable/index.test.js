/* eslint-disable no-undef */
import React from "react";
import { WeekTable, PhotoshootCell, HeaderCell, PlainCell } from "./index";
import renderer from "react-test-renderer";
import { Photoshoot, PhotoshootDetails } from "../../../types/photoshoot";

it("WeekTable renders without crashing", () => {
    const tree = renderer.create(<WeekTable />).toJSON();
    expect(tree).toMatchSnapshot();
});

it("PhotoshootCell renders without crashing", () => {
    const tree = renderer.create(
        <PhotoshootCell day={"MONDAY"} 
            photoshoot={new Photoshoot({
                id: 100,
                day_of_the_week: "MONDAY",
                type: "Food",
                client_id: "90",
                photoshoot_id: 100,
                details: new PhotoshootDetails({ 
                    id: 100,
                    title: "Test",
                    number_of_photos: 90,
                    country: "Italy",
                    package_size: "XL"
                })
            })}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it("HeaderCell renders without crashing", () => {
    const tree = renderer.create(<HeaderCell label={"Label test"} column={3} />).toJSON();
    expect(tree).toMatchSnapshot();
});

it("PlainCell renders without crashing", () => {
    const tree = renderer.create(<PlainCell day={"MONDAY"} variant={"total-top"} column={3} total={1000} />).toJSON();
    expect(tree).toMatchSnapshot();
});