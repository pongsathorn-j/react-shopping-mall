import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    Box,
    Link,
  } from "@mui/material";
  import React from "react";
  import Slider from "react-slick";
  import styled from "styled-components";
  
  const ArrowWrapper = styled.div`
    .slick-arrow {
      border-radius: 40%;
      background-color: rgba(0, 0, 0, 0.54);
    }
  
    .slick-slider {
      padding: 30px;
    }
  `;
  
  const Recommend = () => {
    var settings = {
      dots: false,
      infinite: false,
      lazyLoad: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
  
    const item = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
      <Box sx={{ my: 2, p: 2 }}>
        <Box sx={{ display: "flex", flexDirection:"row", justifyContent: "space-between" }}>
              <Typography>Recommend</Typography>
              <Link href="/">See All</Link>
        </Box>
        <ArrowWrapper>
          <Slider {...settings}>
            {item.map((items, index) => {
              return (
                <Card sx={{ maxWidth: 345 }} key={index}>
                  <CardMedia
                    component="img"
                    height="140"
                    image="/assets/img/not_found.png"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {items}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              );
            })}
          </Slider>
        </ArrowWrapper>
      </Box>
    );
  };
  
  export default Recommend;
  