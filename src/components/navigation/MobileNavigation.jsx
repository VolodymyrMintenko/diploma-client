import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";

import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import FilterHdrIcon from "@material-ui/icons/FilterHdr";

const getActiveNavigationTab = pathname => {
  const defaultValue = "campaigns";
  const valueMap = {
    campaigns: /^\/campaigns/gi,
    "current-campaign": /^\/campaign\/[a-z0-9]+$/gi
  };
  const match = Object.keys(valueMap).filter(key =>
    valueMap[key].test(pathname)
  );
  return match[0] || defaultValue;
};

const getNavigationTabLink = (tabValue, lastCampaignId) => {
  const defaultValue = "/campaigns";
  const valueMap = {
    campaigns: "/campaigns",
    "current-campaign": `/campaign/${lastCampaignId}`
  };
  return valueMap[tabValue] || defaultValue;
};

function MobileNavigation({ location, history, lastCampaignId }) {
  const value = getActiveNavigationTab(location.pathname);

  const handleChange = (event, newValue) => {
    history.push(getNavigationTabLink(newValue, lastCampaignId));
  };
  return (
    <BottomNavigation value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Room"
        value="campaigns"
        icon={<PhotoLibraryIcon />}
      />
      {lastCampaignId ? (
        <BottomNavigationAction
          label="Room"
          value="current-campaign"
          icon={<FilterHdrIcon />}
          disabled={!lastCampaignId}
        />
      ) : null}
      />
    </BottomNavigation>
  );
}
export default MobileNavigation;
