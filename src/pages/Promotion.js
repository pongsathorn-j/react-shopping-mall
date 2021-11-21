import { Breadcrumbs, Container, Typography, Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Promotion = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ pl: 2, mb: 1 }}>
        <Link underline="hover" color="inherit" to="/">
          {t("menuHome")}
        </Link>

        <Typography color="text.primary">{t("menuPromotion")}</Typography>
      </Breadcrumbs>

      <Container>
        <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
          {t("menuPromotion")}
        </Typography>
      </Container>
    </Box>
  );
};

export default Promotion;
