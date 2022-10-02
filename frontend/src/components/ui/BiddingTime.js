import React from "react";

import classes from "./css/BiddingTime.module.css";

class BiddingTime extends React.Component {
  render() {
    return (
      <div className={classes.container}>
        <span
          className={`${classes.text} ${
            this.props.centered ? classes.centered : ""
          }`}
        >
          Bidding period ends Saturday 20:00 pm
        </span>
      </div>
    );
  }
}

export default BiddingTime;
