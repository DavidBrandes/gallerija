import classes from "./css/BidCard.module.css";

import StakeValues from "../stake/StakeValues";
import Time from "../time/Time";
import Title from "../title/Title";
import ChanceText from "../combined/chance_text/ChanceText";
import Fade from "react-bootstrap/Fade";

import React, { useContext, useEffect, useRef } from "react";

import { TbArrowForwardUp } from "react-icons/tb";

import BidContext from "./BidContext";

import userData from "../../../api/user";

import CurrencyInput from "react-currency-input-field";

import { convertNumber, convertFromString } from "../../../utility/number";

import { useDispatch } from "react-redux";
import { updateStake } from "../../../store/modules/userSlice";

function BidCard(props) {
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
    // inputRef.current.focus();
    return () => {
      if (!inAction) {
        setMessage("");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.container}>
      <TbArrowForwardUp
        className={classes.close}
        onClick={() => props.showClick(false)}
      />
      <Title
        item={props.item}
        containerClass={classes.titleContainer}
        titleClass={classes.title}
        subTitleClass={classes.subTitle}
      />
      <div className={classes.info}>
        <div className={classes.leftPart}>
          <StakeValues
            stake={props.stake}
            userStake={props.userStake}
            stakesContainerClass={classes.stakesContainer}
            containerClass={classes.stakeContainer}
            valueClass={classes.stakeValue}
            titleClass={classes.stakeTitle}
          />
        </div>
        <div className={classes.rightPart}>
          <Time
            stake={props.stake}
            inView={true}
            containerClass={classes.time}
          />
          <ChanceText
            stake={props.stake}
            userStake={props.userStake}
            containerClass={classes.chanceTextContainer}
          />
        </div>
      </div>
      <div className={classes.bid}>
        <div className={classes.input}>
          <span className={classes.inputText}>
            Enter below the total stake you would like to submit for this
            painting, including any previous submissions you may have made. Your
            chance to win this painting will then be the proportion of this
            stake compared to the combined sum of all stakes made for this
            painting.
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
                disableAbbreviations={true}
                intlConfig={{
                  locale: "de-De",
                  currency: "EUR",
                }}
                maxLength={7}
                allowNegativeValue={false}
                disableGroupSeparators={true}
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
