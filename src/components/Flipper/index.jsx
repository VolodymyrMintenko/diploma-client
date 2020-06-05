import React from "react";
import classnames from "classnames";
import "./Flipper.scss";

const Flipable = ({
  flipped,
  flippedContent,
  children,
  speed,
  containerProps = {},
  itemProps = {},
  frontProps = {},
  backProps = {}
}) => {
  return (
    <div
      {...containerProps}
      className={classnames("flipper__container", containerProps.className)}
    >
      <div
        {...itemProps}
        className={classnames("flipper__item", itemProps.className, {
          flipped
        })}
        style={speed ? { ...itemProps.style, transition: speed } : undefined}
      >
        <div
          {...frontProps}
          className={classnames("flipper__item--front", frontProps.className)}
        >
          {children}
        </div>
        <div
          {...backProps}
          className={classnames("flipper__item--back", backProps.className)}
        >
          {flippedContent}
        </div>
      </div>
    </div>
  );
};
export default Flipable;
