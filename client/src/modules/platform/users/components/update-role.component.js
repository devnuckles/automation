import React from "react";

import { TextField } from "@mui/material";

const UpdateRole = () => {
    const role = [
        {
            value: "operator",
            label: "Operator",
        },
        {
            value: "admin",
            label: "Admin",
        },
        {
            value: "super_admin",
            label: "Super Admin",
        },
        {
            value: "moderator",
            label: "Moderator",
        },
    ];
    return (
        <div className=" common-modal-wrapper">
            <div className="row">
                <h2 className="change-password-title common-modal-title mb-2">
                    Update Role
                </h2>
                <form className="update-role-form">
                    <TextField
                        focused
                        sx={{
                            mt: "30px",
                            width: "100%",
                            color: "black",
                        }}
                        id="outlined-select-currency"
                        select
                        label="Role"
                        defaultValue="Admin"
                        SelectProps={{
                            native: true,
                        }}
                        // variant="standard"
                        // helperText="Please select your currency"
                    >
                        {role.map((option) => (
                            <option key={option.value} value={option.value}>
                                <p className="options">{option.label}</p>
                            </option>
                        ))}
                    </TextField>
                    <button
                        type="submit"
                        className="btn mt-4 common-modal-button"
                    >
                        Update Role
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateRole;
