import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAdminDetails = createAsyncThunk(
    `admin/getAdmin`,
    async () => {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/getAdmin`)
        return res.data
    }
)