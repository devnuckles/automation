import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "80%",
    background: "#fff",
    boxShadow: 24,
    p: 4,
    borderRadius: "16px",
};

export default function DynamicModal({ modalElement, button }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button className="me-2 project-new-button" onClick={handleOpen}>
                {button}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>{open && modalElement}</Box>
            </Modal>
        </div>
    );
}
