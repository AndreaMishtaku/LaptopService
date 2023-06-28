import React, { useState } from "react";
import Table from "../../../components/table";
import CheckIcon from "@mui/icons-material/Check";
import { MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import toast from "react-hot-toast";
import EventManger from "../../../utils/eventManager";

const TicketsAdmin = () => {
  const [rowId, setRowId] = useState<number | undefined>();

  const confirmTicket = async (id: number) => {
    const response = await axios.put(`/ticket/${id}/update-status`);

    if (response?.data.result) {
      toast.success(response.data.message);
      EventManger.raiseRefreshTable("ticket");
    }
    setRowId(undefined);
  };

  const handleDelete = async (id: number) => {
    const response = await axios.delete(`/ticket/${id}`);

    if (response?.data.result) {
      toast.success(response.data.message);
      EventManger.raiseRefreshTable("ticket");
    }
    setRowId(undefined);
  };
  return (
    <Table
      controller={"ticket"}
      actionRow={rowId}
      onRowSelect={setRowId}
      actions={
        <>
          <MenuItem
            sx={{ color: "success.main" }}
            onClick={() => confirmTicket(rowId)}
          >
            <CheckIcon fontSize="small" />
            Confirm
          </MenuItem>
          <MenuItem
            sx={{ color: "error.main" }}
            onClick={() => {
              handleDelete(rowId);
            }}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </MenuItem>
        </>
      }
    />
  );
};

export default TicketsAdmin;
