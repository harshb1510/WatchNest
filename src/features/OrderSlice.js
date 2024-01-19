import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: null,
  error: null,
};


export const ordersFetch = createAsyncThunk(
  "orders/ordersFetch",
  async (id) => {
    const response = await axios.get(`${process.env.URL}/user/${id}/placedOrders`);
    return response?.data;
  }
);

const isRejectedAction = (action) => action.type.endsWith("rejected");

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ordersFetch.pending, (state) => {
        state.status = "pending";

      })
      .addCase(ordersFetch.fulfilled, (state, action) => {
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

export default orderSlice.reducer;
