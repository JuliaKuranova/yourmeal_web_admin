import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { IAllergyTag, IDietTag, IMediumCheckTag, IMenuSectionTag, IRestarauntInfoTag, TagsState } from "./types";
import { GetAllergyTagsThunk, GetDietTagsThunk, GetMediumCheckTagsThunk, GetMenuSectionTagsThunk, GetRestarauntInfoTagsThunk } from "./thunks";

export const tagsExtraReducer = (builder: ActionReducerMapBuilder<TagsState>) => {
    builder
        .addCase(GetDietTagsThunk.fulfilled, (state, action: PayloadAction<IDietTag[]>) => {
            state.dietTags = action.payload;
        })

        .addCase(GetAllergyTagsThunk.fulfilled, (state, action: PayloadAction<IAllergyTag[]>) => {
            state.allergyTags = action.payload;
        })

        .addCase(GetMenuSectionTagsThunk.fulfilled, (state, action: PayloadAction<IMenuSectionTag[]>) => {
            state.menuSectionTags = action.payload;
        })

        .addCase(GetRestarauntInfoTagsThunk.fulfilled, (state, action: PayloadAction<IRestarauntInfoTag[]>) => {
            state.restarauntInfoTags = action.payload;
        })

        .addCase(GetMediumCheckTagsThunk.fulfilled, (state, action: PayloadAction<IMediumCheckTag[]>) => {
            state.mediumCheckTags = action.payload;
        })
}