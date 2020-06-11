import React from "react";
import { Button } from "@material-ui/core";
import "./index.scss";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { Link as RouterLink } from "react-router-dom";

function NotFound() {
  useDocumentTitle("👻 404");
  return (
    <div className="not-found-page">
      <h1>
        Такой страницы мы не нашли.{" "}
        <span role="img" aria-label="Anxious Face With Sweat">
          😰
        </span>
      </h1>
      <Button variant="contained" color="primary" component={RouterLink} to="/">
        Домой!{" "}
        <span role="img" aria-label="House With Garden">
          🏡
        </span>
      </Button>
    </div>
  );
}

export default NotFound;
