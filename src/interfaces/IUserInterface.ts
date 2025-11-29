export interface ICreateUserInterface {
  firstName: string;
  lastName: string;
  email: string;
  phone_number: string;
  date_of_birth: Date;
  referredById: number;
  password: string;
}

export interface IUpdateUserProfileInterface {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone_number?: string;
  date_of_birth?: Date;
}
