import { UserInfo } from "../../assets/constants/content_types/UserInfo";


export enum LocalStorageUserInfoFields {
  USER_INFO = 'USER_INFO'
}

export interface UserInfoState {
  userInfo: UserInfo;
}

enum UserInfoActionTypes {
  SET_USER_NAME = 'SET_USER_NAME',
  SET_USER_EMAIL = 'SET_USER_EMAIL',
  SET_USER_ALLOW_PUSHES = 'SET_USER_ALLOW_PUSHES',
  SET_USER_BEARER_TOKEN = 'SET_USER_BEARER_TOKEN',
  SET_USER_ADDITIONAL_INFO = 'SET_USER_ADDITIONAL_INFO',
  SET_USER_IMAGE = 'SET_USER_IMAGE',
  LOGIN_USER = 'LOGIN_USER',
  LOGOUT_USER = 'LOGOUT_USER'
}

const storedUserInfo = localStorage.getItem(LocalStorageUserInfoFields.USER_INFO);
const initialState: UserInfoState = JSON.parse(storedUserInfo ||
  JSON.stringify({
      userInfo: {
        email: '',
        name: '',
        allowPushNotifications: true,
        userAdditionalInfo: '',
        image: '',
        bearerToken: ''
      }
    }
  )
)

export const setUserName = (name: string) => ({
  type: UserInfoActionTypes.SET_USER_NAME,
  name: name
});

export const setUserEmail = (email: string) => ({
  type: UserInfoActionTypes.SET_USER_EMAIL,
  email: email
});

export const setUserAllowPushes = (allowPushes: boolean) => ({
  type: UserInfoActionTypes.SET_USER_ALLOW_PUSHES,
  allowPushes: allowPushes
});

export const setUserBearerToken = (bearerToken: string) => ({
  type: UserInfoActionTypes.SET_USER_BEARER_TOKEN,
  bearerToken: bearerToken
});

export const setUserAdditionalInfo= (additionalInfo: string) => ({
  type: UserInfoActionTypes.SET_USER_ADDITIONAL_INFO,
  additionalInfo: additionalInfo
});

export const setUserImage = (image: any) => ({
  type: UserInfoActionTypes.SET_USER_IMAGE,
  image: image
});

export const loginUser = (email: string, bearerToken: string, name: string) => ({
  type: UserInfoActionTypes.LOGIN_USER,
  email: email,
  bearerToken: bearerToken,
  name: name
});

export const logoutUser = () => ({
  type: UserInfoActionTypes.LOGOUT_USER,
});

const userInfoReducer = (
  state = initialState,
  action: ReturnType<typeof setUserName>
    | ReturnType<typeof setUserEmail>
    | ReturnType<typeof setUserImage>
    | ReturnType<typeof setUserAdditionalInfo>
    | ReturnType<typeof setUserAllowPushes>
    | ReturnType<typeof setUserBearerToken>
    | ReturnType<typeof loginUser>
    | ReturnType<typeof logoutUser>
): UserInfoState => {
  let newState: UserInfoState

  switch (action.type) {
    case UserInfoActionTypes.SET_USER_NAME:
      newState = { userInfo: {...state.userInfo, name: ((action as ReturnType<typeof setUserName>).name) }}
      break
    case UserInfoActionTypes.SET_USER_EMAIL:
      newState = { userInfo: {...state.userInfo, email: ((action as ReturnType<typeof setUserEmail>).email) }}
      break
    case UserInfoActionTypes.SET_USER_ADDITIONAL_INFO:
      newState = { userInfo: {...state.userInfo, userAdditionalInfo: ((action as ReturnType<typeof setUserAdditionalInfo>).additionalInfo) }}
      break
    case UserInfoActionTypes.SET_USER_ALLOW_PUSHES:
      newState = { userInfo: {...state.userInfo, allowPushNotifications: ((action as ReturnType<typeof setUserAllowPushes>).allowPushes) }}
      break
    case UserInfoActionTypes.SET_USER_IMAGE:
      newState = { userInfo: {...state.userInfo, image: ((action as ReturnType<typeof setUserImage>).image) }}
      break
    case UserInfoActionTypes.LOGIN_USER:
      const actionData = action as ReturnType<typeof loginUser>
      newState = {
        userInfo: {
          ...state.userInfo,
          name: actionData.name,
          email: actionData.email,
          bearerToken: actionData.bearerToken
        }}
      break
    case UserInfoActionTypes.LOGOUT_USER:
      newState = {
        userInfo: {
          email: '',
          name: '',
          allowPushNotifications: true,
          userAdditionalInfo: '',
          image: '',
          bearerToken: ''
        }
      }
      break
    default:
      return state
  }

  localStorage.setItem(LocalStorageUserInfoFields.USER_INFO, JSON.stringify(newState));
  return newState
};

export default userInfoReducer
