import { createSlice } from "@reduxjs/toolkit";

export const timeSlice = createSlice({
  name: "time",
  initialState: {
    main: { time: new Date().getTime() },
  },
  reducers: {
    setTime: (state, action) => {
      state.time = action.payload.time;
    },
  },
});

export const { setTime } = timeSlice.actions;

export default timeSlice.reducer;
