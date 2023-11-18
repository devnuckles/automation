import React from "react";
import {
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
const UpdateInformation = () => {
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
        <div className="log_in_bg update_info_main">
            <form className="update_information_form">
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
                        Update Information
                    </Typography>
                    <div>
                        <TextField
                            sx={{ mt: "50px", width: "100%", color: "black" }}
                            id="outlined-select-currency"
                            select
                            label="Role"
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

                        <p
                            style={{
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#344054",
                                marginTop: "30px",
                                // fontSizeStyle: "normal",
                            }}
                        >
                            Services
                        </p>

                        <Grid sx={{ mt: "0px" }} container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <FormControlLabel
                                    sx={{ fontSize: "16px", fontWeight: "500" }}
                                    value="doc_management"
                                    control={
                                        <Checkbox
                                            sx={{
                                                color: "#047857",
                                                "&.Mui-checked": {
                                                    color: "#047857",
                                                },
                                            }}
                                        />
                                    }
                                    label="Document Management"
                                    labelPlacement="end"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControlLabel
                                    sx={{ fontSize: "16px", fontWeight: "500" }}
                                    value="flat_management"
                                    control={
                                        <Checkbox
                                            sx={{
                                                color: "#047857",
                                                "&.Mui-checked": {
                                                    color: "#047857",
                                                },
                                            }}
                                        />
                                    }
                                    label="Flat Management"
                                    labelPlacement="end"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControlLabel
                                    sx={{ fontSize: "16px", fontWeight: "500" }}
                                    value="account_management"
                                    control={
                                        <Checkbox
                                            sx={{
                                                color: "#047857",
                                                "&.Mui-checked": {
                                                    color: "#047857",
                                                },
                                            }}
                                        />
                                    }
                                    label="Accounts Management"
                                    labelPlacement="end"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControlLabel
                                    sx={{ fontSize: "16px", fontWeight: "500" }}
                                    value="sales_management"
                                    control={
                                        <Checkbox
                                            sx={{
                                                color: "#047857",
                                                "&.Mui-checked": {
                                                    color: "#047857",
                                                },
                                            }}
                                        />
                                    }
                                    label="Sales Management"
                                    labelPlacement="end"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControlLabel
                                    sx={{ fontSize: "16px", fontWeight: "500" }}
                                    value="budget_estimation"
                                    control={
                                        <Checkbox
                                            sx={{
                                                color: "#047857",
                                                "&.Mui-checked": {
                                                    color: "#047857",
                                                },
                                            }}
                                        />
                                    }
                                    label="Budget Estimation"
                                    labelPlacement="end"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControlLabel
                                    sx={{ fontSize: "16px", fontWeight: "500" }}
                                    value="material_management"
                                    control={
                                        <Checkbox
                                            sx={{
                                                color: "#047857",
                                                "&.Mui-checked": {
                                                    color: "#047857",
                                                },
                                            }}
                                        />
                                    }
                                    label="Material Management"
                                    labelPlacement="end"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControlLabel
                                    sx={{ fontSize: "16px", fontWeight: "500" }}
                                    value="user_management"
                                    control={
                                        <Checkbox
                                            sx={{
                                                color: "#047857",
                                                "&.Mui-checked": {
                                                    color: "#047857",
                                                },
                                            }}
                                        />
                                    }
                                    label="User Management"
                                    labelPlacement="end"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControlLabel
                                    sx={{ fontSize: "16px", fontWeight: "500" }}
                                    value="all"
                                    control={
                                        <Checkbox
                                            sx={{
                                                color: "#047857",
                                                "&.Mui-checked": {
                                                    color: "#047857",
                                                },
                                            }}
                                        />
                                    }
                                    label="All"
                                    labelPlacement="end"
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <Button
                        variant="contained"
                        sx={{
                            mt: "40px",
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
                        Update Information
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default UpdateInformation;
