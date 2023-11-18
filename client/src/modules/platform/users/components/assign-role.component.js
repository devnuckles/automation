import React from "react";

import { TextField } from "@mui/material";

const AssignRole = () => {
    const member = [
        {
            value: "select-member",
            label: "Select Member",
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
    const role = [
        {
            value: "admin",
            label: "Admin",
        },
        {
            value: "operator",
            label: "Operator",
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
                        defaultValue="Select Member"
                        SelectProps={{
                            native: true,
                        }}
                        // variant="standard"
                        // helperText="Please select your currency"
                    >
                        {member.map((option) => (
                            <option key={option.value} value={option.value}>
                                <p className="options">{option.label}</p>
                            </option>
                        ))}
                    </TextField>
                    <TextField
                        focused
                        sx={{
                            mt: "30px",
                            width: "100%",
                            color: "black",
                        }}
                        id="outlined-select-currency"
                        select
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
                        class="btn mt-4    common-modal-button"
                    >
                        Finish
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AssignRole;
