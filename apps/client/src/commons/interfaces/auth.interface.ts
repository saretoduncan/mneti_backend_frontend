export interface ILoginRequest {
  username: string;
  password: string;
}
export interface IUserResponse {
  id: string;
  username: string;
  referralCode: string;
  profile: IProfile;
  roles: IRole[];
  createdAt: string;
  updatedAt: string;
  accessToken: string;
}

export interface IProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  isSubscribed: boolean;
  userId: string;
  referrerId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IRole {
  id: string;
  name: string;
}
 //register user
export interface IRegisterUserDto {
  firstName: string;
  lastName: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  referredByCode: string;
  password: string;
  confirmPassword: string;
}