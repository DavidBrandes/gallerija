class Stake {
  constructor() {
    this.loadTime = Number(process.env.REACT_APP_API_CALL_TIME);
    this.date = new Date();
    this.stakes = [
      {
        id: 0,
        combinedStakes: 0,
        requiredStake: 1000,
        vestingStarted: false,
        vestingEnded: false,
        biddingStarted: false,
        biddingEnded: false,
        vestingTimeStart: undefined,
        vestingTimeEnd: undefined,
        biddingTimeStart: undefined,
        biddingTimeEnd: undefined,
      },
      {
        id: 1,
        combinedStakes: 0,
        requiredStake: 400,
        vestingStarted: false,
        vestingEnded: false,
        biddingStarted: false,
        biddingEnded: false,
        vestingTimeStart: undefined,
        vestingTimeEnd: undefined,
        biddingTimeStart: undefined,
        biddingTimeEnd: undefined,
      },
      {
        id: 2,
        combinedStakes: 567,
        requiredStake: 1200,
        vestingStarted: true,
        vestingEnded: false,
        biddingStarted: false,
        biddingEnded: false,
        vestingTimeStart: undefined,
        vestingTimeEnd: undefined,
        biddingTimeStart: undefined,
        biddingTimeEnd: undefined,
      },
      {
        id: 3,
        combinedStakes: 934,
        requiredStake: 900,
        vestingStarted: true,
        vestingEnded: false,
        biddingStarted: false,
        biddingEnded: false,
        vestingTimeStart: undefined,
        vestingTimeEnd: undefined,
        biddingTimeStart: undefined,
        biddingTimeEnd: undefined,
      },
      {
        id: 4,
        combinedStakes: 540,
        requiredStake: 600,
        vestingStarted: true,
        vestingEnded: false,
        biddingStarted: false,
        biddingEnded: false,
        vestingTimeStart: undefined,
        vestingTimeEnd: undefined,
        biddingTimeStart: undefined,
        biddingTimeEnd: undefined,
      },
      {
        id: 5,
        combinedStakes: 812,
        requiredStake: 350,
        vestingStarted: true,
        vestingEnded: true,
        biddingStarted: true,
        biddingEnded: false,
        vestingTimeStart: undefined,
        vestingTimeEnd: undefined,
        biddingTimeStart: undefined,
        biddingTimeEnd: undefined,
      },
      {
        id: 6,
        combinedStakes: 902,
        requiredStake: 500,
        vestingStarted: true,
        vestingEnded: true,
        biddingStarted: true,
        biddingEnded: false,
        vestingTimeStart: undefined,
        vestingTimeEnd: undefined,
        biddingTimeStart: undefined,
        biddingTimeEnd: undefined,
      },
      {
        id: 7,
        combinedStakes: 12003,
        requiredStake: 100,
        vestingStarted: true,
        vestingEnded: true,
        biddingStarted: true,
        biddingEnded: true,
        vestingTimeStart: undefined,
        vestingTimeEnd: undefined,
        biddingTimeStart: undefined,
        biddingTimeEnd: undefined,
      },
    ];
  }
  // only uswd from data api
  updateStake(id, diff) {
    this.stakes[id].combinedStakes = Math.max(
      0,
      this.stakes[id].combinedStakes + diff
    );
  }

  getStake({ id }) {
    const stake = this.stakes.find((stake) => stake.id === Number(id));
    console.log("stake call", id);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (stake) resolve({ stake });
        else reject("No item found (stake)");
      }, this.loadTime);
    });
  }
}

export default new Stake();
