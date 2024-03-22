import React from "react";
import { Box, Typography } from "@mui/material";

const TextFormatter = ({ value, ...rest }) => {
  return (
    <Box>
      <Typography
        pr={2}
        sx={{
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
          ...(rest.sx ?? {}),
        }}
        // component="span"
        {...rest}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default TextFormatter;
