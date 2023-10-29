import React from "react";
import LandingPage from "../modules/platform/users/components/landingPage/LandingPage.component";
import LogInSide from "../modules/platform/users/components/login.component";
import Registration from "../modules/platform/users/components/registration.component";
import AddUser from "../modules/platform/users/components/addUser/AddUser";
import AddProjectUser from "../modules/platform/users/components/addProjectUser/AddProjectUser";
import { createBrowserRouter } from "react-router-dom";
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
]);

export default Routes;
