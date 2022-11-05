import React from "react";

import { convertNumber } from "../../../utility/number";

function WinChance(props) {
  let message;
  if (props.userStake && props.stake?.combinedStakes) {
    const precision =
      10 ** Number(process.env.REACT_APP_BIDDING_CHANCE_ROUND_PRECISION);
    const chance =
      Math.round(
        (props.userStake / props.stake.combinedStakes) * precision * 100
      ) / precision;

    if (props.stake.vestingStarted && !props.stake.vestingEnded)
      message = `Your winning chance will be ${convertNumber(chance)} %`;
    else if (props.stake.biddingStarted && !props.stake.biddingEnded)
      message = `Your winning chance is ${convertNumber(chance)} %`;
    else message = `Your winning chance was ${convertNumber(chance)} %`;
  }

  return (
    <React.Fragment>{message ? <div>{message}</div> : null}</React.Fragment>
  );
}

export default WinChance;
