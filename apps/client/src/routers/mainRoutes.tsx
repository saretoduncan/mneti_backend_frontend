import { NavLinkData } from "@/commons/navlinkData";

import AuthLayout from "@/layout/auth.layout";
import MainLayout from "@/layout/main.layout";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import DashboardPage from "@/pages/dashboard";
import SubscriptionPage from "@/pages/subscription";
import Withdraw from "@/pages/withdraw";

import { Route, Routes } from "react-router";

const PublicRouters = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={NavLinkData.LOGIN_PAGE.url} element={<Login />} />
        <Route path={NavLinkData.REGISTER.url} element={<Register />} />
      </Route>
      <Route element={<MainLayout />} path={NavLinkData.DASHBOARD.url}>
        <Route
          path={NavLinkData.SUBSCRIPTION.url}
          element={<SubscriptionPage />}
        />
        <Route path={NavLinkData.DASHBOARD.url} element={<DashboardPage />} />
        <Route path={NavLinkData.WITHDRWAL.url} element={<Withdraw />} />
      </Route>
    </Routes>
  );
};

export default PublicRouters;
