import type {
  ILoginRequest,
  IRegisterUserDto,
  IUserResponse,
} from "@/commons/interfaces/auth.interface";
import { api } from "./client.api";

export const login = async (data: ILoginRequest): Promise<IUserResponse> => {
  try {
    const res = await api.post("/auth/login", data);

    return res.data;
  } catch (e: any) {
    throw new Error(e);
  }
};
export const signup = async (
  data: IRegisterUserDto
): Promise<IUserResponse> => {
  try {
    const res = await api.post("/auth/register", data);
    return res.data;
  } catch (err: any) {
    throw new Error(err);
  }
};
