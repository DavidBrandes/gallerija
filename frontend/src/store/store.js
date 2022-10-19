import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/userSlice";
import queryReducer from "./modules/querySlice";
import timeReducer from "./modules/timeSlice";
import winReducer from "./modules/winSlice";
import overlaySlice from "./modules/overlaySlice";

export default configureStore({
  reducer: {
    user: userReducer,
    query: queryReducer,
    time: timeReducer,
    win: winReducer,
    overlay: overlaySlice,
  },
});
