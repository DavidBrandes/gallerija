import date from "../../../utility/date";
import { useSelector } from "react-redux";
import React from "react";

function Time(props) {
  const currentTime = useSelector((state) => {
    if (props.inView) return state.time.time;
    else return 0;
  });

  let message = "";
  if (props.stake) {
    if (!props.stake.vestingStarted)
      message =
        "Initial bidding phase " +
        date.convert(currentTime, props.stake.vestingTimeStart, "before");
    else if (!props.stake.vestingEnded)
      message =
        "Initial bidding phase " +
        date.convert(currentTime, props.stake.vestingTimeEnd, "in");
    else if (props.stake.vestingEnded && !props.stake.biddingStarted)
      message =
        "Initial bidding phase " +
        date.convert(currentTime, props.stake.vestingTimeEnd, "after");
    else if (!props.stake.biddingEnded)
      message =
        "Bidding phase " +
        date.convert(currentTime, props.stake.biddingTimeEnd, "in");
    else if (props.stake.biddingEnded)
      message =
        "Bidding phase " +
        date.convert(currentTime, props.stake.biddingTimeEnd, "after");
  }

  return (
    <React.Fragment>
      {props.stake ? (
        <div className={props.containerClass}>{message}</div>
      ) : (
        <div className={props.containerClass}>&nbsp;</div>
      )}
    </React.Fragment>
  );
}

export default Time;
