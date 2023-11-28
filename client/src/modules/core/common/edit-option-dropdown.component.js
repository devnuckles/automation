import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

export default function EditOptionDropdown() {
    return (
        <div className="edit-option-dropdown">
            <h3 className="edit-option-dropdown-title">Edit options</h3>
            <List
                sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgColor: "background.paper",
                }}
                className="p-0"
            >
                <ListItem className="py-0">
                    <ListItemAvatar>
                    <i class="bi bi-archive-fill"></i>
                    </ListItemAvatar>
                    <ListItemText primary="Photos" className="edit-option-dropdown-list-text"/>
                </ListItem>
                <ListItem className="py-0">
                    <ListItemAvatar>
                    <i class="bi bi-trash-fill"></i>
                    </ListItemAvatar>
                    <ListItemText primary="Work" className="edit-option-dropdown-list-text"/>
                </ListItem>
            </List>
        </div>
    );
}
