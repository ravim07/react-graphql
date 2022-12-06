import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const SessionRoute = () => {
  const login = localStorage.getItem("token");
  return <>{login ? <Navigate to={"/dashboard"}/> : <Outlet />}</>;
};

export default SessionRoute;
