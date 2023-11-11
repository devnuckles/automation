import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

function createData(
    flat,
    flatLocation,
    flatSize,
    flatMeasurement,
    faceOfFlat,
    flatStatus,
    numOfRooms,
    flatDetails
) {
    return {
        flat,
        flatLocation,
        flatSize,
        flatMeasurement,
        faceOfFlat,
        flatStatus,
        numOfRooms,
        flatDetails,
    };
}

const rows = [
    createData(
        "A1",
        "(Shanta Tower) Mirpur, Dhaka",
        1240,
        "Square Feet",
        "Front Side",
        "Available",
        "2 Bed, 2 Bath",
        "Flat Details"
    ),
];

export default function FlatManagement() {
    return (
        <>
            <div className="row my-5  flat-management-header">
                <div className="col-lg-10 flat-management-tab">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link active"
                                id="home-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#home-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="home-tab-pane"
                                aria-selected="true"
                            >
                                All
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link"
                                id="profile-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#profile-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="profile-tab-pane"
                                aria-selected="false"
                            >
                                Available
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link"
                                id="contact-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#contact-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="contact-tab-pane"
                                aria-selected="false"
                            >
                                Sold
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link"
                                id="contact-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#contact-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="contact-tab-pane"
                                aria-selected="false"
                            >
                                On Going
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="col-lg-2">
                    <div className="flat-management-header-button">
                        <Button className="me-1" variant="outlined" startIcon={<i class="bi bi-funnel"></i>}>
                            Filter
                        </Button>
                        <Button variant="outlined" endIcon={<i class="bi bi-sort-down-alt"></i>}>
                            Default
                        </Button>
                    </div>
                </div>
            </div>
            <div className="row">
                <TableContainer
                    component={Paper}
                    className="flat-management-table"
                >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>FLAT</TableCell>
                                <TableCell align="left">FLAT SIZE</TableCell>
                                <TableCell
                                    align="center"
                                    className="text-center"
                                >
                                    FACE OF FLAT
                                </TableCell>
                                <TableCell
                                    align="center"
                                    className="text-center"
                                >
                                    FLAT STATUS
                                </TableCell>
                                <TableCell align="left" className="text-center">
                                    NUMBER OF ROOM
                                </TableCell>
                                <TableCell align="left" className="text-center">
                                    FLAT DETAILS
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow
                                    key={row.flat}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index === 0 ? (
                                            <div className="flat-management-table-flat">
                                                <div className="flat-management-table-icon d-inline-block me-3">
                                                    <i className="bi bi-houses"></i>
                                                </div>
                                                <div className="flat-management-table-flat-content d-inline-block">
                                                    <h2 className="mb-0">
                                                        {row.flat}
                                                    </h2>
                                                    <p className="mb-0">
                                                        {row.flatLocation}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            row.flat
                                        )}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {index === 0 ? (
                                            <div className="flat-management-table-flat">
                                                <div className="flat-management-table-flat-content d-inline-block">
                                                    <h2 className="mb-0">
                                                        {row.flatSize}
                                                    </h2>
                                                    <p className="mb-0">
                                                        {row.flatMeasurement}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            row.flat
                                        )}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.faceOfFlat}
                                    </TableCell>
                                    <TableCell
                                        className="flat-management-table-flat-status"
                                        align="center"
                                    >
                                        {row.flatStatus}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.numOfRooms}
                                    </TableCell>
                                    <TableCell align="center">
                                        <button
                                            type="button"
                                            className="btn btn-success flat-management-table-details-button"
                                        >
                                            {row.flatDetails}
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}
