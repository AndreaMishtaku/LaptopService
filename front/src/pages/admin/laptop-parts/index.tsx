import React, { useState } from "react";
import Table from "../../../components/table";
import Drawer from "../../../components/drawer";
import { Controller, useForm } from "react-hook-form";
import { Box, TextField, Typography, Button, MenuItem } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";
import EventManger from "../../../utils/eventManager";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const LaptopPartsAdmin = () => {
  const { control, handleSubmit, reset } = useForm();
  const [row, setRow] = useState<number | undefined>();
  const [mode, setMode] = useState<"new" | "edit" | undefined>();

  const onSubmit = async (data: any) => {
    const response = await axios[mode == "new" ? "post" : "put"](
      mode == "new" ? "/laptop-part" : `laptop-part/${row}`,
      {
        price: Number(data.price),
        stock: Number(data.stock),
        ...data,
      }
    );

    if (response?.data.result) {
      toast.success(response.data.message);
      setMode(undefined);
      reset();
      EventManger.raiseRefreshTable("laptop-part");
    }
  };

  const handleDelete = async (id: number) => {
    const response = await axios.delete(`/laptop-part/${id}`);
    if (response?.data.result) {
      toast.success(response.data.message);
      EventManger.raiseRefreshTable("laptop");
    }
    setRow(undefined);
  };

  const fetchModel = async (id: number) => {
    const response = await axios.get(`/laptop-part/${id}`);
    if (response?.data) {
      reset(response.data);
      setMode("edit");
    }
  };

  const handleAdd = () => {
    reset({
      name: "",
      description: "",
      price: "",
      stock: "",
    });
    setMode("new");
  };

  return (
    <>
      <Table
        controller={"laptop-part"}
        onAdd={handleAdd}
        onRowSelect={setRow}
        actions={
          <>
            <MenuItem
              color="secondary"
              onClick={() => {
                fetchModel(row);
              }}
            >
              <EditIcon fontSize="small" />
              Edit
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
      <Drawer
        title="Add laptop part"
        open={mode !== undefined}
        onClose={() => {
          setMode(undefined);
        }}
        actions={
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setMode(undefined)}
            >
              Cancel
            </Button>
          </>
        }
      >
        <form>
          <Box display="flex" flexDirection={"column"} gap={3}>
            <Controller
              control={control}
              name={"name"}
              rules={{ required: true }}
              defaultValue={""}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Name"
                  value={value}
                  size="small"
                  onChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name={"description"}
              rules={{ required: true }}
              defaultValue={""}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Description"
                  value={value}
                  size="small"
                  multiline
                  rows={4}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name={"price"}
              rules={{ required: true }}
              defaultValue={""}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Price"
                  size="small"
                  type="number"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name={"stock"}
              rules={{ required: true }}
              defaultValue={""}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Stock"
                  type="number"
                  size="small"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Box>
        </form>
      </Drawer>
    </>
  );
};

export default LaptopPartsAdmin;
