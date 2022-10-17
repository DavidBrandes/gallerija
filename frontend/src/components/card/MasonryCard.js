import classes from "./css/MasonryCard.module.css";

import Title from "../cardparts/title/Title";
import Time from "../cardparts/time/Time";
import ViewButton from "../cardparts/view/ViewButton";
import Wishlist from "../cardparts/wishlist/Wishlist";
import Image from "../cardparts/image/Image";
import StakeValues from "../cardparts/stake/StakeValues";

import BidButton from "../cardparts/bid/BidButton";

import StakeCallback from "../utils/StakeCallback";

import { setSearch } from "../../utility/location";

import { useSelector } from "react-redux";
import React, { useState, useCallback } from "react";

const MasonryCard = React.memo((props) => {
  const userStake = useSelector(
    (state) => state.user.stakes[props.item.id] ?? 0
  );
  const [stake, setStake] = useState({});

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
      ></StakeCallback>
      {props.show ? (
        <div className={classes.container}>
          <Image
            to={`/detail/${props.item.id}`}
            beforeNavigate={setSearch.bind(null, { n: props.index + 1 })}
            item={props.item}
          />
          <div className={classes.text}>
            <Title item={props.item} />
            <StakeValues stake={stake} userStake={userStake} />
            <Time />
            <div className={classes.bidbutton}>
              <BidButton
                stake={stake}
                userStake={userStake}
                item={props.item}
              />
            </div>
            <ViewButton item={props.item} index={props.index}></ViewButton>
            <Wishlist item={props.item} />
          </div>
        </div>
      ) : (
        <div className={classes.placeholder} />
      )}
    </div>
  );
});

export default MasonryCard;
