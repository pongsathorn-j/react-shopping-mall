import React from "react";
import {
  Breadcrumbs,
  Container,
  FormControlLabel,
  Grid,
  Switch,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const Setting = () => {
  const { menubarMode } = useSelector((state) => state.themeReducer);

  const { t } = useTranslation();

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ pl: 2, m: 1 }}>
        <Link to="/">{t("menuHome")}</Link>
        <Typography color="text.primary">{t("menuSetting")}</Typography>
      </Breadcrumbs>
      <Container maxWidth="lg">
        <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
          {t("menuSetting")}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={8} md={4}>
            {/* Menu Style (for large screen) */}
          </Grid>
          <Grid item xs={4} md={4}></Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Setting;
