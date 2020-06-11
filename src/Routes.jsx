import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NotFound from "./pages/notFound";
import Campaigns from "./pages/campaigns";
import EnterUser from "./pages/campaigns/components/UserTable/view";
import Campaign from "./pages/campaign";
import User from "./pages/campaign/user";
import CampaignEditor from "./pages/campaignEditor";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Lectures from "./pages/campaign/components/Lectures";
import Profile from "./pages/campaign/user";
import Test from "./pages/campaign/components/Test";
import Blog from "./components/Blog";
import QuizHTML from "./pages/campaign/components/QuizHtml";
import QuizCSS from "./pages/campaign/components/QuizCss";
import QuizJS from "./pages/campaign/components/QuizJs";
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
      <Route path="/quizhtml" component={QuizHTML} />
      <Route path="/quizcss" component={QuizCSS} />
      <Route path="/quizjs" component={QuizJS} />
      <Route path="/test" component={Test} />
      <Route path="/users" component={EnterUser} />
      <Route path="/user:id" component={Profile} />
      <Route path="/blog" component={Blog} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
