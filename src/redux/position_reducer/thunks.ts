import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, isAxiosError } from "axios";
import { FoodPositionInfo, FoodVariation } from "../../assets/constants/content_types/FoodInfo";
import { baseUrl, defaultImage } from "../../assets/constants";
import { SaveFoodPositionDto, SaveFoodVariationDto, UpdateFoodPositionDto, UpdateFoodVariationDto } from "./types";


function convertVariationDto(variation: Omit<UpdateFoodVariationDto, 'variationId'>) {
    return {
        data: {
            variationName: variation.variationName,
            variationType: variation.variationType,
            price: variation.price,
            weight: variation.weight,
            ingredients: variation.ingredients,
            description: variation.description,
            proteinsHundred: variation.proteinsHundred,
            fatsHundred: variation.fatsHundred,
            carbohydratesHundred: variation.carbohydratesHundred,
            caloriesHundred: variation.caloriesHundred,
            proteins: variation.proteins,
            fats: variation.fats,
            carbohydrates: variation.carbohydrates,
            calories: variation.calories,
            CFCB: variation.CFCB,
            restrictedAllergyTags: variation.restrictedAllergyTags,
            allowedDietsTags: variation.allowedDietsTags
        }
    };
}

function convertPositionDto(conditions: Omit<UpdateFoodPositionDto, 'id'>, variationIds?: number[]) {
    const data = new FormData();

    console.log('data', {
        name: conditions.name,
        restaurantId: conditions.restaurantId,
        foodVariations: variationIds,
        groupPosition: conditions.groupPosition,
        additionalGroup: conditions.additionalGroup
        // menuSectionTags: conditions.menuSectionTags,
    })

    data.append('data', JSON.stringify({
        name: conditions.name,
        restaurantId: conditions.restaurantId,
        foodVariations: variationIds,
        groupPosition: conditions.groupPosition,
        additionalGroup: conditions.additionalGroup
        // menuSectionTags: conditions.menuSectionTags,
    }));
    if (conditions.image) {
        data.append('files.image', conditions.image)
    }

    return data;
}

async function saveVariation(variation: SaveFoodVariationDto): Promise<number | undefined> {
    let hasCandidate;  // Проверка на наличие записи в базе данных

    try {
        if (variation.variationId) {
            await axios({
                url: `${baseUrl}/api/food-variations/${variation.variationId}`
            });

            hasCandidate = true;
        } else {
            hasCandidate = false;
        }
    } catch (err) {
        hasCandidate = false;
    }

    try {
        const response = await axios({
            url: `${baseUrl}/api/food-variations/${hasCandidate ? variation.variationId : ''}`,
            method: hasCandidate ? 'put' : 'post',
            data: convertVariationDto(variation)
        });

        console.log('response data', response.data)

        return response.data.data.id;
    } catch(err: any) {
        if (isAxiosError(err)) {
            console.log('variation axios error', err?.response?.data)
        }
    }
}

async function savePosition(conditions: SaveFoodPositionDto, variationIds: number[]): Promise<number> {
    let hasCandidate;  // Проверка на наличие записи в базе данных
    let result = 0;

    try {
        if (conditions.id) {
            await axios({
                url: `${baseUrl}/api/food-positions/${conditions.id}`
            });

            hasCandidate = true;
        } else {
            hasCandidate = false;
        }
    } catch (err) {
        hasCandidate = false;
    }

    try {
        if (variationIds.length === 0) {
            throw new Error('no variations found')
        }
        const response = await axios({
            url: `${baseUrl}/api/food-positions/${hasCandidate ? conditions.id : ''}`,
            method: hasCandidate ? 'put' : 'post',
            data: convertPositionDto(conditions, variationIds)
        });
        result = response.data.data.id;
    } catch(err: any) {
        console.log(err.message)
        if (isAxiosError(err)) {
            console.log('variation axios error', err?.response?.data)
        }
    }

    return result;
}


function convertPosition(el: any) {
    // const el = el.attributes;
    const position: FoodPositionInfo = {
        id: el.id,
        name: el.attributes.name,
        image: el.attributes.image?.data ? `${baseUrl}${el.attributes.image.data.attributes.url}` : defaultImage,
        inMenu: el.attributes.inMenu,
        onMain: el.attributes.onMain,
        restaurantId: '1',
        menuSectionTags: el.attributes.menuSectionTags?.data?.map((t: any) => t.attributes.tag) || [],
        groupPosition: el.attributes.groupPosition,
        additionalGroup: el.attributes.additionalGroup,
        foodVariations: el.attributes.foodVariations?.data?.map((v: any): FoodVariation => ({
            variationId: v.id,
            variationName: v.attributes.variationName,
            variationType: v.attributes.variationType,
            price: v.attributes.price,
            weight: v.attributes.weight,
            ingredients: v.attributes.ingredients,
            description: v.attributes.description,
            proteins: v.attributes.proteins,
            fats: v.attributes.fats,
            carbohydrates: v.attributes.carbohydrates,
            calories: v.attributes.calories,
            proteinsHundred: v.attributes.proteinsHundred,
            fatsHundred: v.attributes.fatsHundred,
            carbohydratesHundred: v.attributes.carbohydratesHundred,
            caloriesHundred: v.attributes.caloriesHundred,
            CFCB: v.attributes.CFCB,
            restrictedAllergyTags: v.attributes?.restrictedAllergyTags?.data?.map((t: any) => t.attributes.tag) || [],
            allowedDietsTags: v.attributes?.allowedDietsTags?.data?.map((t: any) => t.attributes.tag) || [],
        }))
    };

    return position;
}


export const GetFoodPositionThunk = createAsyncThunk<FoodPositionInfo[], undefined, { rejectValue: string}> (
    'get/food-positions',
    async function (conditions, { rejectWithValue }) {
        const response = await axios({
            url: `${baseUrl}/api/food-positions?populate=image,menuSectionTags,foodVariations.allowedDietsTags,foodVariations.restrictedAllergyTags`,
            method: 'get'
        });
        const dataArray = response.data.data;
        // console.log('poresp', dataArray)
        
        const positions: FoodPositionInfo[] = dataArray.map(convertPosition) ;

        return positions;
    }
);

export const CreateFoodPositionThunk = createAsyncThunk<void, UpdateFoodPositionDto, { rejectValue: string }> (
    'create/food-positions',
    async function (conditions, { rejectWithValue }): Promise<void> {
        conditions.foodVariations.forEach(async variation => {
            try {
                await axios({
                    url: `${baseUrl}/api/food-variations`,
                    method: 'post',
                    data: convertVariationDto(variation)
                });
            } catch(err: any) {
                if (isAxiosError(err)) {
                    console.log('variation axios error', err?.response?.data)
                }
            }
        });

        try {
            await axios({
                url: `${baseUrl}/api/food-positions`,
                method: 'post',
                data: convertPositionDto(conditions)
            });
        } catch(err: any) {
            if (isAxiosError(err)) {
                console.log('position axios error', err?.response?.data)
            }
        }
    }
);

export const UpdateFoodPositionThunk = createAsyncThunk<void, UpdateFoodPositionDto, { rejectValue: string }> (
    'update/food-positions',
    async function (conditions, { rejectWithValue }): Promise<void> {
        conditions.foodVariations.forEach(async variation => {
            try {
                await axios({
                    url: `${baseUrl}/api/food-variations/${variation.variationId}`,
                    method: 'put',
                    data: convertVariationDto(variation)
                });
            } catch(err: any) {
                if (isAxiosError(err)) {
                    console.log('variation axios error', err?.response?.data)
                }
            }
        });

        try {
            await axios({
                url: `${baseUrl}/api/food-positions/${conditions.id}`,
                method: 'put',
                data: convertPositionDto(conditions)
            });
        } catch(err: any) {
            if (isAxiosError(err)) {
                console.log('position axios error', err?.response?.data)
            }
        }
    }
);

async function getPositionById(id: number): Promise<FoodPositionInfo> {
    const response = await axios ({
        url: `${baseUrl}/api/food-positions/${id}?populate=image,menuSectionTags,foodVariations.allowedDietsTags,foodVariations.restrictedAllergyTags`,
        method: 'get'
    });

    const data = response.data.data;

    const result = convertPosition(data)

    return result

}

export const SaveFoodPositionThunk = createAsyncThunk<FoodPositionInfo, SaveFoodPositionDto, { rejectValue: string }> (
    'save/food-position',
    async (conditions): Promise<FoodPositionInfo> => {
        const variationIds: number[] = [];
        for (let variation of conditions.foodVariations) {
            const variationId = await saveVariation(variation);
            if (variationId) {
                variationIds.push(variationId);
            }
        }

        const savedId = await savePosition(conditions, variationIds);

        const updateFoodPosition = await getPositionById(savedId);

        return updateFoodPosition
    }
)



export const DeleteFoodPositionThunk = createAsyncThunk<number, number, { rejectValue: string }> (
    'delete/food-positions',
    async function (conditions, { rejectWithValue }): Promise<number> {
        console.log('delete position', conditions)
        await axios({
            url: `${baseUrl}/api/food-positions/${conditions}`,
            method: 'delete'
        });

        return conditions;
    }
)

export const ChangeFoodPositionTogglersThunk = createAsyncThunk<void, { id: number, inMenu?: boolean, onMain?: boolean }>(
    'changeInMenu/food-positions',
    async function (conditions): Promise<void> {
        console.log('change menu', conditions.id, conditions.inMenu);
        console.log('change main', conditions.id, conditions.onMain);
        await axios({
            url: `${baseUrl}/api/food-positions/${conditions.id}`,
            method: 'put',
            data: {
                data: {
                    inMenu: conditions.inMenu,
                    onMain: conditions.onMain
                }
            }
        });
    }
)