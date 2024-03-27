import {combineReducers, configureStore} from "@reduxjs/toolkit";
import displayedFoodReducer, { DisplayedFoodState } from "./displayed_food_reducer/DisplayedFoodReducer";
import orderReducer, { OrderState } from "./current_order_reducer/CurrentOrderReducer";
import userInfoReducer, { UserInfoState } from "./user_info_reducer/UserInfoReducer";
import profileBottomSheetReducer, { ProfileBottomSheetState } from "./profile_bottom_sheet_reducer/ProfileBottomSheetReducer";


const rootReducer = combineReducers({
  displayedFood: displayedFoodReducer,
  order: orderReducer,
  userInfo: userInfoReducer,
  profileBottomSheet: profileBottomSheetReducer, 
});

export interface RootState {
  displayedFood: DisplayedFoodState,
  order: OrderState,
  userInfo: UserInfoState,
  profileBottomSheet: ProfileBottomSheetState,
};

const reduxStore = configureStore({
  reducer: rootReducer,
});

export default reduxStore;
