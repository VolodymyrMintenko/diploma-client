import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import { getCampaigns } from "../../reducer/actions";
import { isLoggedIn } from "pages/auth/reducer/selectors";
import CreateCampaignCTA from "./CreateCampaignCTA";
import EmptyCampaigns from "./EmptyCampaigns";
import Spinner from "components/Spinner";
import DataTable from "components/DataTable";
import { useHistory } from "react-router";
import ActiveChip from "./ActiveChip";
import { hasCampaigns } from "../../reducer/selectors";

const CampaignsTable = ({
  isLoading,
  campaigns,
  getCampaigns,
  isLoggedIn,
  hasCampaigns,
  user
}) => {
  const history = useHistory();
  useEffect(() => {
    getCampaigns();
  }, [getCampaigns]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!hasCampaigns) {
    return isLoggedIn ? <CreateCampaignCTA /> : <EmptyCampaigns />;
  }
  const onCampaignClick = id => () => {
    console.log(user);
    if(user && user.campaigns && user.campaigns.includes(id)){
      history.push(`/campaign/${id}`);
    }
    else{
      history.push(`/lectures/${id}`);
    }
    
  };

  const rows = campaigns.map(({ id, name, active, minutesPlayed }) => ({
    name,
    minutesPlayed:
      minutesPlayed > 0
        ? moment.duration(minutesPlayed, "minutes").humanize()
        : "",
    active: (
      <ActiveChip
        active={active}
        color={active ? "primary" : "secondary"}
        variant="outlined"
      />
    ),
    props: {
      hover: true,
      onClick: onCampaignClick(id)
    }
  }));

  const headerData = [
    {
      key: "name",
      label: "Room name",
      cellProps: { component: "th" }
    },
    {
      key: "minutesPlayed",
      label: "",
      cellProps: { align: "right" }
    },
    {
      key: "active",
      label: "",
      cellProps: { align: "right" }
    }
  ];
  return <DataTable rows={rows} headerData={headerData} keyPropName="name" />;
};

const mapStateToProps = ({ campaigns, auth }) => ({
  isLoading: campaigns.isLoading,
  campaigns: campaigns.campaigns,
  isLoggedIn: isLoggedIn(auth),
  hasCampaigns: hasCampaigns(campaigns),
  user: auth.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCampaigns
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CampaignsTable);
