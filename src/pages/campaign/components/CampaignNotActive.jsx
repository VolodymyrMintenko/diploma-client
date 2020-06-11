import React from "react";
import { Button } from "@material-ui/core";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import { Link as RouterLink } from "react-router-dom";

function CampaignNotActive() {
  useDocumentTitle("👻404 Page Not Found");
  return (
    <div className="not-found-page">
      <h1>
        Disable.{" "}
        <span role="img" aria-label="Anxious Face With Sweat">
          😰
        </span>
      </h1>
      <Button variant="contained" color="primary" component={RouterLink} to="/">
        Home!{" "}
        <span role="img" aria-label="House With Garden">
          🏡
        </span>
      </Button>
    </div>
  );
}

export default CampaignNotActive;
