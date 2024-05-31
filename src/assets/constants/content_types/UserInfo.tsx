export interface UserInfo {
  id?: string;
  email: string;
  name: string;
  allowPushNotifications: boolean;
  userAdditionalInfo: string;
  image: any;
  bearerToken: string;
}