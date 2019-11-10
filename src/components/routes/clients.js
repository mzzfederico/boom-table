import React from "react";
import WeekTable from "../layouts/WeekTable";
import { usePhotoshoots } from "../../contexts/Photoshoots";

const Clients = () => {
    const state = usePhotoshoots();

    if (state.isLoading) return null;
    if (!Array.isArray(state.data)) return null;
    
    return (
        <React.Fragment>
            <WeekTable photoshoots={state.data} mode={"client"} />
        </React.Fragment>
    );
};

export default Clients;