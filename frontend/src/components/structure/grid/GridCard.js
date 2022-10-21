import classes from "./css/GridCard.module.css";

import Image from "../../cardparts/image/Image";
import Title from "../../cardparts/title/Title";
import Wishlist from "../../cardparts/wishlist/Wishlist";
import StakeValues from "../../cardparts/stake/StakeValues";
import BidButton from "../../cardparts/bid/BidButton";
import Time from "../../cardparts/time/Time";

import { useSelector } from "react-redux";

import StakeCallback from "../../utils/StakeCallback";

import { useState, useCallback } from "react";

function GridCard(props) {
  const [stake, setStake] = useState({});

  const userStake = useSelector(
    (state) => state.user.stakes[props.item.id] ?? 0
  );

  const setStakeCallback = useCallback((newStake) => {
    setStake(newStake);
  }, []);

  console.log("grid card render", props.index, "in view", props.inView);

  return (
    <div className={classes.container}>
      <StakeCallback
        id={props.item.id}
        setStake={setStakeCallback}
        inView={props.inView}
      ></StakeCallback>
      <div className={classes.imageContainer}>
        <Image to={`/detail/${props.item.id}`} item={props.item} />
      </div>
      <div className={classes.textContainer}>
        <div className={classes.infoContainer}>
          <Title item={props.item} />
          <StakeValues stake={stake} userStake={userStake} />
        </div>
        <div className={classes.biddingContainer}>
          <Time stake={stake} inView={props.inView} />
          <BidButton item={props.item} stake={stake} userStake={userStake} />
        </div>
        <div className={classes.wishlistContainer}>
          <Wishlist item={props.item} />
        </div>
      </div>
    </div>
  );
}

export default GridCard;
