import type { IUserResponse } from "@/commons/interfaces/auth.interface";
import { NavLinkData } from "@/commons/navlinkData";
import type { AppDispatch, RootState } from "@/store";
import {
  logout,
  setAccessToken,
  setCredentials,
  setIsSubscribed,
} from "@/store/authSlice";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const useAuthHook = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { accessToken, isSubscribed, userId } = useSelector(
    (state: RootState) => state.authReducer
  );
  const user: IUserResponse | undefined = queryClient.getQueryData(["user"]);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (userId && user) {
      if (!user.profile.isSubscribed) {
        navigate(NavLinkData.SUBSCRIPTION.url);
      } else {
        navigate(NavLinkData.DASHBOARD.url, { replace: true });
      }
    }
  }, [user, userId]);
  const loginUser = useCallback(
    (userId: string, accessToken: string, isSubscribed: boolean) => {
      dispatch(
        setCredentials({
          accessToken: accessToken,
          userId: userId,
          isSubscribed: isSubscribed,
        })
      );
      navigate(NavLinkData.DASHBOARD.url, { replace: true });
    },
    [dispatch]
  );
  const updateAccessToken = useCallback(
    (accessToken: string) => {
      dispatch(setAccessToken({ accessToken }));
    },
    [dispatch]
  );
  const updateSubscribed = useCallback(
    (isSubscribed: boolean) => {
      dispatch(setIsSubscribed({ isSubscribed: isSubscribed }));
    },
    [dispatch]
  );
  const logoutUser = useCallback(() => {
    dispatch(logout());
    queryClient.removeQueries({ queryKey: ["user"] });
    navigate(NavLinkData.LOGIN_PAGE.url, { replace: true });
  }, [dispatch]);
  return {
    accessToken,

    userId,
    isSubscribed,
    updateAccessToken,
    loginUser,
    updateSubscribed,
    logoutUser,
  };
};

export default useAuthHook;
