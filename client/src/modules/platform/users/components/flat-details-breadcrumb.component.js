import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
}

export default function FlatDetailsBreadcrumbs() {
    const breadcrumbs = [
        <Link
            underline="hover"
            key="1"
            color="inherit"
            href="/flat-management"
            onClick={handleClick}
        >
            Flats Management
        </Link>,
        <Typography key="3" color="text.primary">
            Tranquil Haven in the Woods
        </Typography>,
    ];

    return (
        <Stack spacing={2}>
            <Breadcrumbs
                separator={
                    <NavigateNextIcon color="#047857" fontSize="small" />
                }
                aria-label="breadcrumb"
            >
                {breadcrumbs}
            </Breadcrumbs>
        </Stack>
    );
}
