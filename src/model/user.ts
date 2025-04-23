export interface UserModel {
  id: string;
  name: string;
  role: string;
}

export interface AuthModel {
  accessToken: string;
  refreshToken: string;
}
