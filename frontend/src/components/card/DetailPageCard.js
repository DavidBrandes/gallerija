import React from "react";

import Carousel from "../structure/Carousel";
import Image from "../structure/Image";
import StakeOverview from "../ui/StakeOverview";
import ItemTitle from "../ui/ItemTitle";
import ItemDescription from "../ui/ItemDescription";
import BiddingTime from "../ui/BiddingTime";
import BidButton from "../ui/BidButton";
import WishlistButton from "../ui/WhishlistButton";

import classes from "./css/DetailPageCard.module.css";

import { useSelector } from "react-redux";

import data from "../../api/data";

function DetailPageCard(props) {
  const userStake = useSelector((state) => state.user.stakes[props.id] ?? 0);
  const item = data.getItem(props.id);

  return (
    <div className={classes.container}>
      <div className={classes.leftPart}>
        {item.srcLow.length > 1 ? (
          <Carousel
            srcLow={item.srcLow}
            srcHigh={item.srcHigh}
            title={item.title}
          ></Carousel>
        ) : (
          <Image
            srcLow={item.srcLow[0]}
            srcHigh={item.srcHigh[0]}
            title={item.title}
          ></Image>
        )}
      </div>
      <div className={classes.rightPart}>
        <div className={classes.text}>
          <ItemTitle
            title={item.title}
            subTitle={item.subTitle}
            underlined={false}
          ></ItemTitle>
          <ItemDescription description={item.description}></ItemDescription>
          <StakeOverview
            vestingStarted={item.vestingStarted}
            vestingEnded={item.vestingEnded}
            requiredStake={item.requiredStake}
            combinedStakes={item.combinedStakes}
            userStake={userStake}
            centered={false}
          ></StakeOverview>
          <BiddingTime centered={false}></BiddingTime>
          <BidButton
            biddingStarted={item.biddingStarted}
            userStake={userStake}
            vestingStarted={item.vestingStarted}
            biddingEnded={item.biddingEnded}
          ></BidButton>
          <WishlistButton id={item.id}></WishlistButton>
        </div>
      </div>
    </div>
  );
}

export default DetailPageCard;
