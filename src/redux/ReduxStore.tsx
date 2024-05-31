import {combineReducers, configureStore} from "@reduxjs/toolkit";
import displayedFoodReducer, { DisplayedFoodState } from "./displayed_food_reducer/DisplayedFoodReducer";
// import orderReducer, { OrderState } from "./current_order_reducer/CurrentOrderReducer";
import userInfoReducer, { UserInfoState } from "./user_info_reducer/UserInfoReducer";
import profileBottomSheetReducer, { ProfileBottomSheetState } from "./profile_bottom_sheet_reducer/ProfileBottomSheetReducer";
import preferencesReducer, { PreferencesState } from "./PreferencesReducer";
import tagsReducer from "./tags_reducer/slice";
import { TagsState } from "./tags_reducer/types";
import foodPositionsReducer from "./position_reducer/slice";
import { FoodPositionState } from "./position_reducer/types";
import { RestaurantInfoState } from "./restaurant_info_reducer/types";
import restaurantInfoReducer from "./restaurant_info_reducer/slice";
import ordersReducer from "./order_reduer/slice";
import { OrdersState } from "./order_reduer/types";
import orderReducer, { OrderState } from "./current_order_reducer/CurrentOrderReducer";


const rootReducer = combineReducers({
  displayedFood: displayedFoodReducer,
  order: orderReducer,
  userInfo: userInfoReducer,
  profileBottomSheet: profileBottomSheetReducer, 
  preferences: preferencesReducer,
  tags: tagsReducer,
  foodPositions: foodPositionsReducer,
  restaurantInfo: restaurantInfoReducer,
  orders: ordersReducer,
});

export interface RootState {
  displayedFood: DisplayedFoodState,
  order: OrderState,
  userInfo: UserInfoState,
  profileBottomSheet: ProfileBottomSheetState,
  preferences: PreferencesState,
  tags: TagsState,
  foodPositions: FoodPositionState,
  restaurantInfo: RestaurantInfoState,
  orders: OrdersState,
};

const reduxStore = configureStore({
  reducer: rootReducer,
});

export default reduxStore;

export type AppDispatch = typeof reduxStore.dispatch;