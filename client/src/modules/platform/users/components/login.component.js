import * as React from "react";

import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

import {
    Card,
    CardActions,
    CardContent,
    FormGroup,
    InputAdornment,
} from "@mui/material";

export default function Login() {
    return (
        <div className="log_in_bg">
            <div className="login_wrapper">
                <Grid container spacing={1}>
                    <Grid xs={12} sm={6} md={6} className="login_left">
                        <Card
                            sx={{
                                width: "100%",
                                borderRadius: "10px",
                                boxShadow:
                                    "0px 4px 20px 0px rgba(0, 0, 0, 0.35)",
                            }}
                        >
                            <CardContent
                                style={{
                                    paddingTop: "40px",
                                    width: "100%",
                                    paddingBottom: "60px",
                                }}
                                className="login_card_content"
                            >
                                <div>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="51"
                                            height="45"
                                            viewBox="0 0 51 45"
                                            fill="none"
                                        >
                                            <path
                                                opacity="0.6"
                                                d="M29.6667 29.9998C29.6667 33.3186 28.0625 36.3186 25.5 38.3623C23.2917 40.1623 20.375 41.2498 17.1667 41.2498C10.2709 41.2498 4.66669 36.2061 4.66669 29.9998C4.66669 24.8248 8.58335 20.4373 13.875 19.1436C15.3125 22.4061 18.3959 24.9186 22.2084 25.8561C23.25 26.1186 24.3542 26.2498 25.5 26.2498C26.6459 26.2498 27.75 26.1186 28.7917 25.8561C29.3542 27.1311 29.6667 28.5373 29.6667 29.9998Z"
                                                fill="#1E638A"
                                            />
                                            <path
                                                d="M38 15C38 16.4625 37.6875 17.8687 37.125 19.1438C35.6875 22.4062 32.6042 24.9188 28.7917 25.8563C27.75 26.1187 26.6458 26.25 25.5 26.25C24.3542 26.25 23.25 26.1187 22.2083 25.8563C18.3958 24.9188 15.3125 22.4062 13.875 19.1438C13.3125 17.8687 13 16.4625 13 15C13 8.79375 18.6042 3.75 25.5 3.75C32.3958 3.75 38 8.79375 38 15Z"
                                                fill="#1E638A"
                                            />
                                            <path
                                                opacity="0.4"
                                                d="M46.3333 29.9998C46.3333 36.2061 40.7292 41.2498 33.8333 41.2498C30.625 41.2498 27.7083 40.1623 25.5 38.3623C28.0625 36.3186 29.6667 33.3186 29.6667 29.9998C29.6667 28.5373 29.3542 27.1311 28.7917 25.8561C32.6042 24.9186 35.6875 22.4061 37.125 19.1436C42.4167 20.4373 46.3333 24.8248 46.3333 29.9998Z"
                                                fill="#1E638A"
                                            />
                                        </svg>
                                        <Typography
                                            sx={{
                                                ml: "10px",
                                                mt: "5px",
                                                fontWeight: "bold",
                                                fontSize: "25px",
                                            }}
                                        >
                                            Automation
                                        </Typography>
                                    </div>
                                </div>

                                <Typography
                                    sx={{
                                        mb: 1.5,
                                        fontSize: "40px",
                                        fontWeight: "700",
                                        lineHeight: "100px",
                                    }}
                                >
                                    Login
                                </Typography>
                                <form style={{ width: "90%" }}>
                                    <div style={{ width: "100%" }}>
                                        <TextField
                                            sx={{ mb: "30px" }}
                                            fullWidth
                                            type="email"
                                            name="email"
                                            label="Email"
                                            id="fullWidth"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <EmailOutlinedIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <TextField
                                            fullWidth
                                            type="password"
                                            name="password"
                                            label="Password"
                                            id="fullWidth"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LockOpenOutlinedIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />

                                        <FormGroup sm={{}}>
                                            <FormControlLabel
                                                sx={{
                                                    mt: "10px",
                                                    fontWeight: "bold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        sx={{
                                                            color: "#00DB99",
                                                            "&.Mui-checked": {
                                                                color: "#00DB99",
                                                            },
                                                        }}
                                                    />
                                                }
                                                label="Remember Me"
                                            />
                                        </FormGroup>
                                    </div>
                                    <CardActions
                                        sx={{
                                            width: "100%",
                                            margin: "0",
                                            padding: "0",
                                            mt: "20px",
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            sx={{
                                                fontFamily: "Outfit",
                                                fontSize: "18px",
                                                fontWeight: "600",
                                                bgcolor: "#00DB99",
                                                "&:hover": {
                                                    bgcolor: "#00DB99",
                                                },
                                                width: "100%",
                                            }}
                                        >
                                            Login
                                        </Button>
                                    </CardActions>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={12} sm={6} md={6} className="login_right">
                        <div>
                            <img
                                style={{ width: "100%" }}
                                src="/images/login_right_imag.png"
                                alt="loginIcon"
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
