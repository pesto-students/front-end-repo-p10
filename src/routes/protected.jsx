import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = ({isAuthenticated}) => {
  let location = useLocation();
    if(!localStorage.getItem("token"))
     return <Navigate to="/login" state={{ from: location }} />;
    else
      return <Outlet/>
};