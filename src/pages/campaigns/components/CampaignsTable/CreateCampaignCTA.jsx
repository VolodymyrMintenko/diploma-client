import React, { useState } from "react";
import { Card, CardActionArea } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CreateCampaignForm from "./CreateCampaignForm";
import Flipable from "components/Flipper";

const CreateCampaignCTA = () => {
  const [isEditing, setEditing] = useState(false);

  const onClickAdd = () => {
    setEditing(true);
  };
  const onCancel = () => {
    setEditing(false);
  };

  return (
    <div className="campaigns__empty-list--container">
      <Flipable
        flipped={isEditing}
        flippedContent={
          <Card className="campaigns__empty-list--card campaigns__empty-list--action-area">
            <CreateCampaignForm onCancel={onCancel} focusDelay={700} />
          </Card>
        }
        containerProps={{ className: "campaigns__empty-list--card" }}
        itemProps={{ className: "campaigns__empty-list--card" }}
        frontProps={{ className: "campaigns__empty-list--card" }}
        backProps={{ className: "campaigns__empty-list--card" }}
      >
        <Card className="campaigns__empty-list--card">
          <CardActionArea
            className="campaigns__empty-list--action-area"
            onClick={onClickAdd}
          >
            <h4>Create new Room.</h4>
            <h2>Start learning!</h2>
            <AddIcon />
          </CardActionArea>
        </Card>
      </Flipable>
    </div>
  );
};
export default CreateCampaignCTA;
