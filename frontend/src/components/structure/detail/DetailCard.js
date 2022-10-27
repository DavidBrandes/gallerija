import React, { useCallback, useEffect } from "react";

import Carousel from "../../cardparts/carousel/Carousel";
import Title from "../../cardparts/title/Title";
import ItemDescription from "../../cardparts/description/ItemDescription";
import Wishlist from "../../cardparts/wishlist/Wishlist";
import Time from "../../cardparts/time/Time";
import BidButton from "../../cardparts/bid/BidButton";
import StakeValues from "../../cardparts/stake/StakeValues";
import StakeText from "../../cardparts/stake/StakeText";
import WinText from "../../cardparts/win/WinText";
import WinChance from "../../cardparts/chance/WinChance";

import classes from "./css/DetailCard.module.css";

import { useState } from "react";
import { useSelector } from "react-redux";

import itemData from "../../../api/item";

import StakeCallback from "../../utils/StakeCallback";
import { InView } from "react-intersection-observer";
import { useLocation } from "react-router";

function DetailCardWrapper(props) {
  const inViewMargin = Number(process.env.REACT_APP_MASONRY_IN_VIEW_MARGIN);
  const [componentInView, setComponentInView] = useState(false);

  console.log("detail card wrapper render");

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
  const userStake = useSelector((state) => {
    if (state.user.stakes[props.id] !== undefined)
      return state.user.stakes[props.id];
    else return 0;
  });
  const [stake, setStake] = useState();
  const { state } = useLocation();

  console.log("detail card render", props.id, "in view", props.inView);

  async function load() {
    try {
      const newItem = await itemData.getItem({ id: props.id });
      setItem(newItem.item);
      console.log("detail card set item", props.id);
    } catch (error) {
      console.error(error);
    }
  }

  const setStakeCallback = useCallback((newStake) => {
    setStake(newStake);
  }, []);

  useEffect(() => {
    console.log("detail card init");
    if (state?.item) setItem(state.item);
    else {
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <StakeCallback
        id={props.id}
        setStake={setStakeCallback}
        inView={props.inView}
      ></StakeCallback>
      {item ? (
        <div className={classes.container}>
          <div className={classes.leftPart}>
            <Carousel
              srcLow={item.srcLow}
              srcHigh={item.srcHigh}
              title={item.title}
            ></Carousel>
          </div>
          <div className={classes.rightPart}>
            <div className={classes.text}>
              <Title title={item.title} subTitle={item.subTitle}></Title>
              <ItemDescription description={item.description}></ItemDescription>
              <StakeValues stake={stake} userStake={userStake} />
              <Time stake={stake} inView={props.inView} />
              <StakeText stake={stake} />
              <WinText id={item.id} />
              <WinChance stake={stake} userStake={userStake} />
              <div className={classes.bidButton}>
                <BidButton item={item} userStake={userStake} stake={stake} />
              </div>
              <Wishlist id={item.id} />
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.placeholder}></div>
      )}
    </React.Fragment>
  );
}

export default DetailCardWrapper;
