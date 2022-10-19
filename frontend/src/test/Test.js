import classes from "./Test.module.css";

import date from "../utility/date";
import Time from "../components/cardparts/time/Time";
import WinLooseCard from "../components/popup/WinLooseCard";

function Child(props) {
  return <div className={classes.child}>Child Text</div>;
}

function Test() {
  let time = new Date().getTime() - 59000;
  const stakes = [
    {
      id: 0,
      userHasWon: false,
      combinedStakes: 0,
      requiredStake: 1000,
      vestingStarted: false,
      vestingEnded: false,
      biddingStarted: false,
      biddingEnded: false,
      vestingTimeStart: time + 60000, //in 1 minutes
      vestingTimeEnd: undefined,
      biddingTimeStart: undefined,
      biddingTimeEnd: undefined,
    },
    {
      id: 1,
      userHasWon: false,
      combinedStakes: 0,
      requiredStake: 400,
      vestingStarted: true,
      vestingEnded: false,
      biddingStarted: false,
      biddingEnded: false,
      vestingTimeStart: time, //now
      vestingTimeEnd: time + Number(process.env.REACT_APP_API_VESTING_TIME),
      biddingTimeStart: undefined,
      biddingTimeEnd: undefined,
    },
    {
      id: 2,
      userHasWon: false,

      combinedStakes: 635,
      requiredStake: 1200,
      vestingStarted: true,
      vestingEnded: false,
      biddingStarted: false,
      biddingEnded: false,
      vestingTimeStart:
        time - Number(process.env.REACT_APP_API_VESTING_TIME) + 60000, //ends in 1 minute
      vestingTimeEnd: time + 60000,
      biddingTimeStart: undefined,
      biddingTimeEnd: undefined,
    },
    {
      id: 3,
      userHasWon: false,
      combinedStakes: 750,
      requiredStake: 900,
      vestingStarted: true,
      vestingEnded: true,
      biddingStarted: false,
      biddingEnded: false,
      vestingTimeStart:
        time - 60000 - Number(process.env.REACT_APP_API_VESTING_TIME),
      vestingTimeEnd: time - 60000, // one minute before
      biddingTimeStart: undefined,
      biddingTimeEnd: undefined,
    },
    {
      id: 4,
      combinedStakes: 660,
      requiredStake: 600,
      vestingStarted: true,
      vestingEnded: true,
      biddingStarted: true,
      biddingEnded: false,
      vestingTimeStart: time - Number(process.env.REACT_APP_API_VESTING_TIME),
      vestingTimeEnd: time,
      biddingTimeStart: time, //now
      biddingTimeEnd: time + Number(process.env.REACT_APP_API_BIDDING_TIME),
    },
    {
      id: 5,
      combinedStakes: 650,
      requiredStake: 450,
      vestingStarted: true,
      vestingEnded: true,
      biddingStarted: true,
      biddingEnded: false,
      vestingTimeStart: time - Number(process.env.REACT_APP_API_VESTING_TIME),
      vestingTimeEnd: time,
      biddingTimeStart: time, //now
      biddingTimeEnd: time + Number(process.env.REACT_APP_API_BIDDING_TIME),
    },
    {
      id: 6,
      userHasWon: false,
      combinedStakes: 812,
      requiredStake: 350,
      vestingStarted: true,
      vestingEnded: true,
      biddingStarted: true,
      biddingEnded: false,
      vestingTimeStart:
        time +
        60000 -
        Number(process.env.REACT_APP_API_BIDDING_TIME) -
        Number(process.env.REACT_APP_API_VESTING_TIME),
      vestingTimeEnd:
        time + 60000 - Number(process.env.REACT_APP_API_BIDDING_TIME),
      biddingTimeStart:
        time + 60000 - Number(process.env.REACT_APP_API_BIDDING_TIME),
      biddingTimeEnd: time + 60000, //in 1 minute
    },
    {
      id: 7,
      userHasWon: true,
      combinedStakes: 922,
      requiredStake: 500,
      vestingStarted: true,
      vestingEnded: true,
      biddingStarted: true,
      biddingEnded: true,
      vestingTimeStart:
        time -
        Number(process.env.REACT_APP_API_BIDDING_TIME) -
        Number(process.env.REACT_APP_API_VESTING_TIME),
      vestingTimeEnd: time - Number(process.env.REACT_APP_API_BIDDING_TIME),
      biddingTimeStart: time - Number(process.env.REACT_APP_API_BIDDING_TIME),
      biddingTimeEnd: time,
    },
    {
      id: 8,
      userHasWon: false,
      combinedStakes: 1240,
      requiredStake: 700,
      vestingStarted: true,
      vestingEnded: true,
      biddingStarted: true,
      biddingEnded: true,
      vestingTimeStart:
        time -
        60000 -
        Number(process.env.REACT_APP_API_BIDDING_TIME) -
        Number(process.env.REACT_APP_API_VESTING_TIME),
      vestingTimeEnd:
        time - 60000 - Number(process.env.REACT_APP_API_BIDDING_TIME),
      biddingTimeStart:
        time - 60000 - Number(process.env.REACT_APP_API_BIDDING_TIME),
      biddingTimeEnd: time - 60000, //1 minute ago
    },
  ];

  return (
    <div className={classes.parent}>
      <WinLooseCard />
    </div>
  );
}

export default Test;
