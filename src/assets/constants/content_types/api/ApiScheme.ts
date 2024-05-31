export interface CheckUserExistsResponse {
  exists: boolean;
}

export interface LoginResponse {
  jwt: string;
  user: { id: string };
}

export interface updateUserImageResponse {
  newImageUrl: string;
}