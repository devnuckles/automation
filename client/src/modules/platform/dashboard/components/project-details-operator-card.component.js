import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function AlignItemsList() {
    return (
        <div className="my-3">
            <h2 className="project-details-common-heading">Project Operator</h2>
            <List
                sx={{
                    width: "100%",
                    maxWidth: 360,
                    backgroundColor: "background.paper",
                }}
                className="list-unstyled"
            >
                <ListItem alignItems="flex-start" className="px-0">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="images/Profile.png" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Jane Cooper"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    UI Designer
                                </Typography>
                                {" • 8 Yrs Exp"}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start" className="px-0">
                    <ListItemAvatar>
                        <Avatar
                            alt="Travis Howard"
                            src="/images/profile-1.png"
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Esther Howard"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    UI Designer
                                </Typography>
                                {" • 8 Yrs Exp"}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start" className="px-0">
                    <ListItemAvatar>
                        <Avatar
                            alt="Cameron Williamson"
                            src="/images/profile 2.png"
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Cameron Williamson"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    UI Designer
                                </Typography>
                                {" • 8 Yrs Exp"}
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
        </div>
    );
}
