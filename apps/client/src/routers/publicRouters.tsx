import { NavLinkData } from "@/commons/navlinkData";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import SubscriptionPage from "@/pages/subscription";
import { Route, Routes } from "react-router";

const PublicRouters = () => {
  return (
    <Routes>
      {}
      <Route path={NavLinkData.LOGIN_PAGE.url} element={<Login />} />
      <Route path={NavLinkData.REGISTER.url} element={<Register/>}/>

       <Route
        path={NavLinkData.SUBSCRIPTION.url}
        element={<SubscriptionPage />}
      />
    </Routes>
  );
};

export default PublicRouters;
