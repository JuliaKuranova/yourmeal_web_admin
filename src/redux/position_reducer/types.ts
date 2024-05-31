import { FoodPositionInfo, FoodVariation } from "../../assets/constants/content_types/FoodInfo";

export interface FoodPositionState {
    positions: FoodPositionInfo[]
}

export interface UpdateFoodVariationDto extends Omit<FoodVariation, 'allowedDietsTags' |  'restrictedAllergyTags'> {
    allowedDietsTags: number[];
    restrictedAllergyTags: number[];
}

export interface UpdateFoodPositionDto extends Omit<FoodPositionInfo, 'menuSectionTags' | 'foodVariations'> {
    // menuSectionTags: number[];
    foodVariations: UpdateFoodVariationDto[];
}

// export interface CreateFoodVariationDto extends Omit<UpdateFoodVariationDto, 'variationId'> {

// }

// export interface CreateFoodPositionDto extends Omit<UpdateFoodPositionDto, 'id'> {

// }

export interface SaveFoodVariationDto extends Omit<UpdateFoodVariationDto, 'variationId'> {
    variationId?: string | number;
}

export interface SaveFoodPositionDto extends Omit<UpdateFoodPositionDto, 'id'> {
    id?: string | number;
}