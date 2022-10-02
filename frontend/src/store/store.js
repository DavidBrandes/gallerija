import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/userSlice";
import itemsReducer from "./modules/itemsSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    items: itemsReducer,
  },
});
