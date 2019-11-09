import React from "react";
import Home from "../src/components/routes/Home";
import { MemoryRouter } from "react-router-dom";

export default {
    title: "Routes/Home",
};

export const Homepage = () => (
    <MemoryRouter initialIndex={0} initialEntries={[ "/" ]}>
        <Home />
    </MemoryRouter>
);
