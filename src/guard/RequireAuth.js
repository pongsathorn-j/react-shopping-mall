import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ children, roles }) => {
  const { isAuth, currentUser } = useSelector((state) => state.authReducer);
  const location = useLocation();

  if (!isAuth) {
    // Redirect them to the /signin page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they signin, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: location }} />;
  }
  console.log(roles)
  if (roles && roles.indexOf(currentUser.role) === -1) {
    // role not authorised so redirect to home page
    return <Navigate to={{ pathname: "/" }} />;
  }

  return children;
};

export default RequireAuth;
