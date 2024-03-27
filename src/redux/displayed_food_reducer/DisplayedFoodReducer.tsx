import { FoodPositionInOrderInfo, FoodPositionInfo } from "../../assets/constants/content_types/FoodInfo";


export interface DisplayedFoodState {
  food: FoodPositionInfo | FoodPositionInOrderInfo |undefined
}

enum DisplayedFoodActionTypes {
  SET_DISPLAYED_FOOD = 'SET_DISPLAYED_FOOD',
  CLEAR_DISPLAYED_FOOD = 'CLEAR_DISPLAYED_FOOD',
}

const initialState: DisplayedFoodState = {
  food: undefined
};

export const setDisplayedFood = (newFoodToDisplay: FoodPositionInfo | FoodPositionInOrderInfo) => ({
  type: DisplayedFoodActionTypes.SET_DISPLAYED_FOOD,
  newFoodToDisplay: newFoodToDisplay
});

export const clearDisplayedFood = () => ({
  type: DisplayedFoodActionTypes.CLEAR_DISPLAYED_FOOD,
});

const displayedFoodReducer = (
  state = initialState,
  action: ReturnType<typeof setDisplayedFood> | ReturnType<typeof clearDisplayedFood>
): DisplayedFoodState => {
  switch (action.type) {
    case DisplayedFoodActionTypes.SET_DISPLAYED_FOOD:
      return { food: (action as ReturnType<typeof setDisplayedFood>).newFoodToDisplay };
    case DisplayedFoodActionTypes.CLEAR_DISPLAYED_FOOD:
      return { food: undefined };
    default:
      return state;
  }
};

export default displayedFoodReducer