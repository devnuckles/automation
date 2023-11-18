import React from "react";

import { TextField } from "@mui/material";

const ChangePassword = () => {
    return (
        <div className="change-password-main common-modal-wrapper">
            <div className="row">
                <h2 className="change-password-title common-modal-title mb-3">
                    Change Password
                </h2>
                <form className="change-password-form">
                    <div class="mb-3">
                        <TextField
                            id="outlined-basic"
                            label="Old Password"
                            variant="outlined"
                        />
                    </div>
                    <div class="mb-3">
                        <TextField
                            id="outlined-basic"
                            label="New Password"
                            variant="outlined"
                        />
                    </div>
                    <div class="mb-3 ">
                        <TextField
                            id="outlined-basic"
                            label="Confirm Password"
                            variant="outlined"
                        />
                    </div>
                    <button type="submit" class="btn mt-3 common-modal-button">
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
