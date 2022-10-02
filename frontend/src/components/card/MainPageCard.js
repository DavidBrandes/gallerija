import classes from "./css/MainPageCard.module.css";
import Card from "./GridCard";

import { InView } from "react-intersection-observer";

import { useSelector } from "react-redux";
import { useState, useRef } from "react";

import Link from "../utils/Link";
import StakeOverview from "../ui/StakeOverview";
import ItemTitle from "../ui/ItemTitle";
import BiddingTime from "../ui/BiddingTime";
import BidButton from "../ui/BidButton";
import ViewButton from "../ui/ViewButton";
import WishlistButton from "../ui/WhishlistButton";

function MainPageCard(props) {
  const userStake = useSelector(
    (state) => state.user.stakes[props.item.id] ?? 0
  );
  //TODO: set as index <= lastInView global variable
  const [componentInView, setComponentInView] = useState(false);
  const wasInView = useRef(props.wasInView);

  console.log("rendered card", props.index, props.wasInView, componentInView);

  return (
    <InView
      onChange={(inView) => {
        if (inView && !wasInView.current) {
          wasInView.current = true;
        }
        setComponentInView(inView);
        props.callback(props.index, inView);
      }}
      rootMargin={"100px 0px 100px 0px"}
    >
      <Card>
        {componentInView || wasInView.current ? (
          <div className={classes.container}>
            <Link to={`/detail/${props.item.id}`}>
              <img
                src={props.item.srcLow[0]}
                alt={props.item.title}
                className={classes.image}
              />
            </Link>
            <div className={classes.text}>
              <ItemTitle
                title={props.item.title}
                subTitle={props.item.subTitle}
                underlined={true}
              ></ItemTitle>
              <StakeOverview
                vestingStarted={props.item.vestingStarted}
                vestingEnded={props.item.vestingEnded}
                requiredStake={props.item.requiredStake}
                combinedStakes={props.item.combinedStakes}
                userStake={userStake}
                centered={true}
              ></StakeOverview>
              <BiddingTime centered={true}></BiddingTime>
              <BidButton
                biddingStarted={props.item.biddingStarted}
                userStake={userStake}
                vestingStarted={props.item.vestingStarted}
                biddingEnded={props.item.biddingEnded}
              ></BidButton>
              <ViewButton type={"Painting"} id={props.item.id}></ViewButton>
              <WishlistButton id={props.item.id}></WishlistButton>
            </div>
          </div>
        ) : (
          <div className={classes.placeholder} />
        )}
      </Card>
    </InView>
  );
}

export default MainPageCard;
