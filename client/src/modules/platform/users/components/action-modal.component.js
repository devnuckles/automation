import * as React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

import Stack from "@mui/material/Stack";

export default function ActionModal() {
    return (
        <>
            <div className="action-modal-wrapper">
                <div className="row">
                    <h4>Edit Options</h4>
                    <Stack direction="row" spacing={2}>
                        <Button
                            className="action-modal-button"
                            variant="outlined"
                            startIcon={<i class="bi bi-archive-fill"></i>}
                        >
                            Edit
                        </Button>
                        <Button
                            className="action-modal-button"
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                        >
                            Delete
                        </Button>
                    </Stack>
                </div>
            </div>
        </>
    );
}
