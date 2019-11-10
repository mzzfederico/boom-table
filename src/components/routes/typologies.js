import React from "react";
import WeekTable from "../layouts/WeekTable";
import { usePhotoshoots } from "../../contexts/Photoshoots";
import FadingEntry from "../layouts/FadingEntry";

const Photoshoots = () => {
    const state = usePhotoshoots();
    return (
        <FadingEntry
            isVisible={!state.isLoading && Array.isArray(state.data)}
        >
            <WeekTable photoshoots={state.data} mode={"type"} />
        </FadingEntry>
    );
};

export default Photoshoots;