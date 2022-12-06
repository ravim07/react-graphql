import React from 'react'
import { Navigate,Outlet } from "react-router-dom";
const PrivateRoute = ({component:Component,...rest}) => {
    let auth=localStorage.getItem('token')
  return (
    <div className="main-container">
      {
        auth?<Outlet/>:<Navigate to={"/login"}/>
      }

    </div>
  )
}

export default PrivateRoute