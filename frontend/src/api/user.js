import stakeData from "./stake";

class User {
  constructor() {
    this.loadTime = Number(process.env.REACT_APP_API_CALL_TIME);
    this.stakes = { 2: 5000, 4: 15000, 8: 10000 };
    this.wishlist = { 2: true, 4: true };
    this.won = { 8: true };
    this.id = 123;
    this.interval = setInterval(() => {
      const newWon = {};

      for (let key of Object.keys(this.stakes)) {
        if (stakeData.stakes[key].winnerId) {
          if (stakeData.stakes[key].winnerId === this.id) newWon[key] = true;
          else newWon[key] = false;
        }
      }

      this.won = newWon;
    }, Number(process.env.REACT_APP_API_UPDATE_INTERVAL));
  }

  getUser() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          stakes: this.stakes,
          wishlist: this.wishlist,
          id: this.id,
          won: this.won,
        });
      }, this.loadTime);
    });
  }
  updateStake({ id, stake }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!Number.isFinite(stake) || stake < 0) {
          reject("Please enter a valid number");
          return;
        }

        const diff = stake - (this.stakes[id] ?? 0);
        if (diff === 0) {
          reject("Please specify a stake different from the current one");
          return;
        }
        if (diff <= 0 && stakeData.stakes[id].biddingStarted) {
          reject("You may not revoke a stake after the bidding has started");
          return;
        }
        if (!stakeData.stakes[id].vestingStarted) {
          reject("You may not place a bid before the bidding started");
          return;
        }
        if (
          stakeData.stakes[id].vestingEnded &&
          !stakeData.stakes[id].biddingStarted
        ) {
          reject("This painting did not collect sufficent bids");
          return;
        }
        if (stakeData.stakes[id].biddingEnded) {
          reject("You cannot place a bid after the bidding ended");
          return;
        }
        const newStakes = { ...this.stakes };
        newStakes[id] = stake;
        if (newStakes[id] <= 0) delete newStakes[id];
        this.stakes = newStakes;

        stakeData.updateStake(id, diff, this.stakes[id]);

        resolve({ id, stake: this.stakes[id] ?? 0 });
      }, this.loadTime);
    });
  }
  updateWishlist({ id, onWishlist }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newWishlist = { ...this.wishlist };
        if (onWishlist) newWishlist[id] = true;
        else delete newWishlist[id];
        this.wishlist = newWishlist;

        resolve({ id, onWishlist });
      }, this.loadTime);
    });
  }
}

export default new User();
