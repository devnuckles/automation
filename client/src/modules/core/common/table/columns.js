// const getCategory = (categoryID) => {
//     const category = categories.find((c) => c.id == categoryID);
//     return category?.Title || "";
// };
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";


const userListColumns = (handleActionClick) => [
  {
    field: "id",
    headerName: "ID",
    width: 70,
    headerClassName: "table-header-title ",
    cellClassName: "table-data",
  },
  {
    field: "user_name",
    headerName: "USER NAME",
    width: 150,
    headerClassName: "table-header-title ",
    cellClassName: "table-data",
  },
  {
    field: "first_name",
    headerName: "FIRST NAME",
    width: 155,
    headerClassName: "table-header-title",
    cellClassName: "table-data",
  },
  {
    field: "last_name",
    headerName: "LAST NAME",
    width: 155,
    headerClassName: "table-header-title",
    cellClassName: "table-data",
  },
  // {
  //     field: "joinDate",
  //     headerName: "JOIN DATE",
  //     type: "date",
  //     width: 160,
  //     headerClassName: "table-header-title",
  //     cellClassName: "table-data",
  // },

  {
    field: "role",
    headerName: "ROLE",
    width: 120,
    headerClassName: "table-header-title",
    cellClassName: "table-data role-column-data",
  },
  {
    field: "email",
    headerName: "EMAIL ADDRESS",
    width: 250,
    headerClassName: "table-header-title",
    cellClassName: "table-data",
  },
  {
    field: "status",
    headerName: "STATUS",
    width: 120,
    headerClassName: "table-header-title",
    cellClassName: "table-data role-column-data",
  },
  {
    field: "action",
    headerName: "ACTION",
    width: 150,
    headerClassName: "table-header-title",
    cellClassName: "table-data user-management-table-action-button",
    renderCell: (params) => (
      <div onClick={() => handleActionClick(params)}>
        <MoreHorizIcon />
        {params.row.action}
      </div>
    ),
  },
];

const userListrows = [
  {
    id: 1,
    user_name: "jonsnow",
    first_name: "Jon",
    last_name: "Snow",
    role: "Admin",
    email: "jon.snow@example.com",
    status: "active",
  },
].map((row) => ({
  ...row,
}));

export { userListColumns, userListrows };
