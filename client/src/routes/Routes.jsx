import React from "react";
import LandingPage from "../modules/platform/users/components/landingPage/LandingPage.component";
import LogInSide from "../modules/platform/users/components/login.component";
import Registration from "../modules/platform/users/components/registration.component";
import AddUser from "../modules/platform/users/components/addUser/AddUser";
import AddProjectUser from "../modules/platform/users/components/addProjectUser/AddProjectUser";
import { createBrowserRouter } from "react-router-dom";
import CreateNewProject from "../modules/platform/users/components/createNewProject/CreateNewProject";
import UpdateProjectDetails from "../modules/platform/users/components/updateProjectDetails/UpdateProjectDetails";
import UpdateInformation from "../modules/platform/users/components/updateInformation/UpdateInformation";
import Dashboard from "../modules/platform/dashboard/dashboard.component";
const Routes = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
        // children: [
        //   {
        //     path: "/add_user",
        //     element: <AddUser />,
        //   },
        //   {
        //     path: "/add_project_user",
        //     element: <AddProjectUser />,
        //   },
        //   {},
        //   {
        //
        //   },
        // ],
    },
    {
        path: "/login",
        element: <LogInSide />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/registration",
        element: <Registration />,
    },
    {
        path: "/add_user",
        element: <AddUser />,
    },
    {
        path: "/add_project_user",
        element: <AddProjectUser />,
    },
    {
        path: "/create_new_project",
        element: <CreateNewProject />,
    },
    {
        path: "/update_project_details",
        element: <UpdateProjectDetails />,
    },
    {
        path: "/update_information",
        element: <UpdateInformation />,
    },
]);

export default Routes;
