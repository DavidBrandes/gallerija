import classes from "./css/StakeText.module.css";

import { convertNumber } from "../../../utility/number";

function StakeText(props) {
  const diff = props.stake.requiredStake - props.stake.combinedStakes;
  const text =
    diff <= 0 || props.stake.biddingStarted
      ? ""
      : convertNumber(diff) + " to start off the bidding";

  return (
    <div>
      {" "}
      {props.stake ? <div className={classes.container}>{text}</div> : null}
    </div>
  );
}

export default StakeText;
