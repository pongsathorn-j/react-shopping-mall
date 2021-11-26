import React from "react";
import { useParams } from "react-router-dom";
import { Container, Box, Typography } from "@mui/material";
import axios from "axios";
import Slider from "react-slick";
import styled from "styled-components";
import { display } from "@mui/system";

const ArrowWrapper = styled.div`
  .slick-prev:before,
  .slick-next:before {
    color: #e53935;
  }

  .slick-slide img {
    height: 400px;
    width: 100%;
    object-fit: cover;
  }

  .slick-dots {
    position: static;
  }

  .slick-thumb li {
    height: 40px;
    width: 40px;
    // display: inline-block;
  }

  .slick-thumb {
    margin-bottom: 2 rem;
  }

  .slick-thumb li a img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const ProductDetail = () => {
  const { id } = useParams();
  const [dataVal, setDataVal] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://192.168.1.42:3001/shop/");
      setDataVal(res.data.data);
    };
    fetchData();
  }, [id]);

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={`${dataVal && dataVal[i].photo}`} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Container>
        <Typography variant="subtitle1" gutterBottom component="div">
          {id}
        </Typography>
        {console.log(!!dataVal ? dataVal[0].photo : "error")}
        <ArrowWrapper>
          <Slider {...settings}>
            {!!dataVal &&
              dataVal.map((items, index) => {
                return (
                  <div key={items.id}>
                    <img src={items.photo} alt={items.name} />
                  </div>
                );
              })}
          </Slider>
        </ArrowWrapper>
      </Container>
    </Box>
  );
};

export default ProductDetail;
