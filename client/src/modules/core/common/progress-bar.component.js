import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";

function LinearProgressWithLabel(props) {
    return (
        <>
            <Box sx={{ minWidth: 35, marginTop: 1 }}>
                <Typography variant="body2" color="text.secondary">
                    <span className="progress-bar-text text-start">
                        progress
                    </span>
                    <span className="progress-bar-text text-end">{`${Math.round(
                        props.value
                    )}%`}</span>
                </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ width: "100%" }}>
                    <LinearProgress
                        variant="determinate"
                        {...props}
                        sx={{
                            height: 10,
                            "& .MuiLinearProgress-bar": {
                                backgroundColor: "#00db99",
                            },
                            borderRadius: "5px",
                            background: "#F1F2F7",
                            // Adjust the padding value as needed
                        }}
                    />
                </Box>
            </Box>
        </>
    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};

export default function ProgressBar() {
    const [progress, setProgress] = useState(10);

    return (
        <Box sx={{ width: "100%" }}>
            <LinearProgressWithLabel value={progress} />
        </Box>
    );
}
