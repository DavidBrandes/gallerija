import classes from "./css/BidCard.module.css";

import StakeValue from "../stake/StakeValue";
import Time from "../time/Time";
import StakeText from "../stake/StakeText";
import Title from "../title/Title";

import Fade from "react-bootstrap/Fade";

import React, { useContext, useEffect, useRef } from "react";

import BidContext from "./BidContext";

import userData from "../../../api/user";

import CurrencyInput from "react-currency-input-field";

import { convertNumber } from "../../../utility/number";

import { useDispatch } from "react-redux";
import { updateStake } from "../../../store/modules/userSlice";

// import { TfiClose } from "react-icons/tfi";

const BidCard = React.memo((props) => {
  // const [message, setMessage] = useState("");
  const closeTimeout = Number(process.env.REACT_APP_SUCCESsFULL_BID_CARD_CLOSE);
  const { message, setMessage, inAction, setInAction, value, setValue } =
    useContext(BidContext);
  const inputRef = useRef();
  const dispatch = useDispatch();

  console.log("bid card render");

  async function placeStake() {
    setInAction(true);
    setMessage("Submitting stake...");

    try {
      const response = await userData.updateStake({
        id: props.item.id,
        stake: value,
      });
      dispatch(updateStake(response));
      setMessage("Stake successfully submitted");

      setTimeout(() => {
        props.showClick(false);
        setInAction(false);
        setMessage("");
      }, closeTimeout);
    } catch (error) {
      console.error(error);
      setMessage(error);
      setInAction(false);
    }
  }

  useEffect(() => {
    inputRef.current.focus();
    return () => {
      if (!inAction) {
        setMessage("");
      }
    };
  }, []);

  return (
    <div className={classes.container}>
      <button onClick={() => props.showClick(false)} className={classes.close}>
        Close
      </button>
      <div className={classes.title}>
        <Title item={props.item} />
      </div>
      <div className={classes.info}>
        <div className={classes.stakes}>
          {!props.stake.vestingEnded ? (
            <StakeValue
              title={"Required Stake"}
              value={props.stake.requiredStake}
            />
          ) : null}
          <StakeValue
            title={"Combined Stakes"}
            value={props.stake.combinedStakes}
          />
        </div>
        <div className={classes.stakesText}>
          <Time />
          <StakeText stake={props.stake} />
        </div>
      </div>
      <div className={classes.bid}>
        <div className={classes.input}>
          <span className={classes.inputText}>
            Please enter below the total stake you would like to submit for this
            painting. Some more text bli bla blud da di da waffi puffi saffi
            est. Mogo dobo frubi dubi.
          </span>
          <div className={classes.inputAction}>
            <div className={classes.inputContainer}>
              <CurrencyInput
                ref={inputRef}
                className={classes.inputForm}
                placeholder="Enter new Stake"
                defaultValue={value}
                onValueChange={(value) => {
                  setValue(Number(value));
                }}
                suffix={" €"}
                disableAbbreviations={true}
                maxLength={7}
                allowDecimals={false}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    if (inAction || !Number.isFinite(value)) return;
                    placeStake();
                  }
                }}
              />
              <span
                className={classes.inputFormText}
              >{`Your current Stake: ${convertNumber(props.userStake)}`}</span>
            </div>
            <button
              className={`${
                inAction || !Number.isFinite(value)
                  ? classes.inputButtonPassive
                  : classes.inputButtonActive
              }`}
              onClick={placeStake}
            >
              {props.userStake > 0 ? "Update Stake" : "Place Stake"}
            </button>
          </div>
        </div>
        <Fade in={message ? true : false}>
          <div className={classes.message}>{message}</div>
        </Fade>
      </div>
    </div>
  );
});

export default BidCard;
