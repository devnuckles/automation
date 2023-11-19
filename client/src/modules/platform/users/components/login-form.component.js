import React from "react";
import { Formik, Form, Field } from "formik";

import {
    TextField,
    InputAdornment,
    FormGroup,
    FormControlLabel,
    CardActions,
    Button,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import axios from "axios";

import { loginSchema } from "../user.schema";
import { url, useAuth } from "../../../core";
import { useNavigate } from "react-router-dom";
import { setResource } from "../user.helper";

const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/api/auth/login`,
                values
            );

            if (response.status === parseInt(200)) {
                // toast.success("Logged in successfully");
                setResource(response);
                // setTimeout(() => router.push("/dashboard"), 3000);
                login();
                navigate("/projects");
            }
            if (response.status === parseInt(201)) {
                // toast.success("User created successfully");
                navigate("/login");
            }
        } catch (error) {
            console.error(error);
            // toast.error(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{ email: "", password: "", rememberMe: false }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form style={{ width: "90%" }}>
                    <div style={{ width: "100%" }}>
                        <Field
                            as={TextField}
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
                        <Field
                            as={TextField}
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

                        <FormGroup>
                            <FormControlLabel
                                sx={{
                                    mt: "10px",
                                    fontWeight: "bold",
                                }}
                                control={
                                    <Field type="checkbox" name="rememberMe" />
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
                            type="submit"
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
                            disabled={isSubmitting}
                        >
                            Login
                        </Button>
                    </CardActions>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
