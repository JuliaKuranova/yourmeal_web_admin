import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAllergyTag, IDietTag, IMediumCheckTag, IMenuSectionTag, IRestarauntInfoTag } from "./types";
import axios from "axios";
import { baseUrl } from "../../assets/constants";

export const GetDietTagsThunk = createAsyncThunk<IDietTag[], undefined, { rejectValue: string }>(
    'get/diet-tags',
    async function (conditions, { rejectWithValue }) {
        const response = await axios({
            url: `${baseUrl}/api/diet-tags`,
            method: 'get'
        });
        const dataArray = response.data.data;
        const dietTags = dataArray.map((el: any) => ({
            id: el.id,
            tag: el.attributes.tag
        }));

        return dietTags;
    }
);

export const GetAllergyTagsThunk = createAsyncThunk<IAllergyTag[], undefined, { rejectValue: string }>(
    'get/allergy-tags',
    async function (conditions, { rejectWithValue }) {
        const response = await axios({
            url: `${baseUrl}/api/allergy-tags`,
            method: 'get'
        });
        const dataArray = response.data.data;
        const allergyTags = dataArray.map((el: any) => ({
            id: el.id,
            tag: el.attributes.tag
        }));

        return allergyTags;
    }
);

export const GetMenuSectionTagsThunk = createAsyncThunk<IMenuSectionTag[], undefined, { rejectValue: string }>(
    'get/menu-section-tags',
    async function (conditions, { rejectWithValue }) {
        const response = await axios({
            url: `${baseUrl}/api/menu-section-tags`,
            method: 'get'
        });
        const dataArray = response.data.data;
        const menuSectionTags = dataArray.map((el: any) => ({
            id: el.id,
            tag: el.attributes.tag
        }));

        return menuSectionTags;
    }
);


export const GetRestarauntInfoTagsThunk = createAsyncThunk<IRestarauntInfoTag[], undefined, { rejectValue: string }>(
    'get/restaraunt-info-tags',
    async function (conditions, { rejectWithValue }) {
        const response = await axios({
            url: `${baseUrl}/api/restaraunt-info-tags`,
            method: 'get'
        });
        const dataArray = response.data.data;
        const RestarauntInfoTags = dataArray.map((el: any) => ({
            id: el.id,
            tag: el.attributes.tag
        }));

        return RestarauntInfoTags;
    }
);

export const GetMediumCheckTagsThunk = createAsyncThunk<IMediumCheckTag[], undefined, { rejectValue: string }>(
    'get/medium-checks',
    async function (conditions, { rejectWithValue }) {
        const response = await axios({
            url: `${baseUrl}/api/medium-checks`,
            method: 'get'
        });
        const dataArray = response.data.data;
        const MediumCheckTags = dataArray.map((el: any) => ({
            id: el.id,
            tag: el.attributes.tag
        }));

        return MediumCheckTags;
    }
);