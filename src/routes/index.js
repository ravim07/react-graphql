import React from "react";
import Dashboard from "../component/Dashboard";
import Login from "../component/Login";
import PageNotFound from "../component/PageNotFound";
import Register from "../component/Register";

const RouteFiles = [
  {
    path: "",
    exact: true,
    name: "Login",
    element: <Login />,
    private: false,
  },
  {
    path: "/login",
    exact: true,
    name: "Login",
    element: <Login />,
    private: false,
  },
  {
    path: "/register",
    exact: true,
    name: "register",
    element: <Register />,
    private: false,
  },
  {
    path: "/dashboard",
    exact: true,
    name: "dashboard",
    element: <Dashboard />,
    private: true,
  },{
    path: '*',
    element: <PageNotFound />,
    private: true
  }
];

export default RouteFiles;
