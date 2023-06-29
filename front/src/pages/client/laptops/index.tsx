import React, { useState } from "react";
import Table from "../../../components/table";
import Drawer from "../../../components/drawer";
import { Controller, useForm } from "react-hook-form";
import { Box, TextField, Typography, Button, MenuItem } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import EventManger from "../../../utils/eventManager";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const LaptopsClient = () => {
  const { control, handleSubmit, reset } = useForm();

  const [row, setRow] = useState<number | undefined>();
  const [mode, setMode] = useState<"new" | "edit" | undefined>();

  const onSubmit = async (data: any) => {
    const response = await axios[mode == "new" ? "post" : "put"](
      mode == "new" ? "/laptop" : `laptop/${row}`,
      {
        ...data,
      }
    );

    if (response?.data.result) {
      toast.success(response.data.message);
      setMode(undefined);
      reset();
      EventManger.raiseRefreshTable("laptop");
    }

    setRow(undefined);
  };

  const handleDelete = async (id: number) => {
    const response = await axios.delete(`/laptop/${id}`);
    if (response?.data.result) {
      toast.success(response.data.message);
      EventManger.raiseRefreshTable("laptop");
    }
    setRow(undefined);
  };

  const fetchModel = async (id: number) => {
    const response = await axios.get(`/laptop/${id}`);
    if (response?.data) {
      reset(response.data);
      setMode("edit");
    }
  };

  const handleAdd = () => {
    reset({
      type: "",
      model: "",
      producedAt: "",
    });
    setMode("new");
  };

  return (
    <>
      <Table
        controller={"laptop"}
        onAdd={handleAdd}
        onRowSelect={setRow}
        actions={
          <>
            <MenuItem
              sx={{ color: "secondary.main" }}
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
        title="Add laptop"
        open={mode !== undefined}
        onClose={() => setMode(undefined)}
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
              name={"type"}
              rules={{ required: true }}
              defaultValue={""}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Type"
                  value={value}
                  size="small"
                  onChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name={"model"}
              rules={{ required: true }}
              defaultValue={""}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Model"
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
              name={"producedAt"}
              rules={{ required: true }}
              defaultValue={""}
              render={({ field: { onChange, value } }) => {
                return (
                  <Box display={"flex"} gap={2}>
                    <Typography>Produced At</Typography>
                    <input
                      type="date"
                      value={value}
                      onChange={onChange}
                      style={{ width: "100%" }}
                    />
                  </Box>
                );
              }}
            />
          </Box>
        </form>
      </Drawer>
    </>
  );
};

export default LaptopsClient;
