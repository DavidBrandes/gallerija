import classes from "./css/BidButton.module.css";

import React, { useRef, useState } from "react";

import Overlay from "../../utils/Overlay";
import BidCard from "./BidCard";

import BidContext from "./BidContext";

function BidButton(props) {
  const ref = useRef(null);
  const [message, setMessage] = useState("");
  const [inAction, setInAction] = useState(false);
  const [value, setValue] = useState(props.userStake);

  return (
    <React.Fragment>
      <BidContext.Provider
        value={{
          message,
          setMessage,
          inAction,
          setInAction,
          value,
          setValue,
        }}
      >
        <Overlay ref={ref} zValue={5}>
          <BidCard
            id={props.item.id}
            stake={props.stake}
            item={props.item}
            userStake={props.userStake}
          ></BidCard>
        </Overlay>
      </BidContext.Provider>
      {props.stake &&
      ((props.stake.vestingStarted && !props.stake.vestingEnded) ||
        (props.stake.biddingStarted && !props.stake.biddingEnded)) ? (
        <React.Fragment>
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
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
}

export default BidButton;
