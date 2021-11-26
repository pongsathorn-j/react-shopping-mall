import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
