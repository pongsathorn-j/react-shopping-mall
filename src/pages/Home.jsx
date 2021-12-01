import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";

import FlashSale from "./product/FlashSale";
import Recommend from "./product/Recommend";
import Banner from "./product/Banner";

const Home = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Banner />
      <Container maxWidth="xl">
        <FlashSale />
        <Recommend />
      </Container>
    </Box>
  );
};

export default Home;
