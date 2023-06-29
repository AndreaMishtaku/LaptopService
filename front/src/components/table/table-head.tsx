import { TableRow, TableCell, TableHead, TableSortLabel } from "@mui/material";
import { IOrder } from "../../assets/interfaces";
import { eOrder } from "../../assets/enums";

interface ITHead {
  columns: Array<any>;
  actionColumn: boolean;
  order: IOrder;
  applyOrder: (order: IOrder) => void;
}

const THead = (props: ITHead) => {
  const { columns, actionColumn, order, applyOrder } = props;

  return (
    <TableHead>
      <TableRow>
        {columns.map((c: any, index: number) => {
          if (c.hidden === false) {
            return (
              <TableCell
                key={c.name + c.field + index}
                align={"center"}
                sortDirection={
                  order?.key === c.filterProperty
                    ? order.type == eOrder.ASC
                      ? "asc"
                      : "desc"
                    : false
                }
              >
                <TableSortLabel
                  hideSortIcon
                  active={order?.key === c.filterProperty}
                  direction={
                    order?.key === c.filterProperty
                      ? order.type === eOrder.ASC
                        ? "asc"
                        : "desc"
                      : "asc"
                  }
                  onClick={() => {
                    if (order === undefined) {
                      applyOrder({
                        key: c.filterProperty,
                        type: eOrder.ASC,
                      });
                    } else {
                      if (order.key == c.filterProperty) {
                        if (order?.type === eOrder.ASC) {
                          applyOrder({
                            key: c.filterProperty,
                            type: eOrder.DESC,
                          });
                        } else {
                          applyOrder(undefined);
                        }
                      } else {
                        applyOrder({
                          key: c.filterProperty,
                          type: eOrder.ASC,
                        });
                      }
                    }
                  }}
                >
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
