import { Breadcrumbs, Button, Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import FlashSale from "./product/FlashSale";
import Recommend from "./product/Recommend";

const Home = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ pl: 2, m: 1 }}>
        <Link to="/">{t("menuHome")}</Link>
        {/* <Typography color="text.primary">Home</Typography> */}
      </Breadcrumbs>
      <Container maxWidth="xl">
        <FlashSale />
        <Recommend />
      </Container>
    </Box>
  );
};

export default Home;
