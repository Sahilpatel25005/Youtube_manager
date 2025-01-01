import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../Redux/dataSlice.js";

export const store = configureStore({
  reducer: dataReducer,
});
