import classes from "./css/Time.module.css";

import date from "../../../utility/date";
import { useSelector } from "react-redux";

function Time(props) {
  const currentTime = useSelector((state) => state.time.time);

  //TODO: conditionally show on view
  //Dont show text when stake is an empty object

  let message;
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

  return <div className={classes.container}>{props.stake ? message : ""}</div>;
}

export default Time;
