import React from "react";
import useDocumentTitle from "hooks/useDocumentTitle";
import { Button, Paper, Slide } from "@material-ui/core";
import { connect } from "react-redux";
import { useState } from "react";
import { hasCampaigns } from "../reducer/selectors";
import CampaignsTable from "./CampaignsTable";
import CreateCampaignForm from "./CampaignsTable/CreateCampaignForm";

const YourCampaignList = ({ campaigns, hasCampaigns }) => {
  useDocumentTitle("Lessons");
  const [isEditing, setEditing] = useState(false);
  const [isCreateButtonDisplayed, setCreateButtonDisplayed] = useState(true);

  const onClickAdd = () => {
    setEditing(true);
  };
  const onCancel = () => {
    setEditing(false);
  };

  return (
    <>
      <div className="campaigns__header">
        <h1>Lessons</h1>
        {hasCampaigns && (
          <div className="campaigns__header--actions">
            {isCreateButtonDisplayed && (
              <Button color="primary" variant="outlined" onClick={onClickAdd}>
                Create Room
              </Button>
            )}
            <Slide
              direction="left"
              in={isEditing}
              onEnter={() => setCreateButtonDisplayed(false)}
              onExited={() => setCreateButtonDisplayed(true)}
              mountOnEnter
              unmountOnExit
            >
              <Paper elevation={3} className="campaigns__header--actions-card">
                <CreateCampaignForm onCancel={onCancel} focusDelay={300} />
              </Paper>
            </Slide>
          </div>
        )}
      </div>
      <CampaignsTable />
    </>
  );
};

const mapStateToProps = ({ campaigns }) => ({
  campaigns: campaigns.campaigns,
  hasCampaigns: hasCampaigns(campaigns)
});

export default connect(mapStateToProps, null)(YourCampaignList);
