import React from "react";
import { Container, Link, Typography, Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        py: 5,
      }}
    >
      <Container>
        <Typography variant="body2" color="text.secondary">
          {"Copyright © "}
          <Link color="inherit" href="/">
            Site
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
