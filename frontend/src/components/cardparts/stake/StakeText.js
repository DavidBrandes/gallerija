import classes from "./css/StakeText.module.css";

import { convertCurrency } from "../../../utility/number";
import React from "react";

function StakeText(props) {
  const diff = props.stake?.requiredStake - props.stake?.combinedStakes;

  let text = "";
  if (props.stake?.vestingEnded) {
    if (!props.stake?.biddingStarted)
      text = "The required stake was not reached";
    else {
      if (props.stake?.biddingEnded) {
        text = `Painting collected ${convertCurrency(
          props.stake?.combinedStakes
        )} € in Stakes`;
      } else {
        text = `Current combined Stakes ${convertCurrency(
          props.stake?.combinedStakes
        )} €`;
      }
    }
  } else {
    if (props.stake?.vestingStarted) {
      if (diff > 0)
        text = convertCurrency(diff) + " € required to start off the bidding";
      else text = "The reuqired stake is reached";
    } else {
      text = "Bidding starts soon";
    }
  }
  return (
    <React.Fragment>
      {props.stake ? <div className={classes.container}>{text}</div> : null}
    </React.Fragment>
  );
}

export default StakeText;
