import { createSlice } from "@reduxjs/toolkit";

export const winSlice = createSlice({
  name: "time",
  initialState: {
    win: { id: undefined, won: undefined, showed: undefined },
  },
  reducers: {
    setWin: (state, action) => {
      state.win.id = action.payload.id;
      state.win.won = action.payload.won;
      state.win.showed = false;
    },

    updateShowed: (state, action) => {
      state.win.showed = true;
    },
  },
});

export const { setWin, updateShowed } = winSlice.actions;

export default winSlice.reducer;
