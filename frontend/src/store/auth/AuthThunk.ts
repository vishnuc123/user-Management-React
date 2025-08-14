import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/AxiosInterceptor";

export const FetchUserDetails = createAsyncThunk(
  "auth/fetchUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `${import.meta.env.VITE_BACKEND_URL}/auth/getUser`,
        { withCredentials: true }
      );

      console.log("User data from /auth/getUser:", res.data);

      if (!res.data.user) {
        return rejectWithValue("User not found");
      }

      return res.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error fetching user");
    }
  }
);
