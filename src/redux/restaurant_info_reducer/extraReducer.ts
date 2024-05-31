import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { GetRestaurantInfoThunk, UpdateRestaurantInfoThunk } from "./thunks";
import { RestaurantInfo, RestaurantInfoState } from "./types";


export const RestaurantInfoExtraReducer = (builder: ActionReducerMapBuilder<RestaurantInfoState>) => {
    builder
        .addCase(GetRestaurantInfoThunk.fulfilled, (state, action: PayloadAction<RestaurantInfo>) => {
            state.restaurantInfo = action.payload;
        })
        .addCase(UpdateRestaurantInfoThunk.fulfilled, (state, action: PayloadAction<RestaurantInfo | null>) => {
            if (action.payload) {
                state.restaurantInfo = action.payload;
            }
        })
}