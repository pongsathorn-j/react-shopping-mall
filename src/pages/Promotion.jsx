import {
  Breadcrumbs,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia,
  Grid,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Promotion = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ pl: 2, my: 1 }}>
        <Link underline="hover" color="inherit" to="/">
          {t("menuHome")}
        </Link>

        <Typography color="text.primary">{t("menuPromotion")}</Typography>
      </Breadcrumbs>

      <Container maxWidth="xl" sx={{ my: 3 }}>
        <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
          {t("menuPromotion")}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={3}>
            <Card>
              <CardMedia
                component="img"
                alt="green iguana"
                height="150"
                image="/assets/img/banner/banner1.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Promotion1
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Neque, laborum! Numquam quaerat, laboriosam nostrum vel
                  incidunt debitis earum quidem esse.
                </Typography>
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button size="small">More..</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Card>
              <CardMedia
                component="img"
                alt="green iguana"
                height="150"
                image="/assets/img/banner/banner5.png"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Promotion2
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Neque, laborum! Numquam quaerat, laboriosam nostrum vel
                  incidunt debitis earum quidem esse.
                </Typography>
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button size="small">More..</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Card>
              <CardMedia
                component="img"
                alt="green iguana"
                height="150"
                image="/assets/img/banner/banner4.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Promotion3
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Neque, laborum! Numquam quaerat, laboriosam nostrum vel
                  incidunt debitis earum quidem esse.
                </Typography>
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button size="small">More..</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Card>
              <CardMedia
                component="img"
                alt="green iguana"
                height="150"
                image="/assets/img/banner/banner6.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Promotion4
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Neque, laborum! Numquam quaerat, laboriosam nostrum vel
                  incidunt debitis earum quidem esse.
                </Typography>
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button size="small">More..</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Card>
              <CardMedia
                component="img"
                alt="green iguana"
                height="150"
                image="/assets/img/banner/banner3.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Promotion5
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Neque, laborum! Numquam quaerat, laboriosam nostrum vel
                  incidunt debitis earum quidem esse.
                </Typography>
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button size="small">More..</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Promotion;
