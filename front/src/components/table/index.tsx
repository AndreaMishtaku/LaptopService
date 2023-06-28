import React, { useCallback, useEffect, useState } from "react";
// @mui
import {
  Card,
  Table as MuiTable,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  Box,
  Alert,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import THead from "./table-head";
import TableToolbar from "./table-toolbar";
import axios from "axios";
import { IFilter } from "../../assets/interfaces";
import { eDataType } from "../../assets/enums";
import TableSkeleton from "./skeleton";

interface IOrder {
  field: string;
  order: "asc" | "desc";
}

interface ITable {
  controller: String;
  onAdd?: () => void;
  actionRow?: number;
  onRowSelect?: (id: number | undefined) => void;
  actions?: any;
}

const formatDate = (value: string) => {
  const date = new Date(value); // Assuming you have a Date object

  const formattedDate = date.toLocaleString("en-GB", {
    hour: "numeric",
    minute: "numeric",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formattedDate;
};

const Table = (props: ITable) => {
  const { controller, onAdd, actions, actionRow, onRowSelect } = props;
  const [open, setOpen] = useState(null);

  const [rows, setRows] = useState<Array<any>>();
  const [columns, setColumns] = useState<Array<any>>();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [rowCount, setRowCount] = useState();
  const [filters, setFilters] = useState<Array<IFilter>>([]);

  const fetchData = useCallback(async () => {
    const response = await axios.post(`${controller}/get-all`, {
      pageNumber: page,
      pageSize: pageSize,
      filters: filters,
      search: search,
    });
    if (response?.data) {
      setRows(response.data.rows);
      setColumns(response.data.columns);
      setRowCount(response.data.rowCount);
    }
  }, [page, pageSize, filters, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    document.addEventListener(`refreshTable${controller}`, fetchData);
    return () => {
      document.removeEventListener(`refreshTable${controller}`, fetchData);
    };
  }, [controller, fetchData]);

  const handleOpenMenu = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangePageSize = (event: any) => {
    setPage(0);
    setPageSize(parseInt(event.target.value, 10));
  };

  return (
    <>
      <Container>
        <Card>
          {columns && rows ? (
            <>
              <TableToolbar
                columns={columns ? columns : []}
                searchValue={search}
                onSearchChange={setSearch}
                filters={filters}
                onFiltersChange={setFilters}
                onAdd={onAdd}
              />

              <Box overflow={"auto"}>
                <TableContainer sx={{ minWidth: 800 }}>
                  <MuiTable>
                    <THead columns={columns} actionColumn={Boolean(actions)} />
                    {rows && rows.length > 0 ? (
                      <TableBody>
                        {rows.map((row: any, index: number) => {
                          return (
                            <TableRow hover key={row.id} tabIndex={-1}>
                              {columns.map((c: any) => {
                                if (c.hidden === false) {
                                  return (
                                    <TableCell
                                      align="center"
                                      key={`${c.field}${index}${row[c.field]}`}
                                    >
                                      {c.type === eDataType.DATE
                                        ? formatDate(row[c.field])
                                        : row[c.field]}
                                    </TableCell>
                                  );
                                } else {
                                  return <></>;
                                }
                              })}

                              {actions && (
                                <TableCell align="right">
                                  <IconButton
                                    size="large"
                                    color="inherit"
                                    onClick={(event: any) => {
                                      handleOpenMenu(event);
                                      onRowSelect(row.id);
                                    }}
                                  >
                                    <MoreVertIcon fontSize="small" />
                                  </IconButton>
                                </TableCell>
                              )}
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    ) : (
                      <TableRow
                        sx={{
                          height: 100,
                        }}
                      >
                        <TableCell
                          sx={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            marginTop: 2,
                            textAlign: "center",
                            border: "none",
                            marginBottom: 2,
                          }}
                        >
                          <Alert
                            severity="warning"
                            sx={{ width: "fit-content", margin: " auto" }}
                          >
                            No records!
                          </Alert>
                        </TableCell>
                      </TableRow>
                    )}
                  </MuiTable>
                </TableContainer>
              </Box>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rowCount ? rowCount : 0}
                rowsPerPage={pageSize}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangePageSize}
              />
            </>
          ) : (
            <TableSkeleton rowCount={pageSize + 3} colCount={5} />
          )}
        </Card>
      </Container>

      {actions && (
        <Popover
          open={Boolean(open) && Boolean(actionRow)}
          anchorEl={open}
          onClose={() => {
            handleCloseMenu();
            onRowSelect(undefined);
          }}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: {
              p: 1,
              width: 140,
              "& .MuiMenuItem-root": {
                px: 1,
                typography: "body2",
                borderRadius: 0.75,
              },
            },
          }}
        >
          {actions}
        </Popover>
      )}
    </>
  );
};

export default Table;
