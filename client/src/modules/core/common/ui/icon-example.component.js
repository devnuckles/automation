import React from "react";
import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";

function IconExample() {
    return (
        <div>
            <Button variant="contained" color="primary">
                <Delete /> Delete
            </Button>
        </div>
    );
}

export default IconExample;
