import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    stakes: {},
    wishlist: {},
    won: {},
    id: undefined,
  },
  reducers: {
    updateStake: (state, action) => {
      if (action.payload.stake === 0) delete state.stakes[action.payload.id];
      else state.stakes[action.payload.id] = action.payload.stake;
    },
    updateWishlist: (state, action) => {
      if (action.payload.onWishlist) state.wishlist[action.payload.id] = true;
      else delete state.wishlist[action.payload.id];
    },
    setUser: (state, action) => {
      if (action.payload.state.id) state.id = action.payload.state.id;
      if (action.payload.state.wishlist)
        state.wishlist = action.payload.state.wishlist;
      if (action.payload.state.stakes)
        state.stakes = action.payload.state.stakes;
      if (action.payload.state.won) state.won = action.payload.state.won;
    },
  },
});

export const { updateStake, updateWishlist, setUser } = userSlice.actions;

export default userSlice.reducer;
