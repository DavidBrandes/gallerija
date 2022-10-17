import { createSlice } from "@reduxjs/toolkit";

export const querySlice = createSlice({
  name: "items",
  initialState: {
    main: { items: [], hasMore: true, lastVisibleIndex: -Infinity },
    //page: {items, hasMore, lastVisibleIndex}
    //current: {query, items, hasMore, lastVisibleIndex}
    //old: [queries...]
  },
  reducers: {
    updateQuery: (state, action) => {
      if (!(action.payload.items === undefined))
        state.main.items = state.main.items.concat(action.payload.items);

      if (!(action.payload.hasMore === undefined))
        state.main.hasMore = action.payload.hasMore;

      if (!(action.payload.lastVisibleIndex === undefined))
        state.main.lastVisibleIndex = action.payload.lastVisibleIndex;
    },
  },
});

export const { updateQuery } = querySlice.actions;

export default querySlice.reducer;
