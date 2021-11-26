import React from "react";
import { Box, Link } from "@mui/material";
import Slider from "react-slick";
import styled from "styled-components";

const SlickWrapper = styled.div`
.slick-track img {
  height: calc(60vh);
  width: 100%;
  object-fit: cover;
}

`;

const Banner = () => {
  var settings = {
    dots: true,
    infinite: true,
    lazyLoad: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const item = [
    {
      title: "Banner",
      path: "https://via.placeholder.com/1800x400/000000/FFFFFF/?text=Banner+1800x400",
    },
    {
      title: "Banner",
      path: "https://via.placeholder.com/1800x400/FFFFFF/000000/?text=Banner+1800x400",
    },
    {
      title: "black firday",
      path: "https://place-hold.it/1800x400/666/fff.png/000",
    },
  ];

  return (
    <Box
    >
      <SlickWrapper>
        <Slider {...settings}>
          {item.map((items, index) => {
            return (
              <div key={index}>
                <Link src="#">
                  <img
                    src={items.path}
                    alt={items.title}
                  />
                </Link>
              </div>
            );
          })}
        </Slider>
      </SlickWrapper>
    </Box>
  );
};

export default Banner;