import classes from "./css/Overlay.module.css";

import React, { useState, useImperativeHandle } from "react";

const Overlay = React.forwardRef((props, ref) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const showClick = (val) => {
    !val
      ? (document.body.style.overflow = "unset")
      : (document.body.style.overflow = "hidden");
    setShowOverlay(val);
  };

  useImperativeHandle(ref, () => ({
    showClick: showClick,
  }));

  return (
    <div>
      {showOverlay
        ? React.Children.map(props.children, (child) => (
            <div className={classes.overlay} onClick={() => showClick(false)}>
              <div
                className={classes.container}
                onClick={(event) => event.stopPropagation()}
              >
                {React.cloneElement(child, { showClick: showClick })}
              </div>
            </div>
          ))
        : null}
    </div>
  );
});

export default Overlay;
