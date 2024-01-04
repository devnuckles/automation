
import { Button } from "@mui/material";
import React from "react";

const DynamicDeleteModal = ({ title, content, onCancel, onDelete }) => {
    return (
        <div className="delete-project-modal">
            <div className="delete-project-warning">
                <i className="bi bi-exclamation-circle"></i>
            </div>
            <div className="delete-project-content">
                <h2 className="mt-3">{title}</h2>
                <p>{content}</p>
            </div>
            <div className="delete-project-buttons">
                <Button className="me-2" variant="outlined" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="outlined" onClick={onDelete}>
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default DynamicDeleteModal;
