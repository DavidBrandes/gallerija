import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    stakes: { 3: 20, 4: 300, 6: 20 },
    wishlist: {},
  },
  reducers: {
    logInOut: (state) => {
      state.loggedIn = !state.loggedIn;
    },
    placeStake: (state, action) => {
      return state.loggedIn;
    },
    revokeStake: (state, action) => {
      console.log(action, action.payload);
    },
    addRemoveWishlist: (state, action) => {
      state.wishlist[action.payload.id]
        ? (state.wishlist[action.payload.id] = false)
        : (state.wishlist[action.payload.id] = true);
    },
  },
});

export const { logInOut, addRemoveWishlist } = userSlice.actions;

export default userSlice.reducer;
