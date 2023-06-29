import React, { useState } from "react";
import Table from "../../../components/table";
import CheckIcon from "@mui/icons-material/Check";
import { MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import toast from "react-hot-toast";
import EventManger from "../../../utils/eventManager";

const TicketsAdmin = () => {
  const [row, setRow] = useState<number | undefined>();

  const confirmTicket = async (id: number) => {
    const response = await axios.put(`/ticket/${id}/update-status`);

    if (response?.data.result) {
      toast.success(response.data.message);
      EventManger.raiseRefreshTable("ticket");
    }
    setRow(undefined);
  };

  const handleDelete = async (id: number) => {
    const response = await axios.delete(`/ticket/${id}`);

    if (response?.data.result) {
      toast.success(response.data.message);
      EventManger.raiseRefreshTable("ticket");
    }
    setRow(undefined);
  };
  return (
    <Table
      controller={"ticket"}
      onRowSelect={setRow}
      actions={
        <>
          <MenuItem
            sx={{ color: "success.main" }}
            onClick={() => confirmTicket(row)}
          >
            <CheckIcon fontSize="small" />
            Confirm
          </MenuItem>
          <MenuItem
            sx={{ color: "error.main" }}
            onClick={() => {
              handleDelete(row);
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
