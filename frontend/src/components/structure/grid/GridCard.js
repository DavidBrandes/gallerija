import classes from "./css/GridCard.module.css";

import Image from "../../cardparts/image/Image";
import Title from "../../cardparts/title/Title";
import Wishlist from "../../cardparts/wishlist/Wishlist";
import StakeValues from "../../cardparts/stake/StakeValues";
import WinLooseBidButton from "../../cardparts/combined/winloose_bidbutton/WinLooseBidButton";
import Time from "../../cardparts/time/Time";

import { useSelector } from "react-redux";

import StakeCallback from "../../utils/StakeCallback";

import { useState, useCallback } from "react";

function GridCard(props) {
  //TODO: in theory we do not need the inView prop here as the card is
  //replaced by a placholder when not in view. To align with the other cards we
  //use it like in those cases
  const [stake, setStake] = useState();

  const userStake = useSelector((state) => {
    if (state.user.stakes[props.id] !== undefined && props.inView)
      return state.user.stakes[props.id];
    else return 0;
  });

  const setStakeCallback = useCallback((newStake) => {
    setStake(newStake);
  }, []);

  console.log("Rendered grid card", props.index, "in view", props.inView);

  return (
    <div className={classes.container}>
      <StakeCallback
        id={props.item.id}
        setStake={setStakeCallback}
        inView={props.inView}
      ></StakeCallback>
      <div className={classes.imageContainer}>
        <Image
          to={`/detail/${props.item.id}`}
          item={props.item}
          imageClass={classes.image}
          containerClass={classes.imageContainer}
        />
      </div>
      <div className={classes.textContainer}>
        <Title
          item={props.item}
          containerClass={classes.titleContainer}
          titleClass={classes.title}
          subTitleClass={classes.subTitle}
        />
        <div className={classes.infoContainer}>
          <div className={classes.leftPart}>
            <StakeValues
              stake={stake}
              userStake={userStake}
              stakesContainerClass={classes.stakesContainer}
              containerClass={classes.stakeContainer}
              valueClass={classes.stakeValue}
              titleClass={classes.stakeTitle}
            />
          </div>
          <div className={classes.rightPart}>
            <WinLooseBidButton
              stake={stake}
              userStake={userStake}
              item={props.item}
              buttonContainerClass={classes.bidButtonContainer}
              textContainerClass={classes.bidTextContainer}
            />
          </div>
        </div>
        <Time
          stake={stake}
          inView={props.inView}
          containerClass={classes.time}
        />
        <Wishlist
          id={props.item.id}
          containerClass={classes.wishlistContainer}
        />
      </div>
    </div>
  );
}

export default GridCard;
