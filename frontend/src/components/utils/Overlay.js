import classes from "./css/Overlay.module.css";

import React, { useState, useImperativeHandle } from "react";

import { setOpen } from "../../store/modules/overlaySlice";
import { useDispatch } from "react-redux";

const Overlay = React.forwardRef((props, ref) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const dispatch = useDispatch();

  const showClick = (val) => {
    if (val === showOverlay) return;

    !val
      ? (document.body.style.overflow = "unset")
      : (document.body.style.overflow = "hidden");

    setShowOverlay(val);
    dispatch(setOpen({ open: val }));
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
              style={{ "--z-value": `${props.zValue ?? 3}` }}
              onClick={() => showClick(false)}
            >
              <div
                className={props.overlayClass}
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
