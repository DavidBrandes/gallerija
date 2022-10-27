import StakeValue from "./StakeValue";

import React from "react";

function StakeValues(props) {
  return (
    <React.Fragment>
      {props.stake ? (
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
          <StakeValue
            title={"Required Stake"}
            value={props.stake.requiredStake}
          />
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
}

export default StakeValues;
