import { createSlice } from "@reduxjs/toolkit";
import { createApiThunk } from "../genericThunk";

// --- Thunks ---
export const fetchDestinations = createApiThunk("fetchDestinations", {
  method: "get",
  url: "/destinations",
});
export const createDestination = createApiThunk("createDestination", {
  method: "post",
  url: "/destinations",
});
export const updateDestination = createApiThunk("updateDestination", {
  method: "put",
  url: "/destinations/:id",
});
export const deleteDestination = createApiThunk("deleteDestination", {
  method: "delete",
  url: "/destinations/:id",
  onSuccessDispatch: fetchDestinations,
});

// --- Slice ---
const destinationSlice = createSlice({
  name: "destinations",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    [fetchDestinations, createDestination, updateDestination, deleteDestination].forEach(
      (thunk) => {
        builder
          .addCase(thunk.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(thunk.fulfilled, (state, action) => {
            state.loading = false;
            const type = thunk.typePrefix.split("/")[0];

            switch (type) {
              case "fetchDestinations":
                state.list = action.payload;
                break;
              case "createDestination":
                state.list.push(action.payload.destination);
                break;
              case "updateDestination":
                const updatedDestination = action.payload.updated;
                state.list = state.list.map((d) =>
                  d._id === updatedDestination._id ? updatedDestination : d
                );
                break;
              case "deleteDestination":
                const deletedId = action.meta.arg;
                state.list = state.list.filter((d) => d._id !== deletedId);
                break;
            }
          })
          .addCase(thunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
      }
    );
  },
});

export default destinationSlice.reducer;
