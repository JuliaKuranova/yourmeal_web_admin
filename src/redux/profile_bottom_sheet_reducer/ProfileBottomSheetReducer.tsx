export enum ProfileBottomSheetType {
  COMMON,
  FIRST
}

export interface ProfileBottomSheetState {
  isOpened: boolean;
  type: ProfileBottomSheetType
}

enum ProfileBottomSheetActionTypes {
  DISPLAY_COMMON_PROFILE_SHEET = 'DISPLAY_COMMON_PROFILE_SHEET',
  DISPLAY_FIRST_PROFILE_SHEET = 'DISPLAY_FIRST_PROFILE_SHEET',
  HIDE_PROFILE_SHEET = 'HIDE_PROFILE_SHEET'
}

const initialState: ProfileBottomSheetState = {
  isOpened: false,
  type: ProfileBottomSheetType.COMMON
};

export const displayCommonProfileSheet = () => ({
  type: ProfileBottomSheetActionTypes.DISPLAY_COMMON_PROFILE_SHEET,
});

export const displayFirstProfileSheet = () => ({
  type: ProfileBottomSheetActionTypes.DISPLAY_FIRST_PROFILE_SHEET,
});

export const hideProfileSheet = () => ({
  type: ProfileBottomSheetActionTypes.HIDE_PROFILE_SHEET,
});

const profileBottomSheetReducer = (
  state = initialState,
  action: ReturnType<typeof displayCommonProfileSheet>
    | ReturnType<typeof displayFirstProfileSheet>
    | ReturnType<typeof hideProfileSheet>
): ProfileBottomSheetState => {
  switch (action.type) {
    case ProfileBottomSheetActionTypes.DISPLAY_COMMON_PROFILE_SHEET:
      return {
        isOpened: true,
        type: ProfileBottomSheetType.COMMON
      };
    case ProfileBottomSheetActionTypes.DISPLAY_FIRST_PROFILE_SHEET:
      return {
        isOpened: true,
        type: ProfileBottomSheetType.FIRST
      };
    case ProfileBottomSheetActionTypes.HIDE_PROFILE_SHEET:
      return {
        isOpened: false,
        type: ProfileBottomSheetType.COMMON
      };
    default:
      return state;
  }
};

export default profileBottomSheetReducer