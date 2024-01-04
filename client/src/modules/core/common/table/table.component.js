import { DataGrid } from "@mui/x-data-grid";
import { userListColumns, userListrows } from "./columns";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ActionModal from "../../../platform/users/components/action-modal.component";

export default function Table({ tableFor }) {
  const [data, setData] = useState([]);
  const token = Cookies.get("token");
  const id = Cookies.get("id");
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const list = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users?role=super-admin&pivot=1&offset=0&limit=2`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              identity: id,
            },
          }
        );

        if (response.status === 204) {
          console.log("No content in the response");
        } else {
          console.log(response.data);
          setData(response.data.data.users);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    list();
  }, [token, id]);

  const handleActionClick = (params) => {
    setSelectedRow(params.row);
    setIsModalOpen(true);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>", isModalOpen, selectedRow)

  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      {tableFor === "userList" && (
        <>
          <DataGrid
            rows={userListrows}
            columns={userListColumns(handleActionClick)}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 20]}
            checkboxSelection
          />

          {isModalOpen && (
            <ActionModal rowData={selectedRow} onClose={handleCloseModal} />
          )}
        </>
      )}
    </div>
  );
}
