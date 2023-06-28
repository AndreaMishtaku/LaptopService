import React, { useState } from "react";
import Table from "../../../components/table";
import Drawer from "../../../components/drawer";
import { Controller, useForm } from "react-hook-form";
import { Box, TextField, Typography, Button, MenuItem } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import EventManger from "../../../utils/eventManager";
import DeleteIcon from "@mui/icons-material/Delete";

const LaptopsClient = () => {
  const { control, handleSubmit, reset } = useForm();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [rowId, setRowId] = useState<number | undefined>();

  const onSubmit = async (data: any) => {
    const response = await axios.post("/laptop", { ...data });

    if (response?.data.result) {
      toast.success(response.data.message);
      setDrawerOpen(false);
      reset();
      EventManger.raiseRefreshTable("laptop");
    }
  };

  const handleDelete = async (id: number) => {
    const response = await axios.delete(`/laptop/${id}`);

    if (response?.data.result) {
      toast.success(response.data.message);
      EventManger.raiseRefreshTable("laptop");
    }
    setRowId(undefined);
  };

  return (
    <>
      <Table
        controller={"laptop"}
        onAdd={() => setDrawerOpen(true)}
        actionRow={rowId}
        onRowSelect={setRowId}
        actions={
          <>
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
      <Drawer
        title="Add laptop"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
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
              onClick={() => setDrawerOpen(false)}
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
