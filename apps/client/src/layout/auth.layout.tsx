import { NavLinkData } from "@/commons/navlinkData";
import useAuthHook from "@/hooks/useAuthHook";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const AuthLayout = () => {
  const {userId}= useAuthHook();
  const navigate = useNavigate()
  useEffect(()=>{
    if(userId){
      navigate(NavLinkData.DASHBOARD.url,{replace:true})
    }
  },[userId])
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
