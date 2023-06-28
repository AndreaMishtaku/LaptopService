import React, { useEffect, useState } from "react";
import Table from "../../../components/table";
import Drawer from "../../../components/drawer";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  TextField,
  Typography,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import EventManger from "../../../utils/eventManager";

const TicketsClient = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [laptops, setLaptops] = useState<Array<any>>();
  const [laptopParts, setLapptopParts] = useState<Array<any>>();

  const { control, handleSubmit, reset } = useForm();

  const fetchLaptops = async () => {
    const response = await axios.get("/laptop/list");
    if (response.data) {
      setLaptops(response.data);
    }
  };

  const fetchLaptopParts = async () => {
    const response = await axios.get("/laptop-part/list");
    if (response.data) {
      setLapptopParts(response.data);
    }
  };

  useEffect(() => {
    if (drawerOpen) {
      fetchLaptopParts();
      fetchLaptops();
    }
  }, [drawerOpen]);

  const onSubmit = async (data: any) => {
    const response = await axios.post("/ticket", { ...data });

    if (response?.data.result) {
      toast.success(response.data.message);
      setDrawerOpen(false);
      reset();
      EventManger.raiseRefreshTable("ticket");
    }
  };
  return (
    <>
      <Table controller={"ticket"} onAdd={() => setDrawerOpen(true)} />
      <Drawer
        title="Create a ticket"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        actions={
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              disabled={
                !(
                  laptops &&
                  laptopParts &&
                  laptops.length > 0 &&
                  laptopParts.length > 0
                )
              }
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
        {laptops && laptopParts && (
          <>
            {laptops.length > 0 && laptopParts.length > 0 ? (
              <form>
                <Box display="flex" flexDirection={"column"} gap={3}>
                  <Controller
                    control={control}
                    name={"description"}
                    rules={{ required: true }}
                    defaultValue={""}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        label="Desciption"
                        value={value}
                        size="small"
                        multiline={true}
                        rows={3}
                        onChange={onChange}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={"laptopId"}
                    rules={{ required: true }}
                    defaultValue={""}
                    render={({ field: { onChange, value } }) => (
                      <FormControl fullWidth size="small">
                        <InputLabel id="laptops">Laptops</InputLabel>
                        <Select
                          labelId="laptops"
                          id="demo-simple-select"
                          value={value}
                          label="Laptops"
                          onChange={onChange}
                        >
                          {laptops.map((l: any) => {
                            return (
                              <MenuItem value={l.id} key={`laptop${l.id}`}>
                                {l.type} {l.model}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    )}
                  />
                  <Controller
                    control={control}
                    name={"laptopPartId"}
                    rules={{ required: true }}
                    defaultValue={""}
                    render={({ field: { onChange, value } }) => (
                      <FormControl fullWidth>
                        <InputLabel id="laptop-parts">Laptop parts</InputLabel>
                        <Select
                          labelId="laptop-parts"
                          value={value}
                          label="Laptop parts"
                          onChange={onChange}
                        >
                          {laptopParts.map((lp: any) => {
                            return (
                              <MenuItem
                                value={lp.id}
                                key={`laptoppart${lp.id}`}
                              >
                                {lp.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Box>
              </form>
            ) : (
              <Typography>
                You cannot book a ticket.No laptop parts or laptop available!
              </Typography>
            )}
          </>
        )}
      </Drawer>
    </>
  );
};

export default TicketsClient;
