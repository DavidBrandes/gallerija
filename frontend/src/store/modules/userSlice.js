import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    stakes: { 3: 20, 4: 300, 6: 20 },
    wishlist: { 2: true },
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
  },
});

export const { updateStake, updateWishlist } = userSlice.actions;

export default userSlice.reducer;
