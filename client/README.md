# Client:

-   Initial Dependencies for using MUI:

```json
 "dependencies": {
        "@emotion/react": "^11.11.1",
        "@emotion/styled": "^11.11.0",
        "@mui/icons-material": "^5.11.16",
        "@mui/material": "^5.13.5",
        "@mui/x-data-grid": "^6.7.0",
        "@testing-library/jest-dom": "^5.17.0",
        "@testing-library/react": "^13.4.0",
        "@testing-library/user-event": "^13.5.0",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-scripts": "5.0.1",
        "web-vitals": "^2.1.4"
    },
```

-   Initial index.js to use the MUI:

```js
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./modules/core/App.component";

import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

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
        <App />
    </ThemeProvider>
);
```
