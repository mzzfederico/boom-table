import React from "react";
import NotFound from "../src/components/routes/NotFound";
import {MemoryRouter} from "react-router-dom";

export default {
    title: "Routes/NotFound",
};

export const page_not_found = () => (
    <MemoryRouter initialEntries={[ "/error_path" ]}>
        <NotFound />
    </MemoryRouter>
);
