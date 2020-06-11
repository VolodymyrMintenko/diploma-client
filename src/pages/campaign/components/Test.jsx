import React from "react";
import ActiveChip from "pages/campaigns/components/CampaignsTable/ActiveChip";
import { Link as RouterLink } from "react-router-dom";
import { Container, Paper, Link, Button } from "@material-ui/core";
import "./test.scss";
function Test() {
  return (
    <>
    <div className="test">
    <div className="testt">
      <h1 className="d-flex">
        TESTS
      </h1>
      <Link className="tests" type="button" component={RouterLink} to={`/quizhtml`} >HTML test</Link><br />
      <Link className="tests" type="button" component={RouterLink} to={`/quizcss`} >CSS test</Link><br />
      <Link className="tests" type="button" component={RouterLink} to={`/quizjs`} >JavaScript test</Link><br />
    </div>
    </div>
    </>
  );
}
export default Test;
