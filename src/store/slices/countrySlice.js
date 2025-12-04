import { createSlice } from "@reduxjs/toolkit";
import { createApiThunk } from "../genericThunk";

// --- Thunks ---
export const fetchCountries = createApiThunk("fetchCountries", { method: "get", url: "/countries" });
export const createCountry = createApiThunk("createCountry", { method: "post", url: "/countries" });
export const updateCountry = createApiThunk("updateCountry", { method: "put", url: "/countries/:id" });
export const deleteCountry = createApiThunk("deleteCountry", { method: "delete", url: "/countries/:id" });

// --- Slice ---
const countrySlice = createSlice({
  name: "countries",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    [fetchCountries, createCountry, updateCountry, deleteCountry].forEach((thunk) => {
      builder
        .addCase(thunk.pending, (state) => { state.loading = true; state.error = null; })
        .addCase(thunk.fulfilled, (state, action) => {
          state.loading = false;
          const type = thunk.typePrefix.split("/")[0];
          switch (type) {
            case "fetchCountries": state.list = action.payload; break;
            case "createCountry": state.list.push(action.payload); break;
            case "updateCountry": state.list = state.list.map(c => c._id === action.payload._id ? action.payload : c); break;
            case "deleteCountry": state.list = state.list.filter(c => c._id !== action.payload); break;
          }
        })
        .addCase(thunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    });
  },
});

export default countrySlice.reducer;
