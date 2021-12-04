import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Box,
  IconButton,
} from "@mui/material";
import Slider from "react-slick";
import styled from "styled-components";
import { MdAddShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/action/cartAction";
import { TagSale } from "../../styles/myStyle";

const BoxSlider = ({ title, product, seeAll }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartReducer);

  const addCart = (p) => {
    const product = {
      _id: p._id,
      name: p.title,
      photo: p.photo,
      price: p.price,
      discount: p.discount,
      quantity: p.quantity,
      qty: 1,
    };
    dispatch(addToCart(product, cart));
  };
  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 720,
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
          mb: 2,
        }}
      >
        <Typography variant="h5">{title}</Typography>
        <Link to={seeAll} title={title}>
          See All
        </Link>
      </Box>
      <SlickWrapper>
        <Slider
          {...settings}
          style={{ display: "flex", flexDirection: "column", mx: 1 }}
        >
          {!!product &&
            product.map((items, index) => {
              return (
                <Card
                  sx={{
                    maxWidth: 280,
                  }}
                  key={items._id}
                >
                  <Link to={`/product/detail/${items._id}`}>
                    <CardMedia
                      component="div"
                      style={{
                        maxWidth: 280,
                        padding: "5px",
                        backgroundColor: "#fff",
                        position: "relative",
                      }}
                    >
                      {items.discount_percentage > 0 && (
                        <TagSale style={{ color: "#fff" }}>
                          -{Math.ceil(items.discount_percentage)}%
                        </TagSale>
                      )}

                      <CardMedia
                        component="img"
                        alt="green iguana"
                        image={items?.photo[0]}
                        style={{
                          maxHeight: "180px",
                          width: "auto",
                          // maxWidth: 250,
                          margin: "0 auto",
                          objectFit: "cover",
                        }}
                      />
                    </CardMedia>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="subtitle2"
                        component="div"
                        sx={{
                          lineHeight: "1.5em",
                          height: "3em",
                          overflow: "hidden",
                          color: "text.primary",
                        }}
                      >
                        {items.title}
                      </Typography>
                    </CardContent>
                  </Link>
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      // height: "2vw",
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ mx: 1 }}
                    >
                      {!!items.discount && items.discount !== 0 ? (
                        <>
                          <span style={{ color: "#ff0000" }}>
                            ฿{items.price - items.discount}
                          </span>
                          <small>
                            <sup>
                              <del>{items.price}</del>
                            </sup>
                          </small>
                        </>
                      ) : (
                        <span>฿{items.price}</span>
                      )}
                    </Typography>
                    <IconButton onClick={() => addCart(items)}>
                      <MdAddShoppingCart />
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

const SlickWrapper = styled.div`
  .slick-prev:before,
  .slick-next:before {
    color: #e53935;
  }
`;

export default BoxSlider;
