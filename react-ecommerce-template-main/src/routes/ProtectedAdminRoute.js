import React from "react";
import { Route, Redirect } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedAdminRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      return <Redirect to="/AuthPage" />;
    }
  
    try {
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);
  
      // Kullanıcının rolünü çek
      const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  
      // Eğer rol "Admin" değilse erişimi engelle
      if (userRole !== "Admin") {
        return <Redirect to="/profile" />;
      }
  
      return <Route {...rest} render={(props) => <Component {...props} />} />;
    } catch (error) {
      console.error("Token çözme hatası:", error);
      localStorage.removeItem("token");
      return <Redirect to="/AuthPage" />;
    }
  };

export default ProtectedAdminRoute;
