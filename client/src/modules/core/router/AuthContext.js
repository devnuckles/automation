import Cookies from "js-cookie";
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Check if there is a token in local storage on component mount
    const initialAuthState = Cookies.get("token") ? true : false;
    console.log(initialAuthState);
    const [isAuthenticated, setAuthenticated] = useState(initialAuthState);

    const login = (token) => {
        setAuthenticated(true);
        // Store the authentication state in local storage
        localStorage.setItem("token", token);
        Cookies.set("token", token);
    };

    const logout = () => {
        setAuthenticated(false);
        // Remove the authentication state from local storage
        localStorage.removeItem("token");
        Cookies.remove("token");
    };

    const value = {
        isAuthenticated,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
