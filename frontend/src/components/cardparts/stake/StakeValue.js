import classes from "./css/StakeValue.module.css";

import { convertCurrency } from "../../../utility/number";

import React from "react";

const StakeValue = React.memo((props) => {
  return (
    <React.Fragment>
      <div className={classes.container}>
        <h3 className={classes.title}>{props.title}</h3>
        <span className={classes.value}>{convertCurrency(props.value)}</span>
      </div>
    </React.Fragment>
  );
});

export default StakeValue;
