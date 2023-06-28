import { styled, alpha, useTheme } from "@mui/material/styles";
import {
  Tooltip,
  OutlinedInput,
  InputAdornment,
  Box,
  Button,
  Grow,
  Typography,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Filter from "./filter";
import { indigo } from "@mui/material/colors";
import { eOperation } from "../../assets/enums";
import CloseIcon from "@mui/icons-material/Close";

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
  }),
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

interface ITableToolbar {
  columns: Array<any>;
  searchValue: String;
  filters: Array<any>;
  onSearchChange: (value: any) => void;
  onFiltersChange: (conditions: Array<any>) => void;
  onAdd?: () => void;
}

const getCondition = (condition: eOperation) => {
  switch (condition) {
    case eOperation.EQUAL:
      return "=";
    case eOperation.LIKE:
      return "contains";
    case eOperation.GREATER_THAN:
      return ">";
    case eOperation.LESS_THAN:
      return "<";
    default:
      return "=";
  }
};

const TableToolbar = (props: ITableToolbar) => {
  const {
    columns,
    searchValue,
    filters,
    onSearchChange,
    onFiltersChange,
    onAdd,
  } = props;

  const theme = useTheme();
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "0.5rem",
          marginBottom: "0.2rem",
          paddingX: "0.5rem",
          paddingTop: "0.5rem",
        }}
      >
        <Box display={"flex"}>
          <Filter
            columns={columns}
            filters={filters}
            onFiltersChange={onFiltersChange}
          />

          {onAdd && (
            <Button onClick={onAdd}>
              <AddCircleIcon fontSize="small" sx={{ marginRight: "2px" }} /> Add
            </Button>
          )}
        </Box>

        <StyledSearch
          size="small"
          value={searchValue}
          onChange={(e: any) => {
            onSearchChange(e.target.value);
          }}
          placeholder="Search..."
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          }
        />
      </Box>
      <Grow in={filters && filters.length > 0} timeout={1000}>
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }} mx={5} my={2}>
          {filters?.map((rendered: any) => {
            const col = columns?.find(
              (col: any) => col.filterProperty === rendered.key
            );
            return (
              <Box
                key={`firstOr${rendered.key}${rendered.value}`}
                sx={{
                  display: "flex",
                  gap: 3,
                  borderBottom: `1px solid blue`,
                  backgroundColor: indigo[50],
                  alignItems: "center",
                  paddingLeft: "1rem",
                  paddingRight: "0.4rem",
                  borderRadius: 0.5,
                  transition: "0.5s ease",
                  "&:hover": {
                    backgroundColor: theme.palette.grey[200],
                  },
                  width: "fit-content",
                }}
              >
                <Typography color="primary" fontSize={14}>
                  <b>{col?.name} </b>
                  {getCondition(rendered.operation)}
                  <b> {rendered.value}</b>
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => {
                    const temp = [
                      ...filters.filter(
                        (f: any) =>
                          !(
                            f.key === rendered.key &&
                            f.operation === rendered.operation
                          )
                      ),
                    ];
                    onFiltersChange(temp);
                  }}
                >
                  <CloseIcon color="primary" fontSize="small" />
                </IconButton>
              </Box>
            );
          })}
        </Box>
      </Grow>
    </Box>
  );
};

export default TableToolbar;
