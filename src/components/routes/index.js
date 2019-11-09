import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "./NotFound";

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path={"/"} /> {/* Main Page */}
            <Route component={NotFound} /> {/* Not found */}
        </Switch>
    </Router>
);

export default Routes;