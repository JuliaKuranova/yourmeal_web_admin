import { createSlice } from "@reduxjs/toolkit";
import { ordersExtraReducer } from "./extraReducer";
import { OrdersState } from "./types";

const initialState: OrdersState = {
    orders: [],
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: ordersExtraReducer
});

const ordersReducer = ordersSlice.reducer;

export default ordersReducer;