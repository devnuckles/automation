import { Button } from "@mui/material";
import React from "react";

const DeleteProjectModal = () => {
    return (
        <div className="delete-project-modal">
            <div className="delete-project-warning">
                <i class="bi bi-exclamation-circle"></i>
            </div>
            <div className="delete-project-content">
                <h2 className="mt-3">Delete Project</h2>
                <p>
                    Are you sure you want to delete this Project? This action
                    cannot be undone.
                </p>
            </div>
            <dsv className="delete-project-buttons">
                <Button className="me-2" variant="outlined">Cancel</Button>
                <Button variant="outlined">Delete</Button>
            </dsv>
        </div>
    );
};

export default DeleteProjectModal;
