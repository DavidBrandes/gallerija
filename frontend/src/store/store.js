import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/userSlice";
import queryReducer from "./modules/querySlice";

export default configureStore({
  reducer: {
    user: userReducer,
    query: queryReducer,
  },
});
