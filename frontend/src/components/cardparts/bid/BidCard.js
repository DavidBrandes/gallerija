import classes from "./css/BidCard.module.css";

import StakeValues from "../stake/StakeValues";
import Time from "../time/Time";
import StakeText from "../stake/StakeText";
import Title from "../title/Title";

import Fade from "react-bootstrap/Fade";

import React, { useContext, useEffect, useRef } from "react";

import BidContext from "./BidContext";

import userData from "../../../api/user";

import CurrencyInput from "react-currency-input-field";

import { convertNumber, convertFromString } from "../../../utility/number";

import { useDispatch } from "react-redux";
import { updateStake } from "../../../store/modules/userSlice";
import { setOpen } from "../../../store/modules/overlaySlice";

import CloseIcon from "../../utils/CloseIcon";

//TODO: memo necessary?
function BidCard(props) {
  // const [message, setMessage] = useState("");
  const closeTimeout = Number(process.env.REACT_APP_BID_CARD_CLOSE_TIME);
  const { message, setMessage, inAction, setInAction, value, setValue } =
    useContext(BidContext);
  const inputRef = useRef();
  const dispatch = useDispatch();

  const precision =
    10 ** Number(process.env.REACT_APP_BIDDING_CHANCE_ROUND_PRECISION);
  let chance =
    Math.round(
      (value / (props.stake.combinedStakes + value - props.userStake)) *
        precision *
        100
    ) / precision;
  chance = Number.isFinite(chance) ? chance : 0;

  console.log("bid card render", props.id);

  async function placeStake() {
    setInAction(true);
    setMessage("Submitting stake...");

    try {
      const response = await userData.updateStake({
        id: props.id,
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
    // dispatch(setOpen({ open: true }));
    inputRef.current.focus();
    return () => {
      if (!inAction) {
        setMessage("");
      }
      // dispatch(setOpen({ open: false }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.close} onClick={() => props.showClick(false)}>
        <CloseIcon />
      </div>
      <div className={classes.title}>
        <Title title={props.item.title} subTitle={props.item.subTitle} />
      </div>
      <div className={classes.info}>
        <StakeValues stake={props.stake} userStake={props.userStake} />
        <div className={classes.stakesText}>
          <Time stake={props.stake} inView={true} />
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
                defaultValue={value / 100}
                onValueChange={(value) => {
                  setValue(convertFromString(value));
                }}
                // suffix={" €"}
                // disableAbbreviations={true}
                intlConfig={{
                  locale: "de-De",
                  currency: "EUR",
                }}
                maxLength={7}
                allowDecimals={
                  process.env.REACT_APP_STAKE_ALLOW_DECIMALS === "true"
                }
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    if (inAction || !Number.isFinite(value)) return;
                    placeStake();
                  }
                }}
              />
              <span
                className={classes.inputFormText}
              >{`Predicted win chance: ${convertNumber(chance)} %`}</span>
            </div>
            <button
              className={`${
                inAction || !Number.isFinite(value)
                  ? classes.inputButtonPassive
                  : classes.inputButtonActive
              }`}
              onClick={placeStake}
            >
              {props.userStake <= 0
                ? "Place Stake"
                : props.stake.biddingStarted
                ? "Raise Stake"
                : "Update Stake"}
            </button>
          </div>
        </div>
        <Fade in={message ? true : false}>
          <div className={classes.message}>{message}</div>
        </Fade>
      </div>
    </div>
  );
}

export default BidCard;
