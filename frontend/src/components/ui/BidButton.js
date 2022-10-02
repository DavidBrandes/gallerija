import React from "react";

import classes from "./css/BidButton.module.css";

class BidButton extends React.Component {
  render() {
    return (
      <div>
        {this.props.vestingStarted && !this.props.biddingEnded ? (
          <div>
            {this.props.userStake <= 0 ? (
              <div className={classes.container}>
                <button className={classes.button}>Place a Stake</button>
              </div>
            ) : this.props.biddingStarted ? (
              <div className={classes.container}>
                <button className={classes.button}>Raise Stake</button>
              </div>
            ) : (
              <div className={classes.container}>
                <button className={classes.button}>Raise Stake</button>
                <span>|</span>
                <button className={classes.button}>Revoke Stake</button>{" "}
              </div>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

export default BidButton;
