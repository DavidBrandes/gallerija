import StakeValue from "./StakeValue";

import React from "react";

function StakeValues(props) {
  if (props.stake)
    return (
      <React.Fragment>
        {props.stake.vestingStarted ? (
          <StakeValue title={"Your Stake"} value={props.userStake} />
        ) : null}
        {props.stake.vestingStarted ? (
          <StakeValue
            title={"Combined Stakes"}
            value={props.stake.combinedStakes}
          />
        ) : null}
        {!props.stake.vestingEnded ? (
          <StakeValue
            title={"Required Stake"}
            value={props.stake.requiredStake}
          />
        ) : null}
      </React.Fragment>
    );
  else return null;
}

export default StakeValues;
