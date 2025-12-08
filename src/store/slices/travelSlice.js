// store/slices/travelSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { createApiThunk } from "../genericThunk";

// Step 1: Country
export const submitCountry = createApiThunk("submitCountry", {
  method: "post",
  url: "/pkg/step1",
});

// Step 2: Destination
export const submitDestination = createApiThunk("submitDestination", {
  method: "post",
  url: "/destination",
});

// Step 3: Provider
export const submitProvider = createApiThunk("submitProvider", {
  method: "post",
  url: "/provider",
});

// Step 4: Media
export const submitMedia = createApiThunk("submitMedia", {
  method: "post",
  url: "/media",
});
const initialState = {
  step1: { loading: false, error: null, data: null },
  step2: { loading: false, error: null, data: null },
  step3: { loading: false, error: null, data: null },
  step4: { loading: false, error: null, data: null },
};
const travelSlice = createSlice({
  name: "travel",
  initialState,
  reducers: {
    resetTravelState: () => initialState,
  },
  extraReducers: (builder) => {
    [submitCountry, submitDestination, submitProvider, submitMedia].forEach(
      (thunk, index) => {
        const stepKey = `step${index + 1}`;

        builder
          .addCase(thunk.pending, (state) => {
            state[stepKey].loading = true;
            state[stepKey].error = null;
          })
          .addCase(thunk.fulfilled, (state, action) => {
            state[stepKey].loading = false;
            state[stepKey].data = action.payload;
          })
          .addCase(thunk.rejected, (state, action) => {
            state[stepKey].loading = false;
            state[stepKey].error = action.payload?.message || "Something went wrong";
          });
      }
    );
  },
});

export const { resetTravelState } = travelSlice.actions;

export default travelSlice.reducer;