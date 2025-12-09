import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import api from "./api";

// Generic thunk creator
export const createApiThunk = (
  name,
  { method, url, onSuccessDispatch, isMultipart = false } // add isMultipart flag
) =>
  createAsyncThunk(name, async (data = {}, { rejectWithValue, dispatch }) => {
    try {
      let response;

      if (method.toLowerCase() === "get") {
        response = await api.get(url, { params: data });
      } else {
        // Replace :id in dynamic URL
        const finalUrl = url.includes(":id")
          ? url.replace(":id", data.id)
          : url;

        // genericThunk.js
        if (isMultipart) {
          response = await api[method.toLowerCase()](finalUrl, data, {
            headers: {
              "Content-Type": "multipart/form-data", // optional; browser sets boundary automatically
            },
          });
        } else {
          // Normal JSON request
          response = await api[method.toLowerCase()](finalUrl, data);
        }
      }

      // Success notification
      if (response.data?.message) {
        notification.success({ message: response.data.message });
      }

      // Auto dispatch extra thunk if provided
      if (onSuccessDispatch) {
        dispatch(onSuccessDispatch());
      }

      return response.data.user || response.data;
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
