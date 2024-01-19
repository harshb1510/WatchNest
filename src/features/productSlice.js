import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: null,
  error: null,
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    const response = await axios.get(`https://watchnest.onrender.com/api/products`);
    return response?.data;
  }
);

const isRejectedAction = (action) => action.type.endsWith("rejected");

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsFetch.pending, (state) => {
        state.status = "pending";
      })
      .addCase(productsFetch.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addMatcher(
        isRejectedAction,
        (state, action) => {
          state.status = "rejected";
        }
      );
  },
});

export default productsSlice.reducer;
