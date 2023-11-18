import React from "react";

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
const AddUser = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
                    {" "}
                    <form className="add_user_form">
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
                                    // value=""
                                    label="First Name"
                                    variant="outlined"
                                    focused
                                />
                                <TextField
                                    sx={{ width: "100%", mt: "30px" }}
                                    id="outlined-basic"
                                    type="text"
                                    // value=""
                                    label="Last Name"
                                    focused
                                    variant="outlined"
                                />
                                <TextField
                                    sx={{ width: "100%", mt: "30px" }}
                                    id="outlined-basic"
                                    type="email"
                                    focused
                                    // value=""
                                    label="Email"
                                    variant="outlined"
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
                                    />
                                </FormControl>

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
                                    defaultValue="EUR"
                                    SelectProps={{
                                        native: true,
                                    }}
                                    // variant="standard"
                                    // helperText="Please select your currency"
                                >
                                    {currencies.map((option) => (
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
