import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import classNames from "classnames";

export default function Spinner({ verticallyCentered }) {
  return (
    <div
      className={classNames("spinner__centered", {
        "spinner__centered--vertically": verticallyCentered
      })}
    >
      <CircularProgress />
    </div>
  );
}
