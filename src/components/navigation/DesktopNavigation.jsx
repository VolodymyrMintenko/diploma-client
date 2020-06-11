import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import ProfileIcon from "./ProfileIcon";

function DesktopNavigation({
  location,
  isLoggedIn,
  lastCampaignId,
  authLogout
}) {
  const valueMap = {
    campaigns: /^\/campaigns/gi,
    "current-campaign": /^\/campaign\/[a-z0-9]+$/gi
  };
  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        {lastCampaignId ? (
          <Button
            className="navigation__desktop--menu-item"
            variant="outlined"
            color={
              valueMap["current-campaign"].test(location.pathname)
                ? "primary"
                : "inherit"
            }
            component={RouterLink}
            to={`/campaign/${lastCampaignId}`}
          >
            Active lesson
          </Button>
        ) : null}
        <Button
          className="navigation__desktop--menu-item"
          variant="outlined"
          color={
            valueMap.campaigns.test(location.pathname) ? "primary" : "inherit"
          }
          component={RouterLink}
          to={`/campaigns`}
        >
          Lessons
        </Button>
        <Button
          className="navigation__desktop--menu-item"
          variant="outlined"
          color={
            valueMap.campaigns.test(location.pathname) ? "primary" : "inherit"
          }
          component={RouterLink}
          to={`/users`}
        >
          Users
        </Button>
        <Button
          className="navigation__desktop--menu-item"
          variant="outlined"
          color={
            valueMap.campaigns.test(location.pathname) ? "primary" : "inherit"
          }
          component={RouterLink}
          to={`/test`}
        >
          Test
        </Button>
        <Button
          className="navigation__desktop--menu-item"
          variant="outlined"
          color={
            valueMap.campaigns.test(location.pathname) ? "primary" : "inherit"
          }
          component={RouterLink}
          to={`/blog`}
        >
          Forum
        </Button>
        <ProfileIcon isLoggedIn={isLoggedIn} authLogout={authLogout} />
      </Toolbar>
    </AppBar>
  );
}
export default DesktopNavigation;
