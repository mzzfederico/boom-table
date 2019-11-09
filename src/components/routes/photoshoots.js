import React from "react";
import { withRouter } from "react-router-dom";
import WeekTable from "../layouts/WeekTable";
import { usePhotoshoots } from "../../contexts/Photoshoots";

const Photoshoots = () => {
    const state = usePhotoshoots();

    if (state.isLoading) return null;
    if (!Array.isArray(state.data)) return null;

    return (
        <React.Fragment>
            <WeekTable photoshoots={state.data} mode={"photoshoot"} />
        </React.Fragment>
    );
};

export default withRouter(Photoshoots);