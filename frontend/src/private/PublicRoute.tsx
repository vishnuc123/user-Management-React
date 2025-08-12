import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import usePreviousLocation from "../hooks/usePrevious";

interface PublicRouteProps {
  children: React.ReactElement;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const auth = useSelector((state: RootState) => state.auth);
  const location = useLocation()

  if (auth.loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }
if (auth.isAuthenticated) {
    //
    const from = location.state?.from?.pathname || "/UserDashboard";


    
    return <Navigate to={from} replace />;
    }
    
  return children;
};

export default PublicRoute;
