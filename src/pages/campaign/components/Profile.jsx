import React from "react";
import ActiveChip from "pages/campaigns/components/CampaignsTable/ActiveChip";
import { Link as RouterLink } from "react-router-dom";
import { Container, Paper, Link, Button } from "@material-ui/core";
import {useDispatch} from "react-redux";
import { useHistory } from "react-router";
import {deleteCampaign} from "pages/campaigns/reducer/actions"
function AdminCampaign({ campaign}) {
const dispatch = useDispatch();
const history = useHistory();
  return (
    <>
      <h1 className="d-flex">
        {campaign.name}
        <div className="campaigns__header--actions">
        </div>
      </h1>
      <Link type="button" component={RouterLink} to={`/lectures/${campaign.id}`} >Start lesson</Link><br />
    <Button onClick = {()=>{dispatch(deleteCampaign(campaign.id))
    history.push("/campaigns")
    }} >Delete room</Button>
    </>
  );
}
export default AdminCampaign;
