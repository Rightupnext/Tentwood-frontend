import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import countryReducer from "./slices/countrySlice";
import destinationReducer from "./slices/destinationSlice"; 
import travelReducer from "./slices/travelSlice";
export const store = configureStore({
  reducer: {
    users: userReducer,
    countries: countryReducer,
    destinations:destinationReducer,
    travel: travelReducer,
  },
});
