import classes from "./css/MasonryCard.module.css";

import Title from "../../cardparts/title/Title";
import Time from "../../cardparts/time/Time";
import ViewButton from "../../cardparts/view/ViewButton";
import Wishlist from "../../cardparts/wishlist/Wishlist";
import Image from "../../cardparts/image/Image";
import StakeValues from "../../cardparts/stake/StakeValues";
import WinLooseBidButton from "../../cardparts/combined/winloose_bidbutton/WinLooseBidButton";
import ChanceText from "../../cardparts/combined/chance_text/ChanceText";

import StakeCallback from "../../utils/StakeCallback";

import { setSearch } from "../../../utility/location";

import { useSelector } from "react-redux";
import React, { useState, useCallback } from "react";

function MasonryCard(props) {
  const userStake = useSelector((state) => {
    if (state.user.stakes[props.id] !== undefined && props.inView)
      return state.user.stakes[props.id];
    else return 0;
  });
  const [stake, setStake] = useState();

  const setStakeCallback = useCallback((newStake) => {
    setStake(newStake);
  }, []);

  console.log("Masonry card render", props.item.id);

  return (
    <div className={classes.wrapper}>
      <StakeCallback
        id={props.item.id}
        setStake={setStakeCallback}
        inView={props.inView}
        delay={props.delay}
      ></StakeCallback>
      <div className={classes.container}>
        <Image
          to={`/detail/${props.item.id}`}
          beforeNavigate={setSearch.bind(null, { n: props.index + 1 })}
          item={props.item}
          imageClass={classes.image}
        />
        <div className={classes.text}>
          <Title
            item={props.item}
            containerClass={classes.titleContainer}
            titleClass={classes.title}
            subTitleClass={classes.subTitle}
          />
          <StakeValues
            stake={stake}
            userStake={userStake}
            stakesContainerClass={classes.stakesContainer}
            containerClass={classes.stakeContainer}
            valueClass={classes.stakeValue}
            titleClass={classes.stakeTitle}
          />
          <Time
            stake={stake}
            inView={props.inView}
            containerClass={classes.time}
          />
          <ChanceText
            stake={stake}
            userStake={userStake}
            containerClass={classes.chanceTextContainer}
          />
          <WinLooseBidButton
            stake={stake}
            userStake={userStake}
            item={props.item}
            buttonContainerClass={classes.bidButtonContainer}
            textContainerClass={classes.bidTextContainer}
          />
          <ViewButton
            item={props.item}
            index={props.index}
            containerClass={classes.buttonContainer}
            textClass={classes.buttonText}
          ></ViewButton>
          <Wishlist
            id={props.item.id}
            containerClass={classes.wishlistContainer}
          />
        </div>
      </div>
    </div>
  );
}

export default MasonryCard;
