import stakeData from "./stake";

class User {
  constructor() {
    this.loadTime = Number(process.env.REACT_APP_API_CALL_TIME);
    this.stakes = { 3: 20, 4: 300, 6: 20 };
    this.wishlist = new Set([2]);
  }

  getUser() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ stakes: this.stakes, wishlist: this.wishlist });
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
        stakeData.updateStake(id, diff);
        this.stakes[id] = stake;
        if (this.stakes[id] <= 0) delete this.stakes[id];

        resolve({ id, stake: this.stakes[id] ?? 0 });
      }, this.loadTime);
    });
  }
  updateWishlist({ id, onWishlist }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (onWishlist) this.wishlist.add(id);
        else this.wishlist.delete(id);
        resolve({ id, onWishlist });
      }, this.loadTime);
    });
  }
}

export default new User();
