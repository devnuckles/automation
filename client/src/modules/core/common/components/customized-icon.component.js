import React from "react";
import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";

function CustomizedIcon() {
    return (
        <div>
            <IconButton color="secondary">
                <Edit fontSize="large" />
            </IconButton>
        </div>
    );
}

export default CustomizedIcon;
