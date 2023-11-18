import React from "react";
import { Card, CardContent, Grid } from "@mui/material";

import LoginHeader from "./login-header.component";
import LoginForm from "./login-form.component";

export default function Login() {
    return (
        <div className="log_in_bg">
            <div className="login_wrapper">
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} md={6} className="login_left">
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
                                <LoginHeader />
                                <LoginForm />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} className="login_right">
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
