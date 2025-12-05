import type { TNavTitle, TNavType } from "./types";

export const NavLinkData:Record<TNavTitle, TNavType >={
    LOGIN_PAGE: {
        title: "Login",
        url: "/auth/login",
        icon: undefined
    },
    REGISTER: {
        title: "Register",
        url: "/auth/register",
        icon: undefined
    },
    DASHBOARD: {
        title: "Dashboard",
        url: "/",
        icon: undefined
    },
    PROFILE: {
        title: "Profile",
        url: "/profile",
        icon: undefined
    }
}