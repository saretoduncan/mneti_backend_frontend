import { USER_ID } from "@/commons/constants";
import type { IUserResponse } from "@/commons/interfaces/auth.interface";
import { clearStorage, getFromStorage, saveToStorage } from "@/lib/storage";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  userId: string | null;
  accessToken: string | null;
  isSubscribed: boolean;
}
const initialState: IAuthState = {
  userId: getFromStorage(USER_ID),

  accessToken: null,
  isSubscribed: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        userId: string;
        accessToken: string;
        isSubscribed: boolean;
      }>
    ) => {
      state.isSubscribed = action.payload.isSubscribed;
      state.accessToken = action.payload.accessToken;
      state.userId = action.payload.userId;
      saveToStorage(USER_ID, action.payload.userId);
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
      state.userId = null;
      state.accessToken = null;
      state.isSubscribed = false;
      clearStorage();
    },
  },
});
export const { setAccessToken, setIsSubscribed, setCredentials, logout } =
  authSlice.actions;
export default authSlice.reducer;
