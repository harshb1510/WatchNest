import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/productSlice"

export const store = configureStore({
    reducer:todoReducer
})