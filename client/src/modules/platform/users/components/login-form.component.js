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

import { loginSchema } from "../user.schema";
import { useAuth } from "../../../core";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate(); // Use the useNavigate hook

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            // Your authentication logic here
            // Example: Make an API request to authenticate user
            // If successful, call the login function from useAuth
            // Set isAuthenticated to true
            // If unsuccessful, handle errors appropriately

            // Simulating a successful login for demonstration purposes
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Assuming your authentication logic was successful
            login(); // Call the login function

            // Redirect the user to the /projects route
            navigate("/projects");

            // Continue with any other logic, e.g., show a success message
            console.log("Form submitted with values:", values);
        } catch (error) {
            console.error("Login failed:", error);
            // Handle login failure, e.g., show an error message
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
