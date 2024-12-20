import React from 'react'
import { useSelector } from "react-redux";
import { Navigate, Outlet } from 'react-router-dom';

const OnlyAdminPrivateRoute = () => {

  const { currentUser } = useSelector((state) => state.user)

  if(!currentUser) {
    return <Navigate to="/admin-signin"/>
  }

  return currentUser && currentUser.isAdmin ? (
    <Outlet/>
  ) : (
    <Navigate to="/"/>
  )
}

export default OnlyAdminPrivateRoute
