import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { TUserDetails } from "../../types/TStoreInitialState";
import axiosInstance from "../../config/AxiosInterceptor";

export const FetchUserDetails = createAsyncThunk(
    'auth/fetchUserDetails',
    async () => {
        const res = await axiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/auth/getUser`,{withCredentials:true})
        console.log('User data from /auth/getUser:', res.data);
        return res.data as TUserDetails
    }
)