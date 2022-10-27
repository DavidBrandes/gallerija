import classes from "./css/MasonryCard.module.css";

import Title from "../../cardparts/title/Title";
import Time from "../../cardparts/time/Time";
import ViewButton from "../../cardparts/view/ViewButton";
import Wishlist from "../../cardparts/wishlist/Wishlist";
import Image from "../../cardparts/image/Image";
import StakeValues from "../../cardparts/stake/StakeValues";
import StakeText from "../../cardparts/stake/StakeText";
import WinText from "../../cardparts/win/WinText";
import WinChance from "../../cardparts/chance/WinChance";
import BidButton from "../../cardparts/bid/BidButton";

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
        />
        <div className={classes.text}>
          <Title title={props.item.title} subTitle={props.item.subTitle} />
          <StakeValues stake={stake} userStake={userStake} />
          <Time stake={stake} inView={props.inView} />
          <StakeText stake={stake} />
          <WinText id={props.item.id} />
          <WinChance stake={stake} userStake={userStake} />
          <div className={classes.bidbutton}>
            <BidButton
              stake={stake}
              userStake={userStake}
              item={props.item}
              inView={props.inView}
            />
          </div>
          <ViewButton item={props.item} index={props.index}></ViewButton>
          <Wishlist id={props.item.id} />
        </div>
      </div>
    </div>
  );
}

export default MasonryCard;
