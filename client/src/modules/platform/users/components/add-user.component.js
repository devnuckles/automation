import React, { useState } from "react";

import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import Cookies from "js-cookie";

const AddUser = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        role: "",
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleInputChange = (field) => (event) => {
        setFormData({ ...formData, [field]: event.target.value });
    };
    const handleFormSubmit = async (event) => {
        const token = Cookies.get("token");
        const id = Cookies.get("id");
        event.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8080/api/add/users",
                formData,
                {
                    headers: {
                        token: `Bearer ${token}`,
                        identity: id,
                    },
                }
            );

            // Handle response
            if (response.status === 200) {
                // Successful API call, you can handle success here
                console.log("User added successfully");
            } else {
                // Handle API error here
                console.error("Failed to add user");
            }
        } catch (error) {
            // Handle network or other errors
            console.error("Error during API call", error);
        }
    };
    const userRole = [
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
        <div className="add_user_main">
            <div className="row">
                <div className="col-lg-6 add-user-main-left-content">
                    <h2 className="add-user-responsive-title">Add User</h2>
                    <h2 className="add-user-title">
                        Real estate automation made easy and fun.
                    </h2>
                    <p className="add-user-paragraph">
                        Start testing in minutes !
                    </p>
                </div>
                <div className="col-lg-6">
                    <form className="add_user_form" onSubmit={handleFormSubmit}>
                        <div style={{ padding: " 0 30px" }}>
                            <div className="add-user-form-input">
                                <TextField
                                    sx={{
                                        width: "48%",
                                        mt: "30px",
                                        mr: "13px",
                                    }}
                                    id="outlined-basic"
                                    type="text"
                                    value={formData.first_name}
                                    label="First Name"
                                    variant="outlined"
                                    focused
                                    onChange={handleInputChange("first_name")}
                                />
                                <TextField
                                    sx={{ width: "100%", mt: "30px" }}
                                    id="outlined-basic"
                                    type="text"
                                    value={formData.last_name}
                                    label="Last Name"
                                    focused
                                    variant="outlined"
                                    onChange={handleInputChange("last_name")}
                                />
                                <TextField
                                    sx={{ width: "100%", mt: "30px" }}
                                    id="outlined-basic"
                                    type="email"
                                    focused
                                    value={formData.email}
                                    label="Email"
                                    variant="outlined"
                                    onChange={handleInputChange("email")}
                                />

                                <FormControl
                                    sx={{ mt: "30px", width: "100%" }}
                                    variant="outlined"
                                    focused
                                >
                                    <InputLabel htmlFor="outlined-adornment-password">
                                        Password
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                        value={formData.password}
                                        onChange={handleInputChange("Password")}
                                    />
                                </FormControl>

                                <FormControl
                                    sx={{ mt: "30px", width: "100%" }}
                                    variant="outlined"
                                    focused
                                >
                                    <InputLabel htmlFor="outlined-adornment-password">
                                        Confirm Password
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Confirm Password"
                                        value={formData.confirm_password}
                                        onChange={handleInputChange(
                                            "confirm_password"
                                        )}
                                    />
                                </FormControl>

                                <TextField
                                    focused
                                    sx={{
                                        mt: "30px",
                                        width: "100%",
                                        color: "black",
                                    }}
                                    id="outlined-select-role"
                                    select
                                    label="Role"
                                    defaultValue="Operator"
                                    SelectProps={{
                                        native: true,
                                    }}
                                    value={formData.role}
                                    onChange={handleInputChange("role")}

                                    // variant="standard"
                                    // helperText="Please select your currency"
                                >
                                    {userRole.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            <p className="options">
                                                {option.label}
                                            </p>
                                        </option>
                                    ))}
                                </TextField>
                            </div>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    mt: "40px",
                                    fontFamily: "Outfit",
                                    fontSize: "18px",
                                    fontWeight: "600",
                                    backgroundColor: "#047857",
                                    "&:hover": {
                                        backgroundColor: "#047857",
                                    },
                                    width: "100%",
                                }}
                            >
                                Add User
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
