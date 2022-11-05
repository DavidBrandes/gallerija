import StakeValue from "./StakeValue";

import React from "react";

function StakeValues(props) {
  return (
    <div className={props.stakesContainerClass}>
      {props.stake?.vestingStarted ? (
        <StakeValue
          title={"Your Stake"}
          value={props?.userStake}
          align={props.align}
          containerClass={props.containerClass}
          valueClass={props.valueClass}
          titleClass={props.titleClass}
        />
      ) : null}
      {props.stake?.vestingStarted ? (
        <StakeValue
          align={props.align}
          title={"Combined Stakes"}
          value={props.stake?.combinedStakes}
          containerClass={props.containerClass}
          valueClass={props.valueClass}
          titleClass={props.titleClass}
        />
      ) : null}
      <StakeValue
        align={props.align}
        title={"Required Stake"}
        value={props.stake?.requiredStake}
        containerClass={props.containerClass}
        valueClass={props.valueClass}
        titleClass={props.titleClass}
      />
    </div>
  );
}

export default StakeValues;
