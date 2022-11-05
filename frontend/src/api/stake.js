class Stake {
  constructor() {
    this.loadTime = Number(process.env.REACT_APP_API_CALL_TIME);
    this.time = new Date().getTime();
    this.stakes = [
      {
        id: 0,
        combinedStakes: 0,
        requiredStake: 100000,
        vestingStarted: false,
        vestingEnded: false,
        biddingStarted: false,
        biddingEnded: false,
        vestingTimeStart: this.time + 60000, //in 1 minutes
        vestingTimeEnd: undefined,
        biddingTimeStart: undefined,
        biddingTimeEnd: undefined,
      },
      {
        id: 1,
        combinedStakes: 0,
        requiredStake: 40000,
        vestingStarted: true,
        vestingEnded: false,
        biddingStarted: false,
        biddingEnded: false,
        vestingTimeStart: this.time, //now
        vestingTimeEnd:
          this.time + Number(process.env.REACT_APP_API_VESTING_TIME),
        biddingTimeStart: undefined,
        biddingTimeEnd: undefined,
      },
      {
        id: 2,
        combinedStakes: 63500,
        requiredStake: 120000,
        vestingStarted: true,
        vestingEnded: false,
        biddingStarted: false,
        biddingEnded: false,
        vestingTimeStart:
          this.time - Number(process.env.REACT_APP_API_VESTING_TIME) + 60000, //ends in 1 minute
        vestingTimeEnd: this.time + 60000,
        biddingTimeStart: undefined,
        biddingTimeEnd: undefined,
      },
      {
        id: 3,
        combinedStakes: 75000,
        requiredStake: 90000,
        vestingStarted: true,
        vestingEnded: true,
        biddingStarted: false,
        biddingEnded: false,
        vestingTimeStart:
          this.time - 60000 - Number(process.env.REACT_APP_API_VESTING_TIME),
        vestingTimeEnd: this.time - 60000, //in one minute
        biddingTimeStart: undefined,
        biddingTimeEnd: undefined,
      },
      {
        id: 4,
        combinedStakes: 66000,
        requiredStake: 60000,
        vestingStarted: true,
        vestingEnded: true,
        biddingStarted: true,
        biddingEnded: false,
        vestingTimeStart:
          this.time - Number(process.env.REACT_APP_API_VESTING_TIME),
        vestingTimeEnd: this.time,
        biddingTimeStart: this.time, //now
        biddingTimeEnd:
          this.time + Number(process.env.REACT_APP_API_BIDDING_TIME),
      },
      {
        id: 5,
        combinedStakes: 65000,
        requiredStake: 45000,
        vestingStarted: true,
        vestingEnded: true,
        biddingStarted: true,
        biddingEnded: false,
        vestingTimeStart:
          this.time - Number(process.env.REACT_APP_API_VESTING_TIME),
        vestingTimeEnd: this.time,
        biddingTimeStart: this.time, //now
        biddingTimeEnd:
          this.time + Number(process.env.REACT_APP_API_BIDDING_TIME),
      },
      {
        id: 6,
        combinedStakes: 81200,
        requiredStake: 35000,
        vestingStarted: true,
        vestingEnded: true,
        biddingStarted: true,
        biddingEnded: false,
        vestingTimeStart:
          this.time +
          60000 -
          Number(process.env.REACT_APP_API_BIDDING_TIME) -
          Number(process.env.REACT_APP_API_VESTING_TIME),
        vestingTimeEnd:
          this.time + 30000 - Number(process.env.REACT_APP_API_BIDDING_TIME),
        biddingTimeStart:
          this.time + 30000 - Number(process.env.REACT_APP_API_BIDDING_TIME),
        biddingTimeEnd: this.time + 30000, //in 30 seconds
      },
      {
        id: 7,
        winnerId: 123,
        combinedStakes: 92200,
        requiredStake: 50000,
        vestingStarted: true,
        vestingEnded: true,
        biddingStarted: true,
        biddingEnded: true,
        vestingTimeStart:
          this.time -
          Number(process.env.REACT_APP_API_BIDDING_TIME) -
          Number(process.env.REACT_APP_API_VESTING_TIME),
        vestingTimeEnd:
          this.time - Number(process.env.REACT_APP_API_BIDDING_TIME),
        biddingTimeStart:
          this.time - Number(process.env.REACT_APP_API_BIDDING_TIME),
        biddingTimeEnd: this.time,
      },
      {
        id: 8,
        winnerId: 69,
        combinedStakes: 124000,
        requiredStake: 70000,
        vestingStarted: true,
        vestingEnded: true,
        biddingStarted: true,
        biddingEnded: true,
        vestingTimeStart:
          this.time -
          60000 -
          Number(process.env.REACT_APP_API_BIDDING_TIME) -
          Number(process.env.REACT_APP_API_VESTING_TIME),
        vestingTimeEnd:
          this.time - 60000 - Number(process.env.REACT_APP_API_BIDDING_TIME),
        biddingTimeStart:
          this.time - 60000 - Number(process.env.REACT_APP_API_BIDDING_TIME),
        biddingTimeEnd: this.time - 60000, //1 minute ago
      },
    ];
    this.interval = setInterval(() => {
      const time = new Date().getTime();

      for (let stake of this.stakes) {
        if (!stake.vestingStarted) {
          if (time >= stake.vestingTimeStart) {
            stake.vestingStarted = true;
            stake.vestingTimeEnd =
              time + Number(process.env.REACT_APP_API_VESTING_TIME);
          }
        } else if (!stake.vestingEnded && !stake.biddingStarted) {
          if (time >= stake.vestingTimeEnd) {
            stake.vestingEnded = true;
            if (stake.combinedStakes >= stake.requiredStake) {
              stake.biddingStarted = true;
              stake.biddingTimeStart = time;
              stake.biddingTimeEnd =
                time + Number(process.env.REACT_APP_API_BIDDING_TIME);
            }
          }
        } else if (!stake.biddingEnded) {
          if (time >= stake.biddingTimeEnd) {
            stake.biddingEnded = true;
            stake.biddingTimeEnd = time;
            //determine a winner
            const fraction =
              (this.userStakes[stake.id] ?? 0) / stake.combinedStakes;

            if (Math.sqrt(fraction) >= 1 - Math.random())
              stake.winnerId = 123; //user wins
            else stake.winnerId = 69; //someone else wins
          }
        }
      }
    }, Number(process.env.REACT_APP_API_UPDATE_INTERVAL));
    //THose are here to make everything work
    //very hacky workaround, in a real backend this would work differently anyways
    this.userStakes = { 2: 5000, 4: 3000, 6: 70000, 7: 10000 };
  }
  // only used from data api
  updateStake(id, diff, userStake) {
    this.stakes[id].combinedStakes = Math.max(
      0,
      this.stakes[id].combinedStakes + diff
    );
    //update the user stakes so we can determine a winner
    this.userStakes[id] = userStake;
  }

  getStake({ id }) {
    const stake = this.stakes.find((stake) => stake.id === Number(id));

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (stake) resolve({ stake });
        else reject("No item found (stake)");
      }, this.loadTime);
    });
  }
}

export default new Stake();
