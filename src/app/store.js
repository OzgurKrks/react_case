import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/Slice";

export const store = configureStore({
  reducer: {
    weather_app: counterReducer,
  },
});
