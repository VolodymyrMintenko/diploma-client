import React from "react";
import { connect } from "react-redux";

import { isLoggedIn } from "pages/auth/reducer/selectors";
import CampaignList from "./components/YourCampaignList";
import EnterCampaign from "./components/EnterCampaign";

import "./index.scss";

function Campaigns({ isLoggedIn }) {
  return <section>{isLoggedIn ? <CampaignList /> : <EnterCampaign />}</section>;
}

const mapStateToProps = ({ auth }) => ({
  isLoggedIn: isLoggedIn(auth)
});

export default connect(mapStateToProps, null)(Campaigns);
