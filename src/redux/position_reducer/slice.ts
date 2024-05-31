import { createSlice } from "@reduxjs/toolkit";
import { FoodPositionState } from "./types";
import { positionsExtraReducer } from "./extraReducer";

const initialState: FoodPositionState = {
    positions: [],
}

const positionsSlice = createSlice({
    name: 'positions',
    initialState,
    reducers: {},
    extraReducers: positionsExtraReducer
});

const foodPositionsReducer = positionsSlice.reducer;

export default foodPositionsReducer;