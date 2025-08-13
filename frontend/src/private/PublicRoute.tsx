import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const PublicRoute = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (auth.loading) {
    return (
      <div className="w-full h-screen flex justify-center">
        Loading profile...
      </div>
    );
  }

  if (auth.isAuthenticated) {
    return <Navigate to={location.state?.from?.pathname || "/UserDashboard"} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
