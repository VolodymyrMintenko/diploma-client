import React, { useState } from "react";
import { Chip, CircularProgress } from "@material-ui/core";

function ActiveChip({ active, onToggle, label, ...props }) {
  const [isLoading, setLoading] = useState(false);
  const onClick = async () => {
    setLoading(true);
    try {
      await onToggle();
    } catch {}
    setLoading(true);
  };
  return (
    <Chip
      label={
        typeof label === "undefined"
          ? active
            ? ""
            : ""
          : label
      }
      icon={
        isLoading ? (
          <CircularProgress size={24} thickness={2} color={props.color} />
        ) : (
          undefined
        )
      }
      onClick={typeof onToggle === "function" ? onClick : undefined}
      {...props}
    />
  );
}
export default ActiveChip;
