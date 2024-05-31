import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { Order, OrdersState } from "./types";
import { DeleteOrderItemThunk, GetOrdersThunk, UpdateOrderThunk } from "./thunks";

export const ordersExtraReducer = (builder: ActionReducerMapBuilder<OrdersState>) => {
    builder
        // .addCase(GetOneOrderThunk.fulfilled, (state, action: PayloadAction<Order>) => {
        //     state.orders = action.payload;
        // })
        
        .addCase(GetOrdersThunk.fulfilled, (state, action: PayloadAction<Order[]>) => {
            state.orders = action.payload;
        })

        .addCase(DeleteOrderItemThunk.fulfilled, (state, action: PayloadAction<number>) => {
            state.orders = state.orders.filter(order => order.id !== action.payload);
        })

        .addCase(UpdateOrderThunk.fulfilled, (state, action: PayloadAction<Order>) => {
            for (let i = 0; i < state.orders.length; i++) {
                if (state.orders[i].id === action.payload.id) {
                    state.orders[i] = action.payload;
                    break;
                }
            }
        })
}