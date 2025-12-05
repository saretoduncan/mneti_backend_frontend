import { NavLinkData } from "@/commons/navlinkData";
import Login from "@/pages/auth/login";
import { Route, Routes } from "react-router";

const PublicRouters = () => {
  return (
    <Routes>
      <Route path={NavLinkData.LOGIN_PAGE.url} element={<Login />} />
    </Routes>
  );
};

export default PublicRouters;
