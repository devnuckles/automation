import React from "react";
import "./addUser.css";
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
    <div className="log_in_bg add_user_main">
      <form className="add_user_form">
        <div style={{ padding: "30px" }}>
          <Typography
            sx={{
              color: "#989898",
              fontWeight: "600",
              fontSize: "48px",
              letterSpacing: "-0.96px",
            }}
            variant="h3"
            component="h2"
          >
            Add User
          </Typography>
          <div>
            <TextField
              sx={{ width: "100%", mt: "30px" }}
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

            <FormControl sx={{ mt: "30px", width: "100%" }} variant="outlined" focused>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            
            <FormControl sx={{ mt: "30px", width: "100%" }} variant="outlined" focused>
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
            </FormControl>

            <TextField
            focused
              sx={{ mt: "30px", width: "100%", color: "black" }}
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
            Add User
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
