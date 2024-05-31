import { createSlice } from "@reduxjs/toolkit";
import { RestaurantInfoExtraReducer } from "./extraReducer";
import { RestaurantInfoState } from "./types";
import { defaultImage } from "../../assets/constants";


const initialState: RestaurantInfoState = {
    restaurantInfo: undefined
    // restaurantInfo: {
    //     name: '',
    //     address: '',
    //     description: '',
    //     openingTime: '',
    //     closingTime: '',
    //     isPublic: false,
    //     mediumCheck: '',
    //     restaurantInfoTags: [],
    //     image: defaultImage
    // },
}

const restaurantInfoSlice = createSlice({
    name: 'RestaurantInfo',
    initialState,
    reducers: {},
    extraReducers: RestaurantInfoExtraReducer
});

const restaurantInfoReducer = restaurantInfoSlice.reducer;

export default restaurantInfoReducer;