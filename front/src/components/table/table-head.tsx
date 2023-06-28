import { TableRow, TableCell, TableHead, TableSortLabel } from "@mui/material";

interface ITHead {
  columns: Array<any>;
  actionColumn: boolean;
}

const THead = (props: ITHead) => {
  const { columns, actionColumn } = props;

  return (
    <TableHead>
      <TableRow>
        {columns.map((c: any) => {
          if (c.hidden === false) {
            return (
              <TableCell
                key={c.name + c.field}
                align={"center"}
                sortDirection={false}
              >
                <TableSortLabel hideSortIcon active={false} direction={"asc"}>
                  {c.name}
                </TableSortLabel>
              </TableCell>
            );
          } else {
            return <></>;
          }
        })}
        {actionColumn && <TableCell> </TableCell>}
      </TableRow>
    </TableHead>
  );
};

export default THead;
