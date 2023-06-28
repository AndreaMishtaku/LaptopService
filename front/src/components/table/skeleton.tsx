import { Box, Skeleton } from "@mui/material";
import React from "react";

interface ITableSkeleton {
  rowCount: number;
  colCount: number;
}
const TableSkeleton = (props: ITableSkeleton) => {
  const { rowCount, colCount } = props;
  return (
    <Box sx={{ marginTop: "1rem", paddingInline: "1rem" }}>
      {Array(rowCount)
        .fill("")
        .map((x: any, rowIndex: number) => {
          if (rowIndex === 0) {
            return (
              <Box
                key={`skeletonRowBox${rowIndex}`}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <Skeleton sx={{ width: "20%", height: "2.2rem" }} />
                <Skeleton sx={{ width: "30%", height: "2.2rem" }} />
              </Box>
            );
          } else if (rowIndex === rowCount - 1) {
            return (
              <Box
                key={`skeletonRowBox${rowIndex}`}
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  marginTop: "1rem",
                }}
              >
                <Skeleton sx={{ width: "35%", height: "2.2rem" }} />
              </Box>
            );
          } else {
            return (
              <Box
                key={`skeletonRowBox${rowIndex}`}
                sx={{
                  display: "flex",
                  gap: 3,
                  width: "100%",
                  marginBottom: "0.5rem",
                }}
              >
                {Array(colCount)
                  .fill("")
                  .map((x: any, columnIndex: number) => {
                    return (
                      <Skeleton
                        key={`skeleton${rowIndex}${columnIndex}`}
                        sx={{ width: "100%", height: "2.2rem" }}
                      />
                    );
                  })}
              </Box>
            );
          }
        })}
    </Box>
  );
};

export default TableSkeleton;
