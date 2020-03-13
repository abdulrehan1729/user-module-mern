import React from "react";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/sign-up";

const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/register/:token" component={Signup} />
    </Switch>
  </div>
);

export default Routes;
