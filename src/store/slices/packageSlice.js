import { createSlice } from "@reduxjs/toolkit";
import { createApiThunk } from "../genericThunk";

// ----------------------------------
// 🌍 API Thunks
// ----------------------------------
export const fetchPackages = createApiThunk("fetchPackages", {
  method: "get",
  url: "/packages",
});
export const fetchPackageById = createApiThunk("fetchPackageById", {
  method: "get",
  url: "/packages/:id",
});

export const createPackage = createApiThunk("createPackage", {
  method: "post",
  url: "/packages",
  isMultipart: true, // important for FormData
});

export const updatePackage = createApiThunk("updatePackage", {
  method: "put",
  url: "/packages/:id",
  isMultipart: true,
});

export const deletePackage = createApiThunk("deletePackage", {
  method: "delete",
  url: "/packages/:id",
});

// ----------------------------------
// 📦 Slice
// ----------------------------------
const packageSlice = createSlice({
  name: "packages",
  initialState: {
    list: [],
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    const thunks = [
      fetchPackages,
      createPackage,
      updatePackage,
      deletePackage,
      fetchPackageById,
    ];

    thunks.forEach((thunk) => {
      builder
        .addCase(thunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })

        .addCase(thunk.fulfilled, (state, action) => {
          state.loading = false;

          const type = thunk.typePrefix.split("/")[0];

          switch (type) {
            case "fetchPackages":
              state.list = action.payload.data; // backend returns { success, data: [] }
              break;

            case "createPackage":
              state.list.push(action.payload.data);
              break;
            case "fetchPackageById":
              state.selected = action.payload.data || null; // <-- store the package here
              break;
            case "updatePackage": {
              const updated = action.payload.data;
              state.list = state.list.map((p) =>
                p._id === updated._id ? updated : p
              );
              break;
            }

            case "deletePackage": {
              const deletedId = action.meta.arg;
              state.list = state.list.filter((p) => p._id !== deletedId);
              break;
            }
          }
        })

        .addCase(thunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || "Something went wrong";
        });
    });
  },
});

export default packageSlice.reducer;
