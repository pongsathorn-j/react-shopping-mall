import React from "react";
import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

const Main = ({ children }) => {
  const theme = useTheme();
  const breakMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      sx={{ flexDirection: "column", justifyContent: "stretch", flexGrow: 1 }}
      id="back-to-top"
    >
      <Box
        component="main"
        sx={{
          bgcolor: "background.paper",
          mt: breakMdUp ? 13 : 16,
          mx: 2,
          p: 2,
          minHeight: breakMdUp ? "400px" : "300px",
        }}
      >
        {children}
      </Box>
      <ScrollToTop />
      <Divider sx={{ mx: 2 }} />
      <Footer />
    </Box>
  );
};

export default Main;
