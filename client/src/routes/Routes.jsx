import { createBrowserRouter } from "react-router-dom";

import { DashboardLayout, Dashboard } from "../modules/core";
import {
    AddProjectUser,
    AddUser,
    CreateNewProject,
    LandingPage,
    Login,
    Registration,
    UpdateInformation,
    UpdateProjectDetails,
    UserTable,
} from "../modules/platform";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/login",
        element: <Login />,
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
