import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("userToken");
  useEffect(() => {}, []);
  if (!token) {
    return (
      <div>
        <h1>Unauthorized</h1>
        <NavLink to={"/user/login"}>Login</NavLink>
      </div>
    );
  }

  // returns child route elements
  return <Outlet />;
};
export default ProtectedRoute;
