import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NotFound from "./NotFound";
import Clients from "./clients";
import Photoshoots from "./photoshoots";
import Typologies from "./typologies";
import Navbar from "../stateful/Navbar";

const Routes = () =>  (
    <Router>
        <Navbar />
        <Switch>
            <Route exact path={"/typologies"} component={Typologies} /> {/* Showing the status of typologies */}
            <Route exact path={"/photoshoots"} component={Photoshoots} /> {/* Showing the status of photoshoots */}
            <Route exact path={"/clients"} component={Clients} /> {/* Showing the status of clients */}
            <Route exact path={"/"} render={() => (<Redirect to={"/clients"} />)} />
            <Route component={NotFound} /> {/* Not found */}
        </Switch>
    </Router>
);

export default Routes;