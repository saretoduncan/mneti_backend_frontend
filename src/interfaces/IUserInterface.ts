import { Users } from "src/users/user.entity";
import { Request } from "express";

export interface ICreateUserInterface {
  firstName: string;
  lastName: string;
  email: string;
  phone_number: string;
  date_of_birth: Date;
  referredByCode: string;
  password: string;
}

export interface IUpdateUserProfileInterface {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone_number?: string;
  date_of_birth?: Date;
}

export interface IRequestWithUser extends Request{
   user:TUsersWithNoPassword
}
export type TUsersWithNoPassword = Users
