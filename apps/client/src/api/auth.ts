import type {
  ILoginRequest,
  IRegisterUserDto,
  IUserResponse,
} from "@/commons/interfaces/auth.interface";
import { api, apiWithInterceptor } from "./client.api";

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
export const refreshToken = async (): Promise<{ accessToken: string }> => {
  const res = await api.post(
    "/auth/refreshToken",
    {},
    { withCredentials: true }
  );
  return res.data;
};
export const getUser = async (
  id: string,
  accessToken: string
): Promise<IUserResponse> => {
  const res = await apiWithInterceptor.get("/users?id=" + id, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data;
};
export const logout = async (): Promise<void> => {
  const res = await api.post("/auth/logout");
  return res.data;
};
