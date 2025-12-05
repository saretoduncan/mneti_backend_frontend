import type { AxiosError } from "axios";
import type { LucideIcon } from "lucide-react";

export type TNavType = {
  title: string;
  url: string;
  icon?: LucideIcon;
};
export type TNavTitle = "LOGIN_PAGE" | "REGISTER" | "DASHBOARD" | "PROFILE";

export interface IApiError {
  error: string;
  message: string;
}
export type TApiError = AxiosError<IApiError>;
