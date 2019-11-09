import React from "react";
import style from "styled-jsx/style";
import Routes from "./routes";
import App from "./layouts/App";

function ApplicationRoot() {
    return (
        <App>
            <Routes />
        </App>
    );
}

export default ApplicationRoot;
