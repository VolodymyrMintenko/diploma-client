import React from "react";
import useDocumentTitle from "hooks/useDocumentTitle";
import CampaignsTable from "./CampaignsTable";

const EnterCampaign = () => {
  useDocumentTitle("Room");
  // TODO: use web sockets to determine when new campaign is activated and add it to the top of the capmaigns list
  return (
    <>
      <h1>Lessons</h1>
      <CampaignsTable />
    </>
  );
};

export default EnterCampaign;
