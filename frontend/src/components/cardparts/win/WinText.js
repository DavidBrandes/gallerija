import React from "react";
import { useSelector } from "react-redux";

import classes from "./css/WinText.module.css";

function WinText(props) {
  const won = useSelector((state) => state.user.won[props.item.id]);

  return (
    <React.Fragment>
      {won === undefined ? null : won ? (
        <div className={classes.container}>You won</div>
      ) : (
        <div className={classes.container}>You lost</div>
      )}
    </React.Fragment>
  );
}

export default WinText;
