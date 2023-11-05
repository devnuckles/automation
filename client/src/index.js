import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./modules/core/App.component";

import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes.jsx";

const theme = createTheme({
    palette: {
        primary: {
            main: "#3f51b5",
        },
        secondary: {
            main: "#f50057",
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
    </ThemeProvider>
);
