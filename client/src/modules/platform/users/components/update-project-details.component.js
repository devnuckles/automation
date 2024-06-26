import { Button, TextField, Typography } from "@mui/material";
import React from "react";

const UpdateProjectDetails = () => {
    const currencies = [
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
        <div className="log_in_bg">
            <form className="update_project_details_form">
                <div
                    className="project_form_wrapper"
                    style={{ padding: "30px" }}
                >
                    <Typography
                        sx={{
                            color: "#989898",
                            fontWeight: "600",
                            fontSize: "48px",
                            letterSpacing: "-0.96px",
                            textAlign: "center",
                        }}
                        variant="h3"
                        component="h2"
                    >
                        Update Project Details
                    </Typography>
                    <div>
                        <TextField
                            sx={{ width: "100%", mt: "30px" }}
                            id="outlined-basic"
                            type="text"
                            // value=""
                            label="Project Name"
                            variant="outlined"
                        />

                        <TextField
                            sx={{ width: "100%", mt: "30px" }}
                            id="outlined-basic"
                            type="text"
                            // value=""
                            label="Project Description"
                            variant="outlined"
                            multiline
                            rows={5}
                        />

                        <TextField
                            sx={{ mt: "30px", width: "100%", color: "black" }}
                            id="outlined-select-currency"
                            select
                            label="Project Status"
                            defaultValue="EUR"
                            SelectProps={{
                                native: true,
                            }}
                            // variant="standard"
                            // helperText="Please select your currency"
                        >
                            {currencies.map((option) => (
                                <option key={option.value} value={option.value}>
                                    <p className="options">{option.label}</p>
                                </option>
                            ))}
                        </TextField>
                    </div>
                    <Button
                        variant="contained"
                        sx={{
                            mt: "50px",
                            fontFamily: "Outfit",
                            fontSize: "18px",
                            fontWeight: "600",
                            bgcolor: "#047857",
                            "&:hover": {
                                bgcolor: "#047857",
                            },
                            width: "100%",
                        }}
                    >
                        Update Project Details
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProjectDetails;
