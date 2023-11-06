import React from "react";
import { createBrowserRouter } from "react-router-dom";

import LandingPage from "../modules/platform/users/components/landingPage/LandingPage.component";
import LogInSide from "../modules/platform/users/components/login.component";
import Registration from "../modules/platform/users/components/registration.component";
import AddUser from "../modules/platform/users/components/addUser/AddUser";
import AddProjectUser from "../modules/platform/users/components/addProjectUser/AddProjectUser";
import CreateNewProject from "../modules/platform/users/components/createNewProject/CreateNewProject";
import UpdateProjectDetails from "../modules/platform/users/components/updateProjectDetails/UpdateProjectDetails";
import UpdateInformation from "../modules/platform/users/components/updateInformation/UpdateInformation";
import Dashboard from "../modules/platform/dashboard/dashboard.component";
import DashboardLayout from "../modules/platform/dashboard/Layout";
import UserTable from "../modules/platform/users/user-list.component";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/login",
        element: <LogInSide />,
    },
    {
        path: "/projects",
        element: (
            <DashboardLayout>
                <Dashboard />
            </DashboardLayout>
        ),
    },
    {
        path: "/user-management",
        element: (
            <DashboardLayout>
                <UserTable />
            </DashboardLayout>
        ),
    },
    {
        path: "/registration",
        element: <Registration />,
    },
    {
        path: "/add_user",
        element: (
            <DashboardLayout>
                <AddUser />
            </DashboardLayout>
        ),
    },
    {
        path: "/add_project_user",
        element: (
            <DashboardLayout>
                <AddProjectUser />
            </DashboardLayout>
        ),
    },
    {
        path: "/create_new_project",
        element: (
            <DashboardLayout>
                <CreateNewProject />
            </DashboardLayout>
        ),
    },
    {
        path: "/update_project_details",
        element: (
            <DashboardLayout>
                <UpdateProjectDetails />
            </DashboardLayout>
        ),
    },
    {
        path: "/update_information",
        element: (
            <DashboardLayout>
                <UpdateInformation />
            </DashboardLayout>
        ),
    },
]);

export default Routes;
