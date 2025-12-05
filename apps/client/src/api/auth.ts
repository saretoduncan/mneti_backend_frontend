import type {
  ILoginRequest,
  IRegisterUserDto,
  IUserResponse,
} from "@/commons/interfaces/auth.interface";
import { api } from "./client.api";

export const login = async (data: ILoginRequest): Promise<IUserResponse> => {
  const res = await api.post("/auth/login", data);

  return res.data;
};
export const signup = async (
  data: IRegisterUserDto
): Promise<IUserResponse> => {
  const res = await api.post("/auth/register", data);
  return res.data;
};
