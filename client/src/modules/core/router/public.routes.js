import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
    const token = Cookies.get("token");

    if (token) {
        return <Navigate to="/projects" replace />;
    }
    return children;
}

export default PublicRoute;
