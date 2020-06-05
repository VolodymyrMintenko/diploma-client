import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useHistory, useLocation } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { authLogout } from "pages/auth/reducer/actions";
import { isLoggedIn } from "pages/auth/reducer/selectors";

import MobileNavigation from "./MobileNavigation";
import DesktopNavigation from "./DesktopNavigation";

import "./Navigation.scss";
import { hasSelectedCampaign } from "pages/campaigns/reducer/selectors";

function Navigation({
  isLoggedIn,
  authLogout,
  ignoreLocations,
  selectedCampaign,
  hasSelectedCampaign
}) {
  const location = useLocation();
  const history = useHistory();
  const matches = useMediaQuery("(max-width:599px)");

  if (ignoreLocations.includes(location.pathname)) {
    return null;
  }

  const navigationProps = {
    location,
    history,
    isLoggedIn,
    lastCampaignId: hasSelectedCampaign ? selectedCampaign.id : undefined,
    authLogout
  };
  return matches ? (
    <MobileNavigation {...navigationProps} />
  ) : (
    <DesktopNavigation {...navigationProps} />
  );
}

Navigation.defaultProps = {
  ignoreLocations: []
};

const mapStateToProps = ({ auth, campaigns }) => ({
  isLoggedIn: isLoggedIn(auth),
  selectedCampaign: campaigns.selectedCampaign,
  hasSelectedCampaign: hasSelectedCampaign(campaigns)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ authLogout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
