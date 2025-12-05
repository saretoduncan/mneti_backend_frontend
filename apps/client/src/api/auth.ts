import type {
  ILoginRequest,
  UserResponse,
} from "@/commons/interfaces/auth.interface";
import { api } from "./client.api";


export const login = async (data: ILoginRequest): Promise<UserResponse> => {
  const res = await api.post("/auth/login",data)

  return res.data;
};
