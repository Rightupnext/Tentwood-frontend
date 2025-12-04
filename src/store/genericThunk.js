// genericThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import api from "./api";

// Generic thunk creator
export const createApiThunk = (name, { method, url }) =>
  createAsyncThunk(name, async (data = {}, { rejectWithValue }) => {
    try {
      let response;

      if (method.toLowerCase() === "get") {
        response = await api.get(url, { params: data });
      } else {
        // Replace :id in dynamic URL
        const finalUrl = url.includes(":id") ? url.replace(":id", data.id) : url;

        response = await api[method.toLowerCase()](finalUrl, data);
      }

      // Show success notification if backend sent message
      if (response.data?.message) {
        notification.success({ message: response.data.message });
      }

      // For fetchMe, return user object directly if it exists
      return response.data.user || response.data;
    } catch (err) {
      // Extract proper backend message
      const backendMsg = err.response?.data?.error || err.response?.data?.message || err.message || "Something went wrong";

      // Show error notification
      notification.error({ message: backendMsg });

      // Pass structured error to rejected action
      return rejectWithValue({
        message: backendMsg,
        status: err.response?.status || 500,
        data: err.response?.data || null,
      });
    }
  });
