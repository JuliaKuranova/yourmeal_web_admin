import { createSlice } from "@reduxjs/toolkit";
import { TagsState } from "./types";
import { tagsExtraReducer } from "./extraReducer";


const initialState: TagsState = {
    dietTags: [],
    allergyTags: [],
    menuSectionTags: [],
    restarauntInfoTags: [],
    mediumCheckTags: [],
}

const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {},
    extraReducers: tagsExtraReducer
});

const tagsReducer = tagsSlice.reducer;

export default tagsReducer;