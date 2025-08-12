import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { FetchUserDetails } from "../store/auth/AuthThunk";

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Fetch user only if not already fetched and not loading
    if (!auth.user && !auth.loading) {
      dispatch(FetchUserDetails());
    }
  }, [auth.user, auth.loading, dispatch]);

  // Show loading UI while fetching user
  if (auth.loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  // After loading, if not authenticated, redirect to login
  if (!auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Else render the protected page
  return children;
};

export default ProtectedRoute;
