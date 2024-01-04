import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";
import DynamicDeleteModal from "./dynamic-delete-modal.component";
import Cookies from "js-cookie";
import axios from "axios";

export default function ActionModal() {
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const deleteModalTitle = "Delete User";
  const deleteModalContent =
    "Are you sure you want to delete this User? This action  cannot be undone.";
  const token = Cookies.get("token");
  const id = Cookies.get("id");

  const handleDeleteClick = () => {
    setIsDeleteClicked(true);
  };

  const onDelete = async () => {
    try {
      if (!isDeleteClicked) {
        setIsDeleteClicked(true);
      }

      // Make the API call
      const response = await axios.delete(
        `http://localhost:8080/api/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            identity: id,
          },
        }
      );

      if (response.status === 204) {
        console.log("User deleted successfully");
      } 
    //   else {
    //     console.error("Error deleting user:>>>>>>>>>>>>>>>>>>>>", response);
    //   }
    } catch (error) {
      console.error("Error deleting user: >>>>>>>>>>>>>>>>>>>>", error);
    } finally {
      // Close the modal whether the API call is successful or not
      //   setIsDeleteClicked(false);
    }
  };

  return (
    <>
      {isDeleteClicked ? (
        <DynamicDeleteModal
          title={deleteModalTitle}
          content={deleteModalContent}
          onCancel={() => setIsDeleteClicked(false)}
          onDelete={onDelete}
        />
      ) : (
        <div className="action-modal-wrapper">
          <div className="row">
            <h4>Edit Options</h4>
            <Button
              className="action-modal-button action-modal-edit-button my-2"
              variant="outlined"
              startIcon={<i class="bi bi-archive-fill"></i>}
            >
              Edit
            </Button>
            <Button
              className="action-modal-button action-modal-delete-button"
              variant="outlined"
              startIcon={<DeleteOutlineIcon />}
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
