import { createSlice } from "@reduxjs/toolkit";
import { createApiThunk } from "../genericThunk";

// --- User CRUD Thunks ---
export const fetchUsers = createApiThunk("fetchUsers", {
  method: "get",
  url: "/users",
});
export const createUser = createApiThunk("createUser", {
  method: "post",
  url: "/users/register",
});
export const updateUser = createApiThunk("updateUser", {
  method: "put",
  url: "/users/:id",
});
export const deleteUser = createApiThunk("deleteUser", {
  method: "delete",
  url: "/users/:id",
});

// --- Auth Thunks ---
export const loginUser = createApiThunk("loginUser", {
  method: "post",
  url: "/users/login",
});
export const logOutUser = createApiThunk("logOutUser", {
  method: "post",
  url: "/users/logout",
});
export const registerUser = createApiThunk("registerUser", {
  method: "post",
  url: "/users/register",
});
export const fetchMe = createApiThunk("fetchMe", {
  method: "get",
  url: "/users/data/me",
});

// --- Slice ---
const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [], // All users
    auth: {
      user: null, // logged-in user object
      token: localStorage.getItem("token") || null,
    },
    loading: {
      fetchUsers: false,
      createUser: false,
      updateUser: false,
      deleteUser: false,
      loginUser: false,
      registerUser: false,
      fetchMe: false,
      logOutUser: false,
    },
    error: {}, // e.g., { fetchUsers: null, loginUser: null }
  },
  reducers: {
    logout: (state) => {
      state.auth.user = null;
      state.auth.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // Handle standard CRUD thunks
    const thunks = [
      fetchUsers,
      createUser,
      updateUser,
      deleteUser,
      loginUser,
      registerUser,
      logOutUser,
    ];
    thunks.forEach((thunk) => {
      const type = thunk.typePrefix.split("/")[0];
      builder
        .addCase(thunk.pending, (state) => {
          state.loading[type] = true;
          state.error[type] = null;
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state.loading[type] = false;
          switch (type) {
            case "fetchUsers":
              state.list = action.payload;
              break;
            case "createUser":
              state.list.push(action.payload);
              break;
            case "updateUser":
              state.list = state.list.map((u) =>
                u._id === action.payload._id ? action.payload : u
              );
              break;
            case "deleteUser":
              state.list = state.list.filter(
                (u) => u._id !== action.payload._id
              );
              break;
            case "loginUser":
              state.auth.user = action.payload.user; // ✅ store only user
              state.auth.token = action.payload.token;
              break;
            case "registerUser":
              state.list.push(action.payload);
              break;
            case "logOutUser":
              state.auth.user = null;
              state.auth.token = null;
              localStorage.removeItem("token");
              break;
            default:
              break;
          }
        })
        .addCase(thunk.rejected, (state, action) => {
          state.loading[type] = false;
          state.error[type] = action.payload?.message || "Something went wrong";
        });
    });

    // --- fetchMe special handling ---
    builder
      .addCase(fetchMe.pending, (state) => {
        state.loading.fetchMe = true;
        state.error.fetchMe = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading.fetchMe = false;
        state.auth.user = action.payload.user; // ✅ unwrap user
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.loading.fetchMe = false;
        state.auth.user = null;
        state.error.fetchMe = action.payload?.message || "FetchMe failed";
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
