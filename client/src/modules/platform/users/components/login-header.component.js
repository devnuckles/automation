import { Typography } from "@mui/material";

import { SVG } from "../../../core";

const LoginHeader = () => {
    return (
        <>
            <div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {SVG.dots}
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
        </>
    );
};

export default LoginHeader;
