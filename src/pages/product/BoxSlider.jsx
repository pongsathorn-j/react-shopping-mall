import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Box,
  Link,
  IconButton,
} from "@mui/material";
import Slider from "react-slick";
import styled from "styled-components";
import { MdShoppingCart } from "react-icons/md";

const SlickWrapper = styled.div`
  .slick-prev:before,
  .slick-next:before {
    color: #e53935;
  }

 
`;

const BoxSlider = ({ title, product }) => {
  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ my: 4, p: 2, justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography>{title}</Typography>
        <Link href="/">See All</Link>
      </Box>
      <SlickWrapper>
        <Slider
          {...settings}
          style={{ display: "flex", flexDirection: "column", mx: 1 }}
        >
          {product.map((items, index) => {
            return (
              <Card sx={{ maxWidth: 345 }} key={index}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="150"
                  image="/assets/img/not_found.png"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {title}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <IconButton>
                    <MdShoppingCart />
                  </IconButton>
                </CardActions>
              </Card>
            );
          })}
        </Slider>
      </SlickWrapper>
    </Box>
  );
};

export default BoxSlider;
