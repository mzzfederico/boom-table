import React from "react";
import WeekTable from "../layouts/WeekTable";
import { usePhotoshoots } from "../../contexts/Photoshoots";
import FadingEntry from "../layouts/FadingEntry";

const Clients = () => {
    const state = usePhotoshoots();    
    return (
        <FadingEntry 
            isVisible={!state.isLoading && Array.isArray(state.data)}
        >
            <WeekTable photoshoots={state.data} mode={"client"} />
        </FadingEntry>
    );
};

export default Clients;