import {DietTag} from "./DietTag";
import {AllergyTag} from "./AllergyTag";
import {MenuSectionTag} from "./MenuSectionTag";

export enum VariationType {
  STANDARD = 'STANDARD',
  CUSTOM = 'CUSTOM'
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
  description?: string;
  ingredients: string;
  proteins: number;
  fats: number;
  carbohydrates: number;
  calories: number;
  CFCB: string;

  proteinsHundred?: number;
  fatsHundred?: number;
  carbohydratesHundred?: number;
  caloriesHundred?: number;
}

export interface FoodPositionInfo {
  id: string;
  restaurantId: string;
  name: string;
  inMenu?: boolean;
  onMain?: boolean;
  selectedVariationName?: string;
  selectedVariationType?: string;
  image: any;
  isOnStartPage?: boolean;
  foodVariations: FoodVariation[];
  menuSectionTags: MenuSectionTag[];
  groupPosition?: string;
  additionalGroup?: string;
}

export interface FoodPositionInOrderInfo extends FoodPositionInfo {
  positionInOrderId?: number;
  selectedVariationId: string;
  price?: number;
  count?: number;
}