import type { LucideIcon } from "lucide-react";

export type TNavType = {
  title: string;
  url: string;
  icon?: LucideIcon;
};
export type TNavTitle= "LOGIN_PAGE"| "REGISTER" |"DASHBOARD"|"PROFILE"