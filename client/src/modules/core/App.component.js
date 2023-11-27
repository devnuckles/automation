import React from "react";
import { Routes, Route } from "react-router-dom";

import { ProtectedRoute, PublicRoute, useAuth } from "./router";
import { DashboardLayout } from "./index";
import {
    Dashboard,
    LandingPage,
    Login,
    ProjectDetails,
    UserTable,
} from "../platform";
import { FlatDetails, FlatManagement } from "../platform/users";

const App = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/login" element={<Login />} /> */}
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />

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
                path="/flat-details"
                element={
                    <ProtectedRoute
                        element={
                            isAuthenticated ? (
                                <DashboardLayout>
                                    <FlatDetails />
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
