import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="col-lg-12 property-video">
            <h2 className="flat-details-common-heading mb-3">Property Video</h2>
            <div className="property-video-tab">
                <Box sx={{ width: "100%" }}>
                    <Box >
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                        > me-2
                            <Tab label="Play Video" {...a11yProps(0)} className="video-tabs me-2 px-3"/>
                            <Tab label="360° Virtual Video" {...a11yProps(1)} className="video-tabs px-4"/>
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <img src="images/property-video.png" alt="Property Video"/>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                    <img src="images/property-video.png" alt="Property Video"/>
                    </CustomTabPanel>
                </Box>
            </div>
        </div>
    );
}


