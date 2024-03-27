import {DietTag} from "./DietTag";
import {AllergyTag} from "./AllergyTag";
import {MenuSectionTag} from "./MenuSectionTag";

export enum VariationType {
  STANDARD,
  CUSTOM
}

export interface FoodVariation {
  // base variant info
  variationId: string;
  variationType: VariationType;
  variationName: string;
  price: number;
  weight: number;
  allowedDietsTags?: DietTag[];
  restrictedAllergyTags?: AllergyTag[];

  // extended variant info
  ingredients: string;
  proteins: number;
  fats: number;
  carbohydrates: number;
  calories: number;
  CFCB: string;
}

export interface FoodPositionInfo {
  id: string;
  restaurantId: string;
  name: string;
  image: any;
  isOnStartPage?: boolean;
  foodVariations: FoodVariation[];
  menuSectionTags: MenuSectionTag[];
}

export interface FoodPositionInOrderInfo extends FoodPositionInfo {
  selectedVariationId: string;
}