import React from "react";
import {
  Alert,
  Checkbox,
  InputAdornment,
  Popover,
  Box,
  Button,
  FormControl,
  MenuItem,
  styled,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Controller, useForm } from "react-hook-form";
import { IColumn, IFilter } from "../../assets/interfaces";
import { eOperation, eDataType } from "../../assets/enums";
import { indigo } from "@mui/material/colors";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";

interface FilterProps {
  columns: IColumn[];
  onFiltersChange: (selectedConditions: IFilter[]) => void;
  filters: IFilter[];
}

const FilterNumber = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "-2px",
  right: "-6px",
  backgroundColor: `${theme.palette.primary.main}`,
  color: "white",
  borderRadius: "80%",
  width: "20px",
  height: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const Filter = (props: FilterProps) => {
  const { columns, onFiltersChange, filters } = props;

  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: { operation: -1, value: undefined },
  });

  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const [operationValueAnchorEl, setOperationValueAnchorEl] =
    useState<any>(null);
  const [filterColumn, setFilterColumn] = useState<any>();
  const [searchColumn, setSearchColumn] = useState<any>("");

  const theme = useTheme();

  const getOperators = (filterColumn: IColumn) => {
    const operators: any = [];
    if (filterColumn) {
      if (filterColumn.type === eDataType.STRING) {
        operators.push({
          value: eOperation.EQUAL,
          operation: "equal",
        });
        operators.push({
          value: eOperation.LIKE,
          operation: "contains",
        });
      } else if (
        filterColumn.type === eDataType.NUMBER ||
        filterColumn.type === eDataType.DATE
      ) {
        operators.push({
          value: eOperation.EQUAL,
          operation: "equal",
        });
        operators.push({
          value: eOperation.GREATER_THAN,
          operation: ">",
        });
        operators.push({
          value: eOperation.LESS_THAN,
          operation: "<",
        });
      }
    }
    return operators;
  };

  const renderValueInput = (
    filterColumn: any,
    value: any,
    onChange: (data: any) => void
  ) => {
    let input;
    if (filterColumn) {
      switch (filterColumn.propertyType) {
        case eDataType.DATE:
          input = <input type="date" value={value} onChange={onChange} />;
          break;

        default:
          input = (
            <TextField
              disabled={!filterColumn}
              type={filterColumn.type === eDataType.NUMBER ? "number" : "text"}
              size="small"
              label="Value"
              value={value}
              onChange={onChange}
            />
          );
          break;
      }
    }
    return (
      <FormControl fullWidth size="small">
        {input}
      </FormControl>
    );
  };
  const handleCloseFilter = () => {
    setOpenPopover(false);
  };

  const onFilterAdd = (data: any) => {
    const existingFilter = filters.find(
      (f: any) => f.key === filterColumn.field
    );
    if (existingFilter && filters.length === 1) {
      onFiltersChange([
        {
          key: filterColumn.filterProperty,
          ...data,
        },
      ]);
    } else if (existingFilter) {
      onFiltersChange([
        ...filters.filter((f: any) => f.key !== filterColumn.field),
        {
          key: filterColumn.filterProperty,
          ...data,
        },
      ]);
    } else {
      onFiltersChange([
        ...filters,
        {
          key: filterColumn.filterProperty,
          ...data,
        },
      ]);
    }
    setFilterColumn(undefined);
    setOperationValueAnchorEl(null);
    reset();
  };

  return (
    <>
      <Button
        color="secondary"
        id="filter"
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
          setOpenPopover(true);
        }}
        sx={{ minWidth: "30px", px: { xs: 1, md: 2 } }}
      >
        <FilterListIcon fontSize="small" sx={{ marginRight: "2px" }} />
        Filter
        {filters.length > 0 && !openPopover && (
          <FilterNumber fontSize="small">{filters.length}</FilterNumber>
        )}
      </Button>
      <Popover
        id={"filter"}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={() => {
          handleCloseFilter();
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
          }}
        >
          <Box>
            <Box
              sx={{
                paddingInline: "0.8rem",
                paddingBlock: "0.8rem",
                position: "sticky",
                top: 0,
                right: 0,
                backgroundColor: (theme) => theme.palette.background.paper,
                zIndex: 1,
              }}
            >
              <TextField
                value={searchColumn}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setSearchColumn(event.target.value);
                }}
                size="small"
                sx={{ width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ color: "text.primary" }}
                    >
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            {columns.filter(
              (col: IColumn) =>
                col.hidden === false && col.name?.includes(searchColumn)
            ).length > 0 ? (
              columns
                .filter(
                  (col) =>
                    col.hidden === false && col.name?.includes(searchColumn)
                )
                .map((col: any) => (
                  <MenuItem
                    key={`opt${col.field}`}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      backgroundColor:
                        filterColumn?.field === col.field ? indigo[50] : "",
                      px: 4,
                    }}
                    onClick={(e) => {
                      setOperationValueAnchorEl(e.currentTarget);
                      setFilterColumn(col);
                    }}
                  >
                    <Typography
                      sx={{
                        color:
                          filterColumn?.field === col.field
                            ? theme.palette.primary.main
                            : "",
                        py: 1,
                      }}
                    >
                      {col.name}
                    </Typography>
                    <ArrowForwardIosIcon
                      color={
                        filterColumn?.field === col.field
                          ? "primary"
                          : "secondary"
                      }
                      sx={{ fontSize: "0.8rem" }}
                    />
                  </MenuItem>
                ))
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginY: "1rem",
                  paddingInline: "0.8rem",
                }}
              >
                <Alert severity="warning">Nuk gjenden te dhena</Alert>
              </Box>
            )}
          </Box>

          <Popover
            id={"operationValue"}
            open={Boolean(operationValueAnchorEl && filterColumn)}
            anchorEl={operationValueAnchorEl}
            onClose={() => {
              setOperationValueAnchorEl(null);
              setFilterColumn(undefined);
              reset();
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{ marginLeft: "0.5rem" }}
          >
            <Box py={2}>
              <form onSubmit={handleSubmit(onFilterAdd)}>
                <Controller
                  control={control}
                  name={"operation"}
                  render={({ field: { onChange, value } }) => (
                    <>
                      {getOperators(filterColumn)?.map((o: any) => (
                        <MenuItem
                          key={`opt${o.value}`}
                          sx={{
                            paddingY: 0.5,
                            paddingX: "10px",
                            backgroundColor:
                              value === o.value ? indigo[50] : "",
                          }}
                          onClick={() => {
                            if (o.value !== value) {
                              onChange(o.value);
                            } else {
                              if (value === o.value) {
                                onChange(-1);
                              }
                            }
                          }}
                        >
                          <Checkbox
                            checked={value === o.value}
                            size="small"
                            sx={{ marginRight: "0.8rem" }}
                          />
                          <Typography
                            sx={{
                              color:
                                value === o.value
                                  ? theme.palette.primary.main
                                  : "",
                            }}
                          >
                            {o.operation}
                          </Typography>
                        </MenuItem>
                      ))}
                    </>
                  )}
                />
                <Box sx={{ paddingInline: "0.8rem", margin: "0.8rem 0.3rem" }}>
                  <Controller
                    control={control}
                    name={"value"}
                    render={({ field: { onChange, value } }) => (
                      <>{renderValueInput(filterColumn, value, onChange)}</>
                    )}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    paddingInline: "0.8rem",
                    marginBottom: "0.8rem",
                  }}
                >
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={
                      !(
                        watch("value") !== "" &&
                        watch("value") !== undefined &&
                        watch("value") !== null &&
                        watch("operation") !== -1
                      )
                    }
                  >
                    Shto
                  </Button>
                </Box>
              </form>
            </Box>
          </Popover>
        </Box>
      </Popover>
    </>
  );
};

export default Filter;
