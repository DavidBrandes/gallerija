import React, { useRef, useState } from "react";

import Overlay from "../../utils/Overlay";
import BidCard from "./BidCard";

import BidContext from "./BidContext";

import classes from "./css/BidButton.module.css";

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
        <Overlay ref={ref} zValue={4} overlayClass={classes.overlayContainer}>
          <BidCard
            id={props.item.id}
            stake={props.stake}
            item={props.item}
            userStake={props.userStake}
          ></BidCard>
        </Overlay>
      </BidContext.Provider>
      <div
        onClick={() => {
          ref.current.showClick(true);
        }}
        className={props.containerClass}
      >
        {props.children}
      </div>
    </React.Fragment>
  );
}

export default BidButton;
