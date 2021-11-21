import { Breadcrumbs, Container, Typography, Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const styled = {
    border: 0,
  };
  const { t } = useTranslation();

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ pl: 2, mb: 1 }}>
        <Link underline="hover" color="inherit" to="/">
          {t("menuHome")}
        </Link>

        <Typography color="text.primary">{t("menuContact")}</Typography>
      </Breadcrumbs>

      <Container>
        <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
          {t("menuContact")}
        </Typography>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5323.235754698527!2d100.69179853047206!3d13.815453736542894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d6032280d61f3%3A0x10100b25de24820!2z4LiB4Lij4Li44LiH4LmA4LiX4Lie4Lih4Lir4Liy4LiZ4LiE4Lij!5e0!3m2!1sth!2sth!4v1637397002614!5m2!1sth!2sth"
          width="600"
          height="450"
          style={styled}
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </Container>
    </Box>
  );
};

export default Contact;
