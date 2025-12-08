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
  onSuccessDispatch: fetchDestinations,
});

export const updateDestination = createApiThunk("updateDestination", {
  method: "put",
  url: "/destinations/:id",
  onSuccessDispatch: fetchDestinations,
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
    [
      fetchDestinations,
      createDestination,
      updateDestination,
      deleteDestination,
    ].forEach((thunk) => {
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
              state.list = action.payload.data;
              break;

            case "createDestination":
              // If backend returns `destination` object with `_id`
              state.list.push(action.payload.destination || action.payload);
              break;

            case "updateDestination":
              const updated = action.payload.data;
              state.list = state.list.map((d) =>
                d._id === updated._id ? updated : d
              );
              break;

            case "deleteDestination":
              const id = action.meta.arg;
              state.list = state.list.filter((d) => d._id !== id);
              break;
          }
        })
        .addCase(thunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    });
  },
});

export default destinationSlice.reducer;
