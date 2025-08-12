import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TauthState, TUserDetails } from "../../types/TStoreInitialState";
import { FetchUserDetails } from "./AuthThunk";

const initialState: TauthState = {
    user: null,
    loading: false,
    isAuthenticated: false,
    error: "",
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state: TauthState) => {
            state.loading = true
            state.error = "";
        },
        loginSuccess: (state: TauthState, action: PayloadAction<TUserDetails>) => {
            state.loading = false
            state.error = ""
            state.isAuthenticated = true
            state.user = action.payload
        },
        loginFailure: (state: TauthState, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload;
            state.isAuthenticated = false
        },
        logout: (state: TauthState) => {
            state.loading = false
            state.user = null,
                state.isAuthenticated = false
        }


    },
    extraReducers: (builder) => {
        builder
            .addCase(FetchUserDetails.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(FetchUserDetails.fulfilled, (state, action: PayloadAction<TUserDetails>) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(FetchUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch user details";
                state.isAuthenticated = false;
            });
    }

})

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions
export default authSlice.reducer;