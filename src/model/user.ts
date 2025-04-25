export interface UserModel {
  id: string;
  name: string;
  email: string;
  role: number;
  roleName: string;
}

export interface AuthModel {
  accessToken: string;
  refreshToken: string;
}
