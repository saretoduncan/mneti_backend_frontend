import { NavLinkData } from "@/commons/navlinkData";
import type { TApiError } from "@/commons/types";

import useAuthHook from "@/hooks/useAuthHook";
import useUserHook from "@/hooks/useUserHook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Bell, LogOut } from "lucide-react";

import { useEffect } from "react";
import { Link, Outlet } from "react-router";
import { toast } from "sonner";
import logo from "@/assets/net_logo.png";
import { logout } from "@/api/auth";
import type { IUserResponse } from "@/commons/interfaces/auth.interface";

const MainLayout = () => {
  const { logoutUser, userId, updateSubscribed } = useAuthHook();
  const { user, refetch, isFetching: isLoading, error } = useUserHook();

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      logoutUser();
    },
    onError: (err: TApiError) => {
      err.response && toast.error(err.response.data.message);
    },
  });
  useEffect(() => {
    if (!userId) {
      logoutUser();
    } else {
      if (!user) {
        refetch();

        if (error) {
          const err = error as TApiError;
          toast.error(err.response?.data.message);
        }
      }
      user && updateSubscribed(user.profile.isSubscribed);
    }
  }, [user, userId]);

  return (
    <div className="flex-1 flex flex-col">
      <nav className="w-full border-b shadow p-4 ">
        <div className="flex  justify-between xl:w-[1040px] xl:mx-auto 2xl:w-[1240px]">
          <div>
            <img src={logo} alt="mneti logo" className="w-10" />
          </div>
          <div className="flex gap-4 items-center">
            <Link to="">
              <Bell />
            </Link>
            <button onClick={() => mutate()}>
              <LogOut />
            </button>
          </div>
        </div>
      </nav>
      <div>{isLoading ? "loading .." : <Outlet />}</div>
    </div>
  );
};

export default MainLayout;
