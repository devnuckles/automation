import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

//     // {
//     //     field: "fullName",
//     //     headerName: "Full name",
//     //     description: "This column has a value getter and is not sortable.",
//     //     sortable: true,
//     //     width: 160,
//     //     valueGetter: (params) =>
//     //         `${params.row.firstName || ""} ${params.row.lastName || ""}`,
//     // },

const columns = [
    { field: "id", headerName: "USER ID", width: 90 },
    { field: "firstName", headerName: "FIRST NAME", width: 130 },
    { field: "lastName", headerName: "LAST NAME", width: 130 },
    { field: "joinDate", headerName: "JOIN DATE", type: "date", width: 130 },
    { field: "role", headerName: "ROLE", width: 90 },
    { field: "email", headerName: "EMAIL ADDRESS", width: 180 },
    { field: "action", headerName: "ACTION", width: 130 },
];

const rows = [
    {
        id: 1,
        lastName: "Snow",
        firstName: "Jon",
        joinDate: "1985-09-21",
        role: "Admin",
        email: "jon.snow@example.com",
        action: "Edit",
    },
    {
        id: 2,
        lastName: "Lannister",
        firstName: "Cersei",
        joinDate: "1980-05-12",
        role: "Manager",
        email: "cersei.lannister@example.com",
        action: "Delete",
    },
    {
        id: 3,
        lastName: "Lannister",
        firstName: "Jaime",
        joinDate: "1978-03-25",
        role: "Employee",
        email: "jaime.lannister@example.com",
        action: "Edit",
    },
    {
        id: 4,
        lastName: "Stark",
        firstName: "Arya",
        joinDate: "2007-07-21",
        role: "Employee",
        email: "arya.stark@example.com",
        action: "Delete",
    },
    {
        id: 5,
        lastName: "Targaryen",
        firstName: "Daenerys",
        joinDate: "1990-01-12",
        role: "Manager",
        email: "daenerys.targaryen@example.com",
        action: "Edit",
    },
    {
        id: 6,
        lastName: "Melisandre",
        firstName: "Melisandre",
        joinDate: "1873-02-14",
        role: "Admin",
        email: "melisandre@example.com",
        action: "Delete",
    },
    {
        id: 7,
        lastName: "Clifford",
        firstName: "Ferrara",
        joinDate: "1979-11-12",
        role: "Employee",
        email: "ferrara.clifford@example.com",
        action: "Edit",
    },
    {
        id: 8,
        lastName: "Frances",
        firstName: "Rossini",
        joinDate: "1987-07-25",
        role: "Manager",
        email: "rossini.frances@example.com",
        action: "Delete",
    },
    {
        id: 9,
        lastName: "Roxie",
        firstName: "Harvey",
        joinDate: "1958-12-29",
        role: "Admin",
        email: "harvey.roxie@example.com",
        action: "Edit",
    },
].map((row) => ({
    ...row,
    joinDate: new Date(row.joinDate),
}));

export default function UserTable() {
    return (
        <div style={{ height: "90vh", width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}
