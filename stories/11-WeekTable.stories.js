import React from "react";
import WeekTable from "../src/components/layouts/WeekTable";
import { MockPhotoshoot } from "../src/types/photoshoot";

export default {
    title: "Components/WeekTable",
};

let mock100shoots = new Array();
mock100shoots.length = 100;

export const WeekTable_withoutAnything = () => {
    return <WeekTable />;
};

export const WeekTable_withMock = () => {
    let mockData = [];
    for (let index = 100; index > 0; index--) {
        mockData[index] = new MockPhotoshoot(index);
    }
    return <WeekTable photoshoots={mockData} />;
};

export const WeekTable_with_Photoshoots_Display = () => {
    let mockData = [];
    for (let index = 100; index > 0; index--) {
        mockData[index] = new MockPhotoshoot(index);
    }
    return <WeekTable photoshoots={mockData} mode={"photoshoot"} />;
};

export const WeekTable_with_Clients_Display = () => {
    let mockData = [];
    for (let index = 100; index > 0; index--) {
        mockData[index] = new MockPhotoshoot(index);
    }
    return <WeekTable photoshoots={mockData} mode={"client"} />;
};

export const WeekTable_with_Events_Display = () => {
    let mockData = [];
    for (let index = 100; index > 0; index--) {
        mockData[index] = new MockPhotoshoot(index);
    }
    return <WeekTable photoshoots={mockData} mode={"type"} />;
};