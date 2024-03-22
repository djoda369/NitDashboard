import React from "react";
import {
  Box,
  Table as MUITable,
  Skeleton,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { flexRender } from "@tanstack/react-table";

const DefaultTanstackTable = ({
  table,
  status,
  enablePagination = false,
  TableProps,
  SkeletonProps = { rows: 100 },
  totalResults,
  rowProps,
}) => {
  // Skeleton Setup
  const { rows: skeletonRows, ...restSkeletonProps } = SkeletonProps;

  return (
    <>
      <Box
        sx={{
          overflowX: "auto",
          border: "1px solid #EBEDEF",
          borderBottom: "none",
          borderRadius: "6px",
          width: "100%",
          whiteSpace: "nowrap",
        }}
      >
        <MUITable {...TableProps}>
          {/* Header */}
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    //@ts-expect-error
                    align={header.column.columnDef.meta?.align}
                    sortDirection={header.column.getIsSorted()}
                    sx={{
                      borderColor: "#EBEDEF",
                      color: "#000000",
                      height: 40,
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          {/* Body */}
          {status === "success" && (
            <TableBody>
              {table.getRowModel().rows.map((row) => {
                let additionalProps = {};
                if (rowProps) {
                  additionalProps = rowProps(row.original);
                }

                return (
                  <TableRow key={row.id} {...additionalProps}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        //@ts-expect-error
                        align={cell.column.columnDef.meta?.align}
                        sx={{
                          borderColor: "#EBEDEF",
                          height: 40,
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          )}

          {status === "loading" && (
            <TableBody>
              {Array.from({ length: skeletonRows }).map((row, index) => (
                <TableRow key={index} {...restSkeletonProps}>
                  {table.getHeaderGroups().map((headerGroup) =>
                    headerGroup.headers.map((header) => (
                      <TableCell
                        key={header.id}
                        //@ts-expect-error
                        align={header.column.columnDef.meta?.align}
                        sx={{
                          borderColor: "#EBEDEF",
                          height: 40,
                        }}
                      >
                        <Skeleton width="100%" height={15} variant="rounded" />
                      </TableCell>
                    ))
                  )}
                </TableRow>
              ))}
            </TableBody>
          )}
        </MUITable>
      </Box>

      {/**
       * Status: success and empty data -> displays empty message
       */}
      {/* {status === "success" && totalResults === 0 && <TableEmptyMessage />} */}

      {/**
       * Status: error -> displays error message
       */}
      {/* {status === "error" && <TableErrorMessage />} */}

      {/* {enablePagination && (
        <TablePagination
          gotoPage={table.setPageIndex}
          totalResults={totalResults}
          pageCount={table.getPageCount()}
          pageIndex={table.getState().pagination.pageIndex}
          pageSize={table.getState().pagination.pageSize}
          setPageSize={table.setPageSize}
        />
      )} */}
    </>
  );
};

export default DefaultTanstackTable;
