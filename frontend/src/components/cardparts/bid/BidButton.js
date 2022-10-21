import classes from "./css/BidButton.module.css";

import React, { useRef, useState } from "react";

import Overlay from "../../utils/Overlay";
import BidCard from "./BidCard";

import BidContext from "./BidContext";

//TODO: meome necessary?
const BidButton = React.memo((props) => {
  const ref = useRef(null);
  const [message, setMessage] = useState("");
  const [inAction, setInAction] = useState(false);
  const [value, setValue] = useState(props.userStake);

  return (
    <div>
      <BidContext.Provider
        value={{ message, setMessage, inAction, setInAction, value, setValue }}
      >
        <Overlay ref={ref}>
          <BidCard
            stake={props.stake}
            item={props.item}
            userStake={props.userStake}
          ></BidCard>
        </Overlay>
      </BidContext.Provider>
      {props.stake && //TODO: dont show wehn vesting ended but bidding did not start
      props.stake.vestingStarted &&
      !props.stake.biddingEnded ? (
        <div>
          {props.userStake <= 0 ? (
            <div className={classes.container}>
              <button
                className={classes.button}
                onClick={() => {
                  ref.current.showClick(true);
                }}
              >
                Place a Stake
              </button>
            </div>
          ) : props.stake.biddingStarted ? (
            <div className={classes.container}>
              <button
                className={classes.button}
                onClick={() => {
                  ref.current.showClick(true);
                }}
              >
                Raise Stake
              </button>
            </div>
          ) : (
            <div className={classes.container}>
              <button
                className={classes.button}
                onClick={() => {
                  ref.current.showClick(true);
                }}
              >
                Update Stake
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
});

export default BidButton;
