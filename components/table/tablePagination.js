import { useCallback } from "react";
import {
  Grid,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from "@mui/material";

const availablePageLimitOptions = [20, 50, 100, 200];

const TablePagination = ({
  totalResults,
  pageCount,
  pageIndex,
  pageSize,
  setPageSize,
  gotoPage,
}) => {
  const handlePaginationChange = useCallback(
    (_event, page) => {
      gotoPage(page - 1);
    },
    [gotoPage]
  );
  return (
    <Grid container sx={{ py: 1, pt: 3 }} alignItems="center">
      <Grid item xs={4}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography>Rows per page:</Typography>
          <Select
            variant="standard"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            sx={{ mt: "3px" }}
          >
            {availablePageLimitOptions.map((limit) => (
              <MenuItem key={limit} value={limit}>
                {limit}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Grid>

      <Grid item xs={4}>
        <Stack direction="row" justifyContent="center">
          <Pagination
            count={pageCount}
            page={pageIndex + 1}
            onChange={handlePaginationChange}
            showFirstButton
            showLastButton
            sx={{
              ".MuiPaginationItem-page, .MuiPaginationItem-ellipsis": {
                display: "none",
              },
            }}
          />
        </Stack>
      </Grid>

      <Grid item xs={4}>
        {Boolean(totalResults) && (
          <Stack direction="row" justifyContent="flex-end">
            <Typography>
              {pageIndex * pageSize + 1} -{" "}
              {Math.min((pageIndex + 1) * pageSize, totalResults)} of{" "}
              {totalResults}
            </Typography>
          </Stack>
        )}
      </Grid>
    </Grid>
  );
};

export default TablePagination;
