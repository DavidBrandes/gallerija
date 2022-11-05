import { createSlice } from "@reduxjs/toolkit";

export const overlaySlice = createSlice({
  name: "time",
  initialState: {
    open: false,
  },
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload.open;
    },
  },
});

export const { setOpen } = overlaySlice.actions;

export default overlaySlice.reducer;
