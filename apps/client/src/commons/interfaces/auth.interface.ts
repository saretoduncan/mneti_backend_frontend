export interface ILoginRequest {
  username: string;
  password: string;
}
export interface UserResponse {
  id: string;
  username: string;
  referralCode: string;
  profile: Profile;
  roles: Role[];
  createdAt: string;
  updatedAt: string;
  accessToken: string;
}

export interface Profile {
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

export interface Role {
  id: string;
  name: string;
}