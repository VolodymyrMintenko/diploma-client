import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NotFound from "./pages/notFound";
import Campaigns from "./pages/campaigns";
import Campaign from "./pages/campaign";
import CampaignEditor from "./pages/campaignEditor";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Lectures from "./pages/campaign/components/Lectures";

const Routes = () => {
  return (
    <Switch>
      <Redirect from="/" exact to="/campaigns" />
      <Route path="/campaigns" exact component={Campaigns} />
      <Route path="/campaign/:id" component={Campaign} />
      <Route path="/editor" component={CampaignEditor} />
      <Route path="/signin" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/lectures/:id" exact component={Lectures} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
