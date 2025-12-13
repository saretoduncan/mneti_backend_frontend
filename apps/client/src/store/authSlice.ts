import type { IUserResponse } from "@/commons/interfaces/auth.interface";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  user: IUserResponse | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  isSubscribed: boolean;
}
const initialState: IAuthState = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
  isSubscribed: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: IUserResponse; accessToken: string }>
    ) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.isSubscribed = action.payload.user.profile.isSubscribed;
    },
    setAccessToken: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
    },
    setIsSubscribed: (
      state,
      action: PayloadAction<{ isSubscribed: boolean }>
    ) => {
      state.isSubscribed = action.payload.isSubscribed;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      state.isSubscribed = false;
    },
  },
});
