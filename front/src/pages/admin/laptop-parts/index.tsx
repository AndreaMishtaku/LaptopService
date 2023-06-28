import React, { useState } from "react";
import Table from "../../../components/table";
import Drawer from "../../../components/drawer";
import { Controller, useForm } from "react-hook-form";
import { Box, TextField, Typography, Button } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";
import EventManger from "../../../utils/eventManager";

const LaptopPartsAdmin = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { control, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const response = await axios.post("/laptop-part", {
      price: Number(data.price),
      stock: Number(data.stock),
      ...data,
    });

    if (response?.data.result) {
      toast.success(response.data.message);
      setDrawerOpen(false);
      EventManger.raiseRefreshTable("laptop-part");
    }
  };
  return (
    <>
      <Table controller={"laptop-part"} onAdd={() => setDrawerOpen(true)} />
      <Drawer
        title="Add laptop part"
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

export default LaptopPartsAdmin;
