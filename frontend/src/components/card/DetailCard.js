import React, { useCallback, useEffect } from "react";

import Carousel from "../cardparts/carousel/Carousel";
import Title from "../cardparts/title/Title";
import ItemDescription from "../cardparts/description/ItemDescription";
import Wishlist from "../cardparts/wishlist/Wishlist";
import Time from "../cardparts/time/Time";
import BidButton from "../cardparts/bid/BidButton";
import StakeValues from "../cardparts/stake/StakeValues";
import StakeText from "../cardparts/stake/StakeText";
import WinText from "../cardparts/win/WinText";
import WinChance from "../cardparts/chance/WinChance";

import classes from "./css/DetailCard.module.css";

import { useState } from "react";

import { useSelector } from "react-redux";

import itemData from "../../api/item";

import StakeCallback from "../utils/StakeCallback";
import { InView } from "react-intersection-observer";
import { useLocation } from "react-router";

function DetailCardWrapper(props) {
  const inViewMargin = Number(process.env.REACT_APP_MASONRY_IN_VIEW_MARGIN);
  const [componentInView, setComponentInView] = useState(false);

  return (
    <div>
      <InView
        onChange={(inView) => {
          setComponentInView(inView);
        }}
        rootMargin={`${inViewMargin}px 0px ${inViewMargin}px 0px`}
      >
        <DetailCard id={props.id} inView={componentInView}></DetailCard>
      </InView>
    </div>
  );
}

function DetailCard(props) {
  const [item, setItem] = useState(null);
  const userStake = useSelector((state) => state.user.stakes[props.id] ?? 0);
  const [stake, setStake] = useState({});
  const { state } = useLocation();

  console.log("detail card render", props.id, "in view", props.inView);

  async function load() {
    try {
      const newItem = await itemData.getItem({ id: props.id });
      setItem(newItem.item);
      console.log("detail card set item", item);
    } catch (error) {
      console.error(error);
    }
  }

  const setStakeCallback = useCallback((newStake) => {
    setStake(newStake);
  }, []);

  useEffect(() => {
    console.log("detail card init");
    // setStake({}); //causes additinal rerender on start
    if (state?.item) setItem(state.item);
    else {
      // setItem(null); //causes additinal rerender on start
      load();
    }
  }, [props.id]);

  return (
    <div>
      <StakeCallback
        id={props.id}
        setStake={setStakeCallback}
        inView={props.inView}
      ></StakeCallback>
      {item ? (
        <div className={classes.container}>
          <div className={classes.leftPart}>
            <Carousel item={item}></Carousel>
          </div>
          <div className={classes.rightPart}>
            <div className={classes.text}>
              <Title item={item}></Title>
              <ItemDescription item={item}></ItemDescription>
              <StakeValues stake={stake} userStake={userStake} />
              <Time stake={stake} inView={props.inView} />
              <StakeText stake={stake} />
              <WinText item={item} />
              <WinChance stake={stake} userStake={userStake} />
              <div className={classes.bidButton}>
                <BidButton item={item} userStake={userStake} stake={stake} />
              </div>
              <Wishlist item={item} />
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.placeholder}></div>
      )}
    </div>
  );
}

export default DetailCardWrapper;
