import classes from "./css/Image.module.css";

import { useState } from "react";

function Image(props) {
  const [show, setShow] = useState(false);
  const showClick = () => {
    show
      ? (document.body.style.overflow = "unset")
      : (document.body.style.overflow = "hidden");
    setShow(!show);
  };

  //TODO: check that the downladable (by right click) image is the high resultion one

  return (
    <div>
      <img
        src={props.srcLow}
        alt={props.title}
        className={classes.imageSmall}
        onClick={() => {
          showClick();
        }}
      />
      {show ? (
        <div
          className={classes.overlay}
          onClick={() => {
            showClick();
          }}
        >
          <img
            src={props.srcHigh}
            alt={props.title}
            className={classes.imageBig}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Image;
