import React from "react";

import { convertNumber, convertCurrency } from "../../../../utility/number";

function ChanceText(props) {
  const diff = props.stake?.requiredStake - props.stake?.combinedStakes;
  let message;

  if (props.stake) {
    if (props.userStake) {
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
      else if (props.stake.biddingEnded)
        message = `Your winning chance was ${convertNumber(chance)} %`;
      else message = `The required stake was not reached`;
    } else {
      if (props.stake.vestingEnded) {
        if (!props.stake.biddingStarted)
          message = "The required stake was not reached";
        else {
          if (props.stake.biddingEnded) {
            message = `Painting collected ${convertCurrency(
              props.stake.combinedStakes
            )} in Stakes`;
          } else {
            message = `Current combined Stakes ${convertCurrency(
              props.stake.combinedStakes
            )}`;
          }
        }
      } else {
        if (props.stake.vestingStarted) {
          if (diff > 0)
            message =
              convertCurrency(diff) + " required to start off the bidding";
          else message = "The reuqired stake is reached";
        } else {
          message = "Bidding starts soon";
        }
      }
    }
  }

  return (
    <React.Fragment>
      {message ? (
        <div className={props.containerClass}>{message}</div>
      ) : (
        <div className={props.containerClass}>&nbsp;</div>
      )}
    </React.Fragment>
  );
}

export default ChanceText;
