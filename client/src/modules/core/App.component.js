import React from "react";
import { Routes, Route } from "react-router-dom";

import { ProtectedRoute, useAuth } from "./router";
import { DashboardLayout } from "./index";
import { Dashboard, LandingPage, Login } from "../platform";

const App = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />

            <Route
                path="/projects"
                element={
                    <ProtectedRoute
                        element={
                            isAuthenticated ? (
                                <DashboardLayout>
                                    <Dashboard />
                                </DashboardLayout>
                            ) : null
                        }
                    />
                }
            />
        </Routes>
    );
};

export default App;
