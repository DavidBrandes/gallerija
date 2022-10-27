import { createSlice } from "@reduxjs/toolkit";

export const querySlice = createSlice({
  name: "items",
  initialState: {
    main: {
      items: [],
      numberItems: Infinity,
      lastVisibleIndex: -Infinity,
      artists: [],
    },
    related: {
      id: undefined,
      blocks: {},
      blockIndices: [],
      maxBlockIndex: Infinity,
      lastVisibleBlockIndex: -Infinity,
    },
  },
  reducers: {
    updateMain: (state, action) => {
      if (action.payload.items !== undefined)
        state.main.items = state.main.items.concat(action.payload.items);

      if (action.payload.numberItems !== undefined)
        state.main.numberItems = action.payload.numberItems;

      if (action.payload.lastVisibleIndex !== undefined)
        state.main.lastVisibleIndex = action.payload.lastVisibleIndex;

      if (action.payload.artists !== undefined)
        state.main.artists = action.payload.artists;
    },
    relatedSetMaxBlockIndex: (state, action) => {
      state.related.maxBlockIndex = action.payload.maxBlockIndex;
    },
    relatedSetBlock: (state, action) => {
      const maxBlocks = Number(process.env.REACT_APP_MAX_GRID_STORE_BLOCKS);
      state.related.blocks[action.payload.blockIndex] = action.payload.block;
      state.related.blockIndices.push(action.payload.blockIndex);

      if (state.related.blockIndices.length > maxBlocks) {
        delete state.related.blocks[state.related.blockIndices[0]];
        state.related.blockIndices = state.related.blockIndices.slice(1);
      }
    },
    relatedSetLastVisibleBlockIndex: (state, action) => {
      state.related.lastVisibleBlockIndex = action.payload.blockIndex;
    },
    initRelated: (state, action) => {
      if (state.related.id !== action.payload.id) {
        state.related.id = action.payload.id;
        state.related.blocks = {};
        state.related.blockIndices = [];
        state.related.maxBlockIndex = Infinity;
        state.related.lastVisibleBlockIndex = -Infinity;
      }
    },
  },
});

export const {
  updateMain,
  relatedSetMaxBlockIndex,
  relatedSetBlock,
  relatedSetLastVisibleBlockIndex,
  initRelated,
} = querySlice.actions;

export default querySlice.reducer;
