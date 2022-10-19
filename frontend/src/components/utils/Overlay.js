import classes from "./css/Overlay.module.css";

import React, { useState, useImperativeHandle } from "react";

const Overlay = React.forwardRef((props, ref) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const showClick = (val) => {
    if (val === showOverlay) return;

    !val
      ? (document.body.style.overflow = "unset")
      : (document.body.style.overflow = "hidden");
    setShowOverlay(val);
  };

  useImperativeHandle(ref, () => ({
    showClick: showClick,
    showOverlay: showOverlay,
  }));

  return (
    <React.Fragment>
      {showOverlay
        ? React.Children.map(props.children, (child) => (
            <div
              className={classes.overlay}
              style={{ "--z-value": `${props.zValue ?? 5}` }}
              onClick={() => showClick(false)}
            >
              <div
                className={classes.container}
                onClick={(event) => event.stopPropagation()}
              >
                {React.cloneElement(child, {
                  showClick: showClick,
                })}
              </div>
            </div>
          ))
        : null}
    </React.Fragment>
  );
});

export default Overlay;
