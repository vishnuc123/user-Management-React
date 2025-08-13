import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice'
import AdminAuthReducer from './Admin/AdminSlice'
export const Store = configureStore({
    reducer:{
        auth:authReducer,
        adminauth:AdminAuthReducer
    }
})

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;