import React from "react";
import Card from "@material-ui/core/Card";

const EmptyCampaigns = () => {
  return (
    <div className="campaigns__empty-list--container">
      <Card className="campaigns__empty-list--card campaigns__empty-list--action-area">
        <h4>There are no lessons yet.</h4>
        <h2>Wait a bit. ⏱</h2>
      </Card>
    </div>
  );
};
export default EmptyCampaigns;
