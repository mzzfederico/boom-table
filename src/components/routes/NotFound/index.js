import React from "react";
import {withRouter} from "react-router-dom";

const NotFound = ({
    location
}) => (
    <React.Fragment>
        <h1>Not found</h1>
        <h2>Nothing found for page {location.pathname}.</h2>
    </React.Fragment>
);

export default withRouter(NotFound);