import { createSlice } from "@reduxjs/toolkit";

export const itemsSlice = createSlice({
  name: "items",
  initialState: {
    //page: {items, hasMore, lastVisibleIndex}
  },
  reducers: {
    deletePage: (state, action) => {
      //TODO: delete all entries except for current page
    },
    updatePage: (state, action) => {
      if (!state[action.payload.page])
        state[action.payload.page] = {
          items: [],
          hasMore: true,
          lastVisibleIndex: -Infinity,
        };

      if (!(action.payload.items === undefined))
        state[action.payload.page].items = state[
          action.payload.page
        ].items.concat(action.payload.items);

      if (!(action.payload.hasMore === undefined))
        state[action.payload.page].hasMore = action.payload.hasMore;

      if (!(action.payload.lastVisibleIndex === undefined))
        state[action.payload.page].lastVisibleIndex =
          action.payload.lastVisibleIndex;
    },
  },
});

export const { updatePage, deletePage } = itemsSlice.actions;

export default itemsSlice.reducer;
