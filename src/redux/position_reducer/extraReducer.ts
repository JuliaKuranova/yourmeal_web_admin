import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { FoodPositionState, SaveFoodPositionDto } from "./types";
import { FoodPositionInfo } from "../../assets/constants/content_types/FoodInfo";
import { DeleteFoodPositionThunk, GetFoodPositionThunk, SaveFoodPositionThunk } from "./thunks";

export const positionsExtraReducer = (builder: ActionReducerMapBuilder<FoodPositionState>) => {
    builder
        .addCase(GetFoodPositionThunk.fulfilled, (state, action: PayloadAction<FoodPositionInfo[]>) => {
            state.positions = action.payload;
        })

        .addCase(SaveFoodPositionThunk.fulfilled, (state, action: PayloadAction<FoodPositionInfo>) => {

            for (let i = 0; i < state.positions.length; i++) {
                if (state.positions[i].id === action.payload.id) {
                    state.positions[i] = action.payload;
                    break;
                }
            }
        })

        .addCase(DeleteFoodPositionThunk.fulfilled, (state, action: PayloadAction<number>) => {
            state.positions = state.positions.filter(pos => Number(pos.id) != action.payload);
        })
}