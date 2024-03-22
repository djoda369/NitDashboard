import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

function useTable(options) {
  const table = useReactTable({
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...options,
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    table,
    globalFilter: table.getState().globalFilter,
    setGlobalFilter: table.setGlobalFilter,
    columnFilters: table.getState().columnFilters,
    setColumnFilters: table.setColumnFilters,
  };
}

export { useTable };
