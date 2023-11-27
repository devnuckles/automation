import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ element }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // If not authenticated, navigate to the login page
        return <Navigate to="/login" replace />;
    }

    // If authenticated, render the provided element
    return <>{element}</>;
};

export default ProtectedRoute;
