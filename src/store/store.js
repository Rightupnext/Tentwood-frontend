import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

import destinationReducer from "./slices/destinationSlice";
import travelReducer from "./slices/travelSlice";
import packagesReducer from "./slices/packageSlice";
export const store = configureStore({
  reducer: {
    users: userReducer,
    destinations: destinationReducer,
    travel: travelReducer,
    packages: packagesReducer,
  },
});
