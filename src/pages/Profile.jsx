import React from "react";
import { Breadcrumbs, Container, Grid, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.authReducer);
  const { t } = useTranslation();

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ pl: 2, m: 1 }}>
        <Link to="/">{t("menuHome")}</Link>
        <Typography color="text.primary">{t("menuProfile")}</Typography>
      </Breadcrumbs>
      <Container maxWidth="lg">
        <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
          {t("menuProfile")}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={4} md={3} sx={{ textAlign: "right" }}>
            Name:
          </Grid>
          <Grid item xs={8} md={9}>
            {currentUser.name}
          </Grid>
          <Grid item xs={4} md={3} sx={{ textAlign: "right" }}>
            Email:
          </Grid>
          <Grid item xs={8} md={9}>
            {currentUser.email}
          </Grid>
          <Grid item xs={4} md={3} sx={{ textAlign: "right" }}>
            Role:
          </Grid>
          <Grid item xs={8} md={9}>
            {currentUser.role}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;
