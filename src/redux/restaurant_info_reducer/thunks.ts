import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { RestaurantInfo, UpdateRestaurantInfoDto } from "./types";
import { baseUrl, defaultImage } from "../../assets/constants";

const getRestaurantInfo = async function (conditions: { id: number }) {
    const response = await axios({
        url: `${baseUrl}/api/restaurant-infos/${conditions.id}?populate=*`,
        method: 'get'
    });
    const data = response.data.data;
    const attr = data.attributes;

    const result: RestaurantInfo =  {
        id: data.id,
        name: attr.name,
        address: attr.address,
        description: attr.description,
        openingTime: attr.openingTime,
        closingTime: attr.closingTime,
        isPublic: attr.isPublic,
        image: attr.image?.data ? `${baseUrl}${attr.image.data.attributes.url}` : defaultImage,
        mediumCheck: attr.mediumCheck.data.attributes.tag,
        restaurantInfoTags: attr.restaurantInfoTags.data.map((el: any) => el.attributes.tag)
    };

    return result;
}

export const GetRestaurantInfoThunk = createAsyncThunk<RestaurantInfo, { id: number }, { rejectValue: string }>(
    'get/restaurant-infos',
    getRestaurantInfo
);

export const UpdateRestaurantInfoThunk = createAsyncThunk<RestaurantInfo | null, UpdateRestaurantInfoDto, { rejectValue: string }> (
    'update/food-positions',
    async function (conditions, { rejectWithValue }): Promise<RestaurantInfo | null> {
        try {
            const data = new FormData();
            data.append('data', JSON.stringify({
                // id: conditions.id,
                name: conditions.name,
                address: conditions.address,
                openingTime: conditions.openingTime,
                closingTime: conditions.closingTime,
                mediumCheck: conditions.mediumCheck,
                description: conditions.description,
                isPublic: conditions.isPublic,
                restaurantInfoTags: conditions.restaurantInfoTags
            }));
            if (conditions.image) {
                // const file = new Blob([conditions.image], { type: conditions.image.type })
                data.append('files.image', conditions.image);
            }
            
            await axios({
                url: `${baseUrl}/api/restaurant-infos/${conditions.id}`,
                method: 'put',
                data
            });

            const restInfo = await getRestaurantInfo({ id: conditions.id });

            return restInfo;
        } catch(err: any) {
            if (isAxiosError(err)) {
                console.log('position axios error', err?.response?.data)
            }
        }

        return null;
    }
);