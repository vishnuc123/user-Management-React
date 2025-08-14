import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../config/AxiosInterceptor";

export const getAdminDetails = createAsyncThunk(
    `admin/getAdmin`,
    async () => {
        const res = await axiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/admin/getAdmin`,{withCredentials:true})
        return res.data
    }
)