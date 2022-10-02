import React from "react";

import classes from "./css/StakeOverview.module.css";

class StakeOverview extends React.Component {
  format = (number) => {
    return number.toFixed(2);
  };

  remainingStake = () => {
    const remainingStake = this.props.requiredStake - this.props.combinedStakes;
    return remainingStake > 0 ? remainingStake : 0;
  };

  render() {
    return (
      <div
        className={
          this.props.centered ? classes.containerCentered : classes.container
        }
      >
        <div
          className={
            this.props.centered ? classes.numbersCentered : classes.numbers
          }
        >
          {this.props.vestingStarted ? (
            <div
              className={
                this.props.centered ? classes.sectionCentered : classes.section
              }
            >
              <h3 className={classes.sectionTitle}>Your Stake</h3>
              <span
                className={
                  this.props.centered
                    ? `${classes.sectionStateCentered} ${classes.number}`
                    : `${classes.sectionState} ${classes.number}`
                }
              >
                {`${this.format(this.props.userStake)} €`}
              </span>
            </div>
          ) : null}
          {this.props.vestingStarted ? (
            <div
              className={
                this.props.centered ? classes.sectionCentered : classes.section
              }
            >
              <h3 className={classes.sectionTitle}>Combined Stake</h3>
              <span
                className={
                  this.props.centered
                    ? `${classes.sectionStateCentered} ${classes.number}`
                    : `${classes.sectionState} ${classes.number}`
                }
              >
                {`${this.format(this.props.combinedStakes)} €`}
              </span>
            </div>
          ) : null}
          <div
            className={
              this.props.centered ? classes.sectionCentered : classes.section
            }
          >
            <h3 className={classes.sectionTitle}>Required Stake</h3>
            <span
              className={
                this.props.centered
                  ? `${classes.sectionStateCentered} ${classes.number}`
                  : `${classes.sectionState} ${classes.number}`
              }
            >
              {`${this.format(this.props.requiredStake)} €`}
            </span>
          </div>
        </div>
        {this.props.vestingStarted && !this.props.vestingEnded ? (
          <div
            className={
              this.props.centered ? classes.textCentered : classes.text
            }
          >
            <span>
              <span className={classes.number}>
                {this.format(this.remainingStake())}
              </span>
              € needed to start off the bidding
            </span>
          </div>
        ) : null}
      </div>
    );
  }
}

export default StakeOverview;
