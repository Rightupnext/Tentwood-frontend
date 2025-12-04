import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import countryReducer from "./slices/countrySlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    countries: countryReducer,
  },
});
