import React from "react";
import { useSelector } from "react-redux";
import BidButton from "../../bid/BidButton";

function WinLooseBidButton(props) {
  const won = useSelector((state) => state.user.won[props.item.id]);

  let message = "";
  let canBid = false;

  if (props.stake) {
    if (
      (props.stake.vestingStarted && !props.stake.vestingEnded) ||
      (props.stake.biddingStarted && !props.stake.biddingEnded)
    ) {
      canBid = true;

      if (props.userStake <= 0) message = "Place a Stake";
      else if (props.stake.biddingStarted) message = "Raise Stake";
      else message = "Update Stake";
    } else if (!props.stake.vestingStarted)
      message = "Bidding phase starts soon";
    else if (props.stake.vestingEnded || props.stake.biddingEnded) {
      if (won === undefined) message = "Bidding period ended";
      else {
        if (won) message = "You won";
        else message = "You lost";
      }
    } else {
      message = " ";
    }
  }

  return (
    <React.Fragment>
      {message ? (
        <BidButton
          containerClass={
            canBid ? props.buttonContainerClass : props.textContainerClass
          }
          item={props.item}
          stake={props.stake}
          userStake={props.userStake}
        >
          {message}
        </BidButton>
      ) : (
        <div className={props.textContainerClass}>&nbsp;</div>
      )}
    </React.Fragment>
  );
}

export default WinLooseBidButton;
