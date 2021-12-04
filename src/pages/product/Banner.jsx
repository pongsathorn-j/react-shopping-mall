import React from "react";
import { Box, Link } from "@mui/material";
import Slider from "react-slick";
import styled from "styled-components";

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
      title: "Banner5",
      path: "/assets/img/banner/banner5.png",
    },
    {
      title: "Banner1",
      path: "/assets/img/banner/banner1.jpg",
    },
    // {
    //   title: "Banner3",
    //   path: "/assets/img/banner/banner3.jpg",
    // },

    {
      title: "Banner4",
      path: "/assets/img/banner/banner4.jpg",
    },

    {
      title: "Banner6",
      path: "/assets/img/banner/banner6.jpg",
    },
  ];

  return (
    <Box>
      <SlickWrapper>
        <Slider {...settings}>
          {item.map((items, index) => {
            return (
              <div key={index}>
                <Link src="#">
                  <img src={items.path} alt={items.title} />
                </Link>
              </div>
            );
          })}
        </Slider>
      </SlickWrapper>
    </Box>
  );
};

const SlickWrapper = styled.div`
  .slick-track img {
    max-height: 500px;
    width: 100%;
    object-fit: cover;
  }
`;

export default Banner;
