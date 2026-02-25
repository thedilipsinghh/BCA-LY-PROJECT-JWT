import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/auth.api";

import authSlice from "./slice/auth.slice"
import { TypeOf } from "zod/v3";
import { useSelector } from "react-redux";
import { adminApi } from "./apis/admin.api";
const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        auth: authSlice
    },

    middleware: def => def().concat(authApi.middleware, adminApi.middleware)
})

export type RootType = ReturnType<typeof reduxStore.getState>
export const useAppSelector = useSelector.withTypes<RootType>()
export default reduxStore