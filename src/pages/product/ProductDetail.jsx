import React from "react";
import { useParams } from "react-router-dom";
import { Container, Box } from "@mui/material";
import axios from "axios";
import Slider from "react-slick";
import styled from "styled-components";

const ProductDetail = () => {
  const { id } = useParams();
  const [dataVal, setDataVal] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(process.env.REACT_APP_API_BASE + "/shop/");
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
    <Box sx={{ display: "block" }}>
      <Container>
        {/* <Typography variant="subtitle1" gutterBottom component="div"> */}
        <h3>{id}sdfdsfdsfdsfdsfdsfdsfhjhgjghjghj</h3>
        {/* </Typography> */}
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores,
          et! Corrupti quidem neque, minus sequi fugit iure itaque ipsum
          repellat. Veniam, quasi numquam aspernatur iure quo hic laboriosam
          nihil alias.
        </p>
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

export default ProductDetail;
