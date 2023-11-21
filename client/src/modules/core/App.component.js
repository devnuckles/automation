import React from "react";
import { Routes, Route } from "react-router-dom";

import { ProtectedRoute, useAuth } from "./router";
import { DashboardLayout } from "./index";
import {
    Dashboard,
    LandingPage,
    Login,
    ProjectDetails,
    UserTable,
} from "../platform";
import { FlatManagement } from "../platform/users";

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
            <Route
                path="/user-management"
                element={
                    <ProtectedRoute
                        element={
                            isAuthenticated ? (
                                <DashboardLayout>
                                    <UserTable />
                                </DashboardLayout>
                            ) : null
                        }
                    />
                }
            />
            <Route
                path="/flat-management"
                element={
                    <ProtectedRoute
                        element={
                            isAuthenticated ? (
                                <DashboardLayout>
                                    <FlatManagement />
                                </DashboardLayout>
                            ) : null
                        }
                    />
                }
            />
            <Route
                path="/project-details"
                element={
                    <ProtectedRoute
                        element={
                            isAuthenticated ? (
                                <DashboardLayout>
                                    <ProjectDetails />
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
