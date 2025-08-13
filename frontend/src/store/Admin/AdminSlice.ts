import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TAdminState } from "../../types/TadminState";
import { getAdminDetails } from "./AdminAuthThunk";


 const initialAdminState:TAdminState = {
    isloading:false,
    isAuthenticated:false,
    isError : ""
}

export const AdminAuthSlice = createSlice({
    name:"adminAuth",
    initialState:initialAdminState,
    reducers:{
        AdminLoginStart : (state:TAdminState) => {
            state.isloading = true
            state.isAuthenticated=false
        },
        AdminLoginSuccess : (state:TAdminState) => {
            state.isloading = false,
            state.isAuthenticated = true
            state.isError = ""
        },
        AdminLoginFailure : (state:TAdminState,action:PayloadAction<string>) => {
            state.isloading = false,
            state.isAuthenticated = false
            state.isError = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAdminDetails.pending,(state) => {
            state.isloading= true
        })
        .addCase(getAdminDetails.fulfilled,(state) => {
            state.isAuthenticated = true
            state.isloading = false
            state.isError = ""
        })
        .addCase(getAdminDetails.rejected,(state,action) => {
            state.isloading = false,
            state.isAuthenticated = false,
            state.isError = action.error.message || "data fetching failed"
        })
    }
})

export const {AdminLoginStart,AdminLoginSuccess,AdminLoginFailure} = AdminAuthSlice.actions
export default AdminAuthSlice.reducer