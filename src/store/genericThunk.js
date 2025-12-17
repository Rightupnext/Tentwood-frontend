import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import api from "./api";

// Generic thunk creator
export const createApiThunk = (
  name,
  { method, url, onSuccessDispatch, isMultipart = false } // add isMultipart flag
) =>
  createAsyncThunk(name, async (payload = {}, { rejectWithValue, dispatch }) => {
    try {
      let response;
      const lower = method.toLowerCase();

      const finalUrl = url.includes(":id")
        ? url.replace(":id", payload.id)
        : url;

      // ---------------- GET ----------------
      if (lower === "get") {
        response = await api.get(finalUrl);
      }

      // ---------------- MULTIPART ----------------
      else if (isMultipart) {
        response = await api[lower](finalUrl, payload.data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      // ---------------- JSON ----------------
      else {
        response = await api[lower](finalUrl, payload);
      }

      // Success notification
      if (response.data?.message) {
        notification.success({ message: response.data.message });
      }

      // Auto dispatch extra thunk if provided
      if (onSuccessDispatch) {
        dispatch(onSuccessDispatch());
      }

      return response.data;
    } catch (err) {
      const backendMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Something went wrong";

      notification.error({ message: backendMsg });

      return rejectWithValue({
        message: backendMsg,
        status: err.response?.status || 500,
        data: err.response?.data || null,
      });
    }
  });
