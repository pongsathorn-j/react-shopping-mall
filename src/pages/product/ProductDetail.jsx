import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Box,
  Grid,
  Typography,
  Divider,
  Breadcrumbs,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import axios from "axios";
import Slider from "react-slick";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/action/cartAction";
import BoxSlider from "./BoxSlider";
import Loader from "../../components/Loader";

const ProductDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [dataVal, setDataVal] = React.useState();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartReducer);
  const [productCatelogy, setProductCatelogy] = React.useState([]);
  const [productCatelogyTitle, setproductCatelogyTitle] = React.useState();
  const [reviews, setReviews] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

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

  React.useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        setLoading(true);
        const res = await axios.get(
          process.env.REACT_APP_API_BASE + "/product/" + id
        );
        let categoryId = res.data.data[0].categoryId[0]._id;
        const resCategory = await axios.get(
          process.env.REACT_APP_API_BASE +
            "/product/category/" +
            categoryId +
            "/1"
        );
        let categoryTitle = res.data.data[0].categoryId[0].title;
        setproductCatelogyTitle(categoryTitle);
        setProductCatelogy(resCategory.data.data);
        setDataVal(res.data.data);
        setLoading(false);
      } catch (error) {
        setError(JSON.stringify(error));
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!!error) {
    return (
      <Container>
        <p style={{ color: "#ff0000" }}>{error}</p>
      </Container>
    );
  }

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={`${dataVal && dataVal[0].photo[i]}`} />
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
    <Box sx={{ m: 5 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ pl: 2, my: 1 }}>
        <Link underline="hover" color="inherit" to="/">
          {t("menuHome")}
        </Link>
        <Typography color="text.primary">
          {!!dataVal && dataVal[0].title}
        </Typography>
      </Breadcrumbs>

      <Container maxWidth="xl">
        {!!dataVal && (
          <>
            <Grid container spacing={5} sx={{ my: 2 }}>
              <Grid item xs={12} md={4}>
                <ArrowWrapper>
                  <Slider {...settings}>
                    {dataVal[0].photo.map((items, index) => {
                      return (
                        <div key={index}>
                          <img
                            src={items}
                            style={{
                              maxHeight: "300px",
                              width: "auto",
                              margin: "0 auto",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      );
                    })}
                  </Slider>
                </ArrowWrapper>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="h6" gutterBottom component="div">
                  {dataVal[0].title}
                </Typography>
                <Divider />
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: "#dfdfdf",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {!!dataVal[0].discount && dataVal[0].discount !== 0 ? (
                    <div>
                      <span style={{ color: "#ff0000", fontSize: "1.5rem" }}>
                        ฿{dataVal[0].price - dataVal[0].discount}
                      </span>
                      <small>
                        <sup>
                          <del>฿{dataVal[0].price}</del>
                        </sup>
                      </small>
                    </div>
                  ) : (
                    <span style={{ fontSize: "1.5rem" }}>
                      ฿{dataVal[0].price}
                    </span>
                  )}
                  <Button
                    variant="contained"
                    sx={{ mx: 4, px: 3 }}
                    color="secondary"
                    onClick={() => addCart(dataVal[0])}
                  >
                    <MdAddShoppingCart style={{ marginRight: 3 }} />{" "}
                    {t("addcart")}
                  </Button>
                </Box>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  style={{ marginTop: "1em" }}
                >
                  {t("productDetail")}
                </Typography>
                <Typography
                  variant="body"
                  gutterBottom
                  component="div"
                  style={{ whiteSpace: "pre-wrap", padding: 4 }}
                >
                  {dataVal[0].content}
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid container sx={{ my: 3 }}>
              <Grid item xs={12}>
                <Typography variant="h5" component="div" gutterBottom>
                  {t("review")}
                </Typography>
                <List sx={{ width: "100%" }}>
                  {!!reviews ? (
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Ali Connors
                            </Typography>
                            {
                              " — I'll be in your neighborhood doing errands this…"
                            }
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  ) : (
                    <ListItem sx={{ textAlign: "center", fontStyle: "italic" }}>
                      <ListItemText primary={t("noReview")} />
                    </ListItem>
                  )}
                </List>
              </Grid>
            </Grid>
            <Divider />
            <Grid container sx={{ my: 3 }}>
              {!!productCatelogy && productCatelogy.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="h6" component="div" gutterBottom>
                    {t("sameCategory")}
                  </Typography>
                  {console.log(productCatelogy)}
                  <BoxSlider
                    title={productCatelogyTitle}
                    product={productCatelogy}
                    seeAll={"/product/list/" + productCatelogyTitle}
                  />
                </Grid>
              )}
            </Grid>
          </>
        )}
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
