import React from "react";
import Routes from "./routes";
import App from "./layouts/App";
import { useFetching } from "../hooks/useFetching";
import { getPhotoshoots } from "../api";
import { PhotoshootsProvider } from "../contexts/Photoshoots";

function ApplicationRoot() {
    const state = useFetching({ asyncFn: getPhotoshoots });
    return (
        <App>
            <PhotoshootsProvider value={state}>
                <Routes />
            </PhotoshootsProvider>
        </App>
    );
}

export default ApplicationRoot;
