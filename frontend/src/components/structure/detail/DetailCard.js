import React, { useCallback, useEffect } from "react";

import Carousel from "../../cardparts/carousel/Carousel";
import Title from "../../cardparts/title/Title";
import ItemDescription from "../../cardparts/description/ItemDescription";
import Wishlist from "../../cardparts/wishlist/Wishlist";
import Time from "../../cardparts/time/Time";
import WinLooseBidButton from "../../cardparts/combined/winloose_bidbutton/WinLooseBidButton";
import StakeValues from "../../cardparts/stake/StakeValues";
import ChanceText from "../../cardparts/combined/chance_text/ChanceText";

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
              imageBigClass={classes.imageBig}
              imageSmallClass={classes.imageSmall}
            ></Carousel>
          </div>
          <div className={classes.rightPart}>
            <Title
              item={item}
              containerClass={classes.titleContainer}
              titleClass={classes.title}
              subTitleClass={classes.subTitle}
            ></Title>
            <ItemDescription
              description={item.description}
              containerClass={classes.descriptionContainer}
              titleClass={classes.descriptionTitle}
              textClass={classes.descriptionText}
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
              item={item}
              buttonContainerClass={classes.bidButtonContainer}
              textContainerClass={classes.bidTextContainer}
            />
            <Wishlist id={item.id} containerClass={classes.wishlistContainer} />
          </div>
        </div>
      ) : (
        <div className={classes.placeholder}></div>
      )}
    </React.Fragment>
  );
}

export default DetailCardWrapper;
