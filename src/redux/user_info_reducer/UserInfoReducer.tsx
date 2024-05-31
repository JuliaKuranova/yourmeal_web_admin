import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../../assets/constants/content_types/UserInfo";

export interface UserInfoState {
  userInfo: UserInfo;
}

const initialState: UserInfoState = {
  userInfo: {
    id: "",
    email: "",
    name: "",
    allowPushNotifications: true,
    userAdditionalInfo: "",
    image: "",
    bearerToken: "",
  },
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserName(state, action: PayloadAction<string>) {
      state.userInfo.name = action.payload;
    },
    setUserEmail(state, action: PayloadAction<string>) {
      state.userInfo.email = action.payload;
    },
    setUserAllowPushes(state, action: PayloadAction<boolean>) {
      state.userInfo.allowPushNotifications = action.payload;
    },
    setUserBearerToken(state, action: PayloadAction<string>) {
      state.userInfo.bearerToken = action.payload;
    },
    setUserAdditionalInfo(state, action: PayloadAction<string>) {
      state.userInfo.userAdditionalInfo = action.payload;
    },
    setUserImage(state, action: PayloadAction<string | undefined>) {
      state.userInfo.image = action.payload;
    },
    loginUser(state, action: PayloadAction<UserInfo>) {
      const {
        id,
        email,
        name,
        bearerToken,
        image,
        userAdditionalInfo,
        allowPushNotifications,
      } = action.payload;
      state.userInfo = {
        id,
        email,
        name,
        bearerToken,
        image,
        userAdditionalInfo,
        allowPushNotifications,
      };
      localStorage.setItem('MY_USER', JSON.stringify({
        id,
        email,
        name,
        bearerToken,
        image,
        userAdditionalInfo,
        allowPushNotifications,
      }))
    },
    logoutUser(state) {
      state.userInfo = {
        id: "",
        email: "",
        name: "",
        allowPushNotifications: true,
        userAdditionalInfo: "",
        image: "",
        bearerToken: "",
      };
      localStorage.removeItem('MY_USER')
    },
    updateAllUserEditableInfo(
      state,
      action: PayloadAction<{
        name: string;
        additionalInfo: string;
        allowPushes: boolean;
      }>
    ) {
      const { name, additionalInfo, allowPushes } = action.payload;
      state.userInfo = {
        ...state.userInfo,
        name: name,
        userAdditionalInfo: additionalInfo,
        allowPushNotifications: allowPushes,
      };
    },
  },
});

export const {
  setUserImage,
  loginUser,
  logoutUser,
  updateAllUserEditableInfo,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
