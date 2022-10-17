import classes from "./Test.module.css";

import BidButton from "../components/cardparts/bid/BidButton";
import { useRef, useState } from "react";

function Child(props) {
  return <div className={classes.child}>Child Text</div>;
}

function Test() {
  const stake = {
    id: 6,
    combinedStakes: 12030,
    requiredStake: 100000,
    vestingStarted: true,
    vestingEnded: true,
    biddingStarted: true,
    biddingEnded: false,
    vestingTimeStart: undefined,
    vestingTimeEnd: undefined,
    biddingTimeStart: undefined,
    biddingTimeEnd: undefined,
  };
  const item = {
    srcLow: [
      "/images/View_of_heidelberg.webp",
      "/images/View_of_heidelberg.webp",
      "/images/View_of_heidelberg.webp",
    ],
    srcHigh: [
      "/images/View_of_heidelberg.webp",
      "/images/View_of_heidelberg.webp",
      "/images/View_of_heidelberg.webp",
    ],
    title: "View of Heidelberg",
    subTitle: "Jan Brueghel the Elder",
    id: 6,
    description: {
      Type: "Oil on Paper",
      Measures: "11.8 W x 9.8 H x 0.7 D in",
      Country: "Netherlands",
    },
  };
  const [userStake, setUserStake] = useState(1000);

  return (
    <div className={classes.parent}>
      <BidButton stake={stake} userStake={userStake} item={item}></BidButton>
      <div className={classes.child}></div>
      <div>Some other stuff</div>
    </div>
  );
}

export default Test;
