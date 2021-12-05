import { Breadcrumbs, Container, Typography, Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Faqs = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ pl: 2, my: 1 }}>
        <Link underline="hover" color="inherit" to="/">
          {t("menuHome")}
        </Link>

        <Typography color="text.primary">{t("faqs")}</Typography>
      </Breadcrumbs>

      <Container maxWidth="xl" sx={{ my: 2 }}>
        <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
          {t("faqs")}
        </Typography>
        <Box component="section" sx={{ ml: 1, my: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Q: Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod,
            provident!
          </Typography>
          <Typography variant="body2">
            <b>A: </b>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Molestias rerum maiores libero reiciendis provident tempore
            perspiciatis alias nulla quo nemo incidunt inventore, ratione eius
            tenetur odio quam dolores magnam! Nulla?
          </Typography>
        </Box>
        <Box component="section" sx={{ ml: 1, my: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Q: Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            nesciunt maiores at vel id?
          </Typography>
          <Typography variant="body2">
            <b>A: </b>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quas, id animi quae perspiciatis unde expedita beatae cumque
            dignissimos nesciunt nihil!
          </Typography>
        </Box>
        <Box component="section" sx={{ ml: 1, my: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Q: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et
            fugit at quos.
          </Typography>
          <Typography variant="body2">
            <b>A: </b>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quaerat aliquid error molestias minus nam sequi debitis adipisci!
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Faqs;
