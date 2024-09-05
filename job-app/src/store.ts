import { configureStore } from "@reduxjs/toolkit";
import { opportunityApi } from "./app/features/api";

export const store = configureStore({
    reducer:{
        [opportunityApi.reducerPath] : opportunityApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(opportunityApi.middleware)
})