import { createSlice } from "@reduxjs/toolkit";

export const winSlice = createSlice({
  name: "time",
  initialState: {
    win: { id: undefined, won: undefined },
  },
  reducers: {
    setWin: (state, action) => {
      state.win.id = action.payload.id;
      state.win.won = action.payload.won;
    },
  },
});

export const { setWin } = winSlice.actions;

export default winSlice.reducer;
